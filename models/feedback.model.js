const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feedbacks", FeedbackSchema);
