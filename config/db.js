import mongoose from "mongoose";
import colors from "colors";

export const connectDB = async () => { // Export the function
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, // Optional: Add these options if needed
      useUnifiedTopology: true,
    });
    console.log(
      `Connected To MongoDB Database: ${conn.connection.host}`.bgMagenta.white
    );
  } catch (error) {
    console.log(`Error in MongoDB: ${error}`.bgRed.white);
    process.exit(1); // Exit the process with a failure code
  }
};
