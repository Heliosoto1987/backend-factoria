const { Schema, model } = require("mongoose");

const imageSchema = Schema({
  url: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = model("image", imageSchema);
