const { Model } = require("sequelize");

const checkExist = (Model) => {
  return async (req, res, next) => {
    const { id } = req.params;
    // kiem tra xem station co ton tai khong
    const station = await Model.findOne({
      where: {
        id,
      },
    });
    if (station) {
      next();
    } else {
      res.status(404).send(`Khong tim thay station co id la ${id}`);
    }
  };
};

module.exports = {
  checkExist,
};
