import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGO_URI}`)
      .catch((error) =>
        console.error("Error while connecting database.", error)
      );
  } catch (error) {
    console.error("Error while connecting database.", error);
  }
};

export { connectDatabase };
