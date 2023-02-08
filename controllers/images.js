const image = require("../models/image");

const getImages = async (req, res = response) => {
  const getImages = await image.find().populate("user");
  res.json({
    ok: true,
    getImages,
  });
};
const newImage = async (req, res = response) => {
  const createImage = new image(req.body);
  try {
    createImage.save();
    res.status(201).json({
      ok: true,
      msg: "newImage",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "cant save new image",
    });
  }
};
const updateImage = async (req, res = response) => {
  const imageId = req.params.id;
  const uid = req.body.uid;

  try {
    const Image = await image.findById(imageId);

    if (!Image) {
      return res.status(404).json({
        ok: false,
        msg: "imagen not exist by this id",
      });
    }

    if (Image.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You do not have privileges to edit this image",
      });
    }

    const updateNewImage = {
      ...req.body,
      user: uid,
    };

    const imageReadyUpdate = await image.findByIdAndUpdate(
      imageId,
      updateNewImage,
      { new: true }
    );

    res.json({
      ok: true,
      img: imageReadyUpdate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};
const deleteImage = async (req, res = response) => {
  const imageId = req.params.id;
  const uid = req.body.uid;

  try {
    const Image = await image.findById(imageId);

    if (!Image) {
      return res.status(404).json({
        ok: false,
        msg: "imagen not exist by this id",
      });
    }

    if (Image.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You do not have privileges to delete this image",
      });
    }

    await image.findByIdAndDelete(imageId);

    res.json({
      ok: true,
      msg: "has been delete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with admin",
    });
  }
};

module.exports = {
  getImages,
  newImage,
  updateImage,
  deleteImage,
};
