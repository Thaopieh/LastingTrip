const { Amenities } = require("../models");

const { Op } = require("sequelize");
const createAmenity = async (req, res) => {
  const { name, Aclass } = req.body;
  try {
    const newAmenity = await Amenities.create({
      name,
      Aclass,
    });
    res.status(201).send(newAmenity);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllAmenity = async (req, res) => {
  const { name, type } = req.query;
  try {
    let queryOptions = {};

    if (name) {
      queryOptions.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (type) {
      queryOptions.type = type;
    }

    const AmenityList = await Amenities.findAll({
      where: queryOptions,
    });

    res.status(200).send(AmenityList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailAmenity = async (req, res) => {
  const { id } = req.params;
  try {
    const detailAmenity = await Amenities.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(detailAmenity);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const updateAmenity = async (req, res) => {
//   const { id } = req.params;
//   const { name, adress, province } = req.body;
//   try {
//     const detailAmenity = await Amenitys.findOne({
//       where: {
//         id,
//       },
//     });
//     detailAmenity.name = name;
//     detailAmenity.adress = adress;
//     detailAmenity.province = province;
//     await detailAmenity.save();
//     res.status(200).send(detailAmenity);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// // const deleteAmenity = async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     await Amenity.destroy({
// //       where: {
// //         id,
// //       },
// //     });
// //     res.status(200).send("xoa thanh cong");
// //   } catch (error) {
// //     res.status(500).send(error);
// //   }
// // };

module.exports = {
  createAmenity,
  getAllAmenity,
  getDetailAmenity,

  //   updateAmenity,
  //   deleteAmenity,
};
