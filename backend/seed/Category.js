const Category = require("../models/Category");

const categories = [
  { _id: "65a7e24602e12c44f599442c", name: "Candy" },
  { _id: "65a7e24602e12c44f599442d", name: "Choclate" },
  { _id: "65a7e24602e12c44f599442e", name: "Drinks" },
  { _id: "65a7e24602e12c44f599442f", name: "Snacks" },
];

exports.seedCategory = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Category seeded successfully");
  } catch (error) {
    console.log(error);
  }
};
