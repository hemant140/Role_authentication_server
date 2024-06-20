import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: 'AuthenticationDB' });
        console.log("Server is connected to Database");
    } catch (error) {
        console.log("Database is Not connected", error);
    }
}
