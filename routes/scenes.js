const express = require("express");
const router = express.Router();
const Scene = require("../models/Scene");
const UserLoggedIn = require("../models/UserLoginSchema");
const verify = require("./verifyToken");

///GET ALL SCENES
router.get("/", verify, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const user = await UserLoggedIn.findOne({ token: token });
    if (!user) return res.status(401).send("err");

    const scenes = await Scene.find({ owner: { $eq: user.userLoggedIn } });
    res.json(scenes);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A NEW SCENE
router.post("/", verify, async (req, res) => {
  const scene = new Scene({
    title: req.body.title,
    description: req.body.description,
    snapshots: req.body.snapshots,
    owner: req.body.owner,
    shared: req.body.shared,
  });

  try {
    const savedScene = await scene.save();
    res.json(savedScene);
  } catch (err) {
    res.json({ err });
  }
});

//GET A SPECIFIC SCENE (BY ID)
router.get("/:sceneID", verify, async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.sceneID);
    res.json(scene);
  } catch (err) {
    res.json({ err });
  }
});

//DELETE A SPECIFIC SCENE (BY ID)
router.delete("/:sceneID", verify, async (req, res) => {
  try {
    const scene = await Scene.remove({ _id: req.params.sceneID });
    res.json(scene);
  } catch (err) {
    res.json({ message: err });
  }
});

//UPDATE A SPECIFIC SCENE (BY ID)
router.patch("/:sceneId", verify, async (req, res) => {
  try {
    const patchScene = await Scene.updateOne(
      { _id: req.params.sceneId },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
