const { UrlImageRoom } = require("../models");

const createUrlImageRoom = async (req, res) => {
  {
    try {
      const { IdRoom } = req.body;

      const { files } = req;
      console.log(files);
      // Iterate over each file and create a corresponding UrlImageHotel record
      for (const file of files) {
        const imagePath = file.path.replace(/^public/, ""); // Get relative path
        const imageUrl = `http://localhost:3030/${imagePath}`; // Construct full image URL

        // Create UrlImageHotel record associated with the new hotel
        const imageUrlRecord = await UrlImageRoom.create({
          url: imageUrl,
          IdRoom: IdRoom,
        });
      }
      res.status(201).send("successful");
    } catch (error) {
      console.log("Error creating UrlHotel:", error);
      res.status(500).send(error);
    }
  }
};

const getUrlImageRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const urlRoom = await UrlImageRoom.findByPk(id);
    if (!urlRoom) {
      return res.status(404).json({ error: "urlRoom not found" });
    }
    res.status(200).json(urlRoom);
  } catch (error) {
    console.error("Error fetching urlRoom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUrlImageRoom = async (req, res) => {
  const { id } = req.params;
  const { url, IdRoom } = req.body; // Change HotelId to IdRoom

  try {
    const urlRoom = await UrlImageRoom.findByPk(id);
    if (!urlRoom) {
      return res.status(404).json({ error: "urlRoom not found" });
    }
    await urlRoom.update({ url, IdRoom }); // Change HotelId to IdRoom
    res.status(200).json(urlRoom);
  } catch (error) {
    console.error("Error updating urlRoom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUrlImageRoom = async (req, res) => {
  const { id } = req.body;

  try {
    const urlRoom = await UrlImageRoom.findOne({
      where: {
        id: id,
      },
    });

    if (!urlRoom) {
      return res.status(404).json({ error: "urlRoom not found" });
    }
    await urlRoom.destroy();
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting urlRoom:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUrlImageRoom,
  getUrlImageRoomById,
  updateUrlImageRoom,
  deleteUrlImageRoom,
};
