import express from "express";
import Admin from "../Schema/Admin.js";
import Recipe from "../Schema/Recipe.js";

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  // console.log(req);

  const exist = await Admin.findOne({ username: req.body.username });

  if (exist) {
    return res.status(401).json("Username already exist");
  }
  Admin.create({ username: req.body.username, password: req.body.password })
    .then((data) => res.json(data))
    .catch((next) => console.log(next));
});

router.post("/login", async (req, res, next) => {
  const user = await Admin.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (user) {
    return res.status(200).json(`${req.body.username} login successfull`);
  } else {
    return res.status(401).json("Invalid Login");
  }
});

router.post("/recipe/add", async (req, res, err) => {
  // console.log(req);
  const exist = await Recipe.findOne({ name: req.body.name });
  if (exist) {
    await Recipe.updateOne({ _id: exist._id });
    console.log("Data updated Successfully");
  } else {
    Recipe.create(req.body)
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
});

router.get("/recipe/search", async (req, res, err) => {
  // console.log(req);
  const exist = await Recipe.find(req.query);
  if (exist) {
    return res.json(exist);
  } else {
    return res.json("recipe not found");
  }
});

export default router;
