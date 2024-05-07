const { UrlImageRoom } = require('../models');

const createUrlImageRoom = async (req, res) => {
  const { url, IdRoom } = req.body; // Change HotelId to IdRoom
  
  try {
    const newUrlRoom = await UrlImageRoom.create({ url, IdRoom }); // Change HotelId to IdRoom
    res.status(201).json(newUrlRoom);
  } catch (error) {
    console.error('Error creating urlRoom:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUrlImageRoomById = async (req, res) => {
  const { id } = req.params;

  try {
    const urlRoom = await UrlImageRoom.findByPk(id);
    if (!urlRoom) {
      return res.status(404).json({ error: 'urlRoom not found' });
    }
    res.status(200).json(urlRoom);
  } catch (error) {
    console.error('Error fetching urlRoom:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUrlImageRoom = async (req, res) => {
  const { id } = req.params;
  const { url, IdRoom } = req.body; // Change HotelId to IdRoom

  try {
    const urlRoom = await UrlImageRoom.findByPk(id);
    if (!urlRoom) {
      return res.status(404).json({ error: 'urlRoom not found' });
    }
    await urlRoom.update({ url, IdRoom }); // Change HotelId to IdRoom
    res.status(200).json(urlRoom);
  } catch (error) {
    console.error('Error updating urlRoom:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteUrlImageRoom = async (req, res) => {
  const { id } = req.body;

  try {
    const urlRoom = await UrlImageRoom.findOne({
      where: {
        id: id
      }
    });

    if (!urlRoom) {
      return res.status(404).json({ error: 'urlRoom not found' });
    }
    await urlRoom.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting urlRoom:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createUrlImageRoom,
  getUrlImageRoomById,
  updateUrlImageRoom,
  deleteUrlImageRoom
};
