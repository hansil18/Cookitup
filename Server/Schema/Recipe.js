import mongoose from "mongoose";

const recipe = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
    trim: true,
  },
  time: {
    type: "number",
    required: true,
  },
  introduction: {
    type: "string",
    required: true,
  },
  difficulty: {
    type: "string",
    required: true,
  },
  ingredient: [
    {
      item: "string",
    },
  ],
  steps: [
    {
      description: "string",
      photo: "string",
    },
  ],
  type: {
    type: "string",
    required: true,
  },
  allergies: [
    {
      allergy: "string",
    },
  ],
  photo: {
    type: "string",
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipe);

export default Recipe;
