const createReview = async (req, res) => {
  try {
    const { rating, description, hotelId, guestId } = req.body;
    console.log("Đánh giá: " + rating);
    console.log(typeof rating);
    console.log("Nội dung: " + description);
    console.log(typeof description);

    console.log("user-id " + guestId);
    console.log(typeof guestId);

    console.log("hotel id " + hotelId);
    console.log(typeof hotelId);

    if (!guestId || !hotelId || rating === undefined || !description) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const newReview = await Reviews.create({
      rating,
      description,
      hotelId,
      guestId,
    });

    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).send(error);
  }
};
const uploadFile = async (req, res) => {
  const { file } = req;
  const imagePath = file.path;
  var cleanedPath = imagePath.replace(/^public/, "");
  const urlImage = `localhost:3030${cleanedPath}`;
  const { user } = req;
  const commentFound = await Reviews.findOne({
    id: user.id,
  });
  commentFound.file = urlImage;
  await commentFound.save();
  res.send(commentFound);
};
