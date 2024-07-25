import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
export const dbConnection = async () => {
  try {
    // Connect to MongoDB using the provided URI and database name from environment variables
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "FooDelivery",
    });
    console.log("Connected to MongoDB");

    // Access the 'foodItems' and 'foodCategory' collections from the database
    const foodItemsCollection = mongoose.connection.db.collection("foodItems");
    const foodCategoryCollection =
      mongoose.connection.db.collection("foodCategory");

    // Fetch all documents from the 'foodItems' collection and store them in a global variable
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    // Fetch all documents from the 'foodCategory' collection and store them in a global variable
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Set global variables for easy access to the data across the application
    global.foodItems = foodItemsData;
    global.foodCategory = foodCategoryData;
  } catch (error) {
    // Log an error message if the connection to MongoDB fails
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};
