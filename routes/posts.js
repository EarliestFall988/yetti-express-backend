const express = require("express");
const router = express.Router();
// const Scene = require("../models/Scene");
// const verify = require("./verifyToken");

// //GET ALL SCENES
// router.get("/", verify, async (req, res) => {
//   try {
//     const posts = await Scene.find();
//     res.json(posts);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// router.get("/specific", verify, (req, res) => {
//   res.send("Specific Post");
// });

// //SUBMIT A SCENE
// router.post("/", verify, async (req, res) => {
//   const post = new Scene({
//     title: req.body.title,
//     description: req.body.description,
//   });

//   try {
//     const savedPost = await post.save();
//     res.json(savedPost);
//   } catch (error) {
//     res.json({ message: error });
//   }
// });

// //SPECIFIC SCENE
// router.get("/:postId", verify, async (req, res) => {
//   try {
//     const post = await Scene.findById(req.params.postId);
//     res.json(post);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// //DELETE A SCENE
// router.delete("/:postId", verify, async (req, res) => {
//   try {
//     const removedPost = await Scene.remove({ _id: req.params.postId });
//     res.json(removedPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// //UPDATE A SCENE
// router.patch("/:postId", verify, async (req, res) => {
//   try {
//     const patchPost = await Scene.updateOne(
//       { _id: req.params.postId },
//       { $set: { title: req.body.title } }
//     );
//     res.json(patchPost);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

module.exports = router;
