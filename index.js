const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const feedbackRouter = require("./routes/feedback.route");
const commentRouter = require("./routes/comment.route");
const arcgisRouter = require('./routes/acrgis.route')

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://sonlam:1234@ie213.tftcl.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/comment", commentRouter);
app.use("/api/arcgis", arcgisRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
