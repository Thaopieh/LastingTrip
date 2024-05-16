const authorize = (arrayType) => (req, res, next) => {
  const { user } = req;
  if (arrayType.findIndex((ele) => ele === user.type) > -1) {
    next();
  } else {
    res.status(403).send("Bạn đăng nhập, nhưng không có quyền");
  }
};
module.exports = {
  authorize,
};
