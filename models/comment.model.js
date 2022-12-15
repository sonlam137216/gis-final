const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    name: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", CommentSchema);