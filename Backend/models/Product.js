import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    stock: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    thumbnail: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;