import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json("TEST USER");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.status(200).json("TEST USER");
});

export default router;
