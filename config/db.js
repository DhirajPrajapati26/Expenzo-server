import mongoose from 'mongoose'

const connectDB = () => {
  console.log("URL =>", process.env.MONGO_URL);

  mongoose
    .connect(process.env.MONGO_URL)
    .then((res) => {
      console.log(`Database connected successfully`);
    })
    .catch((err) => console.log("Error connecting database",err))
    .finally(()=>{
        console.log("DB Process completed")
    })
};

export default connectDB;