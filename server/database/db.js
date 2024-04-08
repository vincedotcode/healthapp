import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/health', { useNewUrlParser: true, useUnifiedTopology: true });

  console.log(
    `Connected to MongoDb Database ${mongoose.connection.host}.`.bgBrightGreen
      .black
  );

  try {
  } catch (err) {
    console.log(`MongoDb Database Error ${err}.`.bgBrightRed.white);
    process.exit(1);
  }
};

export default connectDB;
