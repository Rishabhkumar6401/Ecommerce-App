const Brand = require("../models/Brand");

const brands = [
  { _id: "65a7e20102e12c44f59943da", name: "Shadani" },
  { _id: "65a7e20102e12c44f59943db", name: "Zubi" },
  { _id: "65a7e20102e12c44f59943dc", name: "Sunbeam" },
  { _id: "65a7e20102e12c44f59943dd", name: "Skippi" },
  { _id: "65a7e20102e12c44f59943de", name: "VPure" },
  { _id: "65a7e20102e12c44f59943df", name: "Favorite Food" },
  { _id: "65a7e20102e12c44f59943e0", name: "Gourmets Delight" },
  { _id: "65a7e20102e12c44f59943e1", name: "Chocozay" },
  { _id: "65a7e20102e12c44f59943e2", name: "Rosty Tasty" },
  { _id: "65a7e20102e12c44f59943e3", name: "Imported Items" },
];

exports.seedBrand = async () => {
  try {
    await Brand.insertMany(brands);
    console.log('Brand seeded successfully');
  } catch (error) {
    console.log(error);
  }
};
