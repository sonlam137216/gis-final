const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
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
        ref: 'users',
        default: null
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedbacks", FeedbackSchema);
