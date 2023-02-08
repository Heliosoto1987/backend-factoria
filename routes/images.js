const { Router } = require("express");
const router = Router();
const {
  getImages,
  newImage,
  updateImage,
  deleteImage,
} = require("../controllers/images");

router.get("/", getImages);

router.post("/", newImage);

router.put("/:id", updateImage);

router.delete("/:id", deleteImage);

module.exports = router;
