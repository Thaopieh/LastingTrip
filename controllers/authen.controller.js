const { User, Token } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Hardcoded secrets and keys (NOT RECOMMENDED for production)
const JWT_ACCESS_SECRET = 'password1000'; // Replace with your access token secret
const JWT_REFRESH_SECRET = 'autorefresh'; // Replace with your refresh token secret
const JWT_SECRET = 'firewallbase64'; // For password reset token
const EMAIL_USERNAME = '22521444@gm.uit.edu.vn'; // Your email
const EMAIL_PASSWORD = 'fhdg itam dsjv hnpy'; // Your email password
const ACCESS_TOKEN_EXPIRY = '1h'; // Access token expiry time
const REFRESH_TOKEN_EXPIRY = '7d'; // Refresh token expiry time

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
    });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isAuthen = bcrypt.compareSync(password, user.password);
      if (isAuthen) {
        const accessToken = jwt.sign(
          { id: user.id, email: user.email, type: user.type },
          JWT_ACCESS_SECRET,
          { expiresIn: ACCESS_TOKEN_EXPIRY }
        );

        const refreshToken = jwt.sign(
          { id: user.id, email: user.email },
          JWT_REFRESH_SECRET,
          { expiresIn: REFRESH_TOKEN_EXPIRY }
        );

        // Ensure that the Token model is correctly defined and imported
        if (!Token) {
          console.error("Token model is not defined or imported correctly");
          return res.status(500).send({ message: "Internal server error: Token model not found" });
        }

        // Create a new token entry in the database
        await Token.create({
          user_id: user.id,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_at: new Date(Date.now() + 3600 * 1000), // Token expires in 1 hour
          status: "active",
        });

        res.status(200).send({
          message: "successful",
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            name: user.name,
            type: user.type,
          },
        });
      } else {
        res.status(401).send({ message: "Invalid password" });
      }
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL_USERNAME,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset token is: ${token}`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const { token, newpassword } = req.body;

  if (!newpassword) {
    return res.status(400).json({ message: "New password is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newpassword, salt);
    user.password = hashPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  login,
  register,
  forgotPassword,
  resetPassword,
};
