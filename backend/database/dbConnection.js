import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "FooDelivery",
    });
    console.log("Connected to MongoDB");

    const foodItemsCollection = mongoose.connection.db.collection("foodItems");
    const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

    const foodItemsData = await foodItemsCollection.find({}).toArray();
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    global.foodItems = foodItemsData;
    global.foodCategory = foodCategoryData;
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};
