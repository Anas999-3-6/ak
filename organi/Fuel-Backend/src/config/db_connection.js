import mongoose from "mongoose";

export const Dbconnection = async () => {
    try {
      var db_uri = process.env.DB_URL
        await mongoose.connect(db_uri);
        console.log('mongodb connection established');
    } catch (error) {
        console.log("Error connecting to MongoDB")
    } 
}