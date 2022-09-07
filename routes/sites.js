const express = require("express");
const { restart } = require("nodemon");
const router = express.Router();
const Site = require("../models/Site");
const SiteData = require("../models/SiteData");
const UserLoggedIn = require("../models/UserLoginSchema");
const { registerValidation, sceneValidation } = require("../validation");
const verify = require("./verifyToken");

///GET ALL SITES
router.get("/", verify, async (req, res) => {
  try {
    const token = req.header("auth-token");
    const user = await UserLoggedIn.findOne({ token: token });
    if (!user) return res.status(401).send("err");

    const sites = await Site.find({ owner: { $eq: user.userLoggedIn } });

    res.json(sites);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMIT A NEW SCENE
router.post("/", verify, async (req, res) => {
  //console.log("test");

  // console.log({ response: req.body });

  const token = req.header("auth-token");
  const user = await UserLoggedIn.findOne({ token: token });

  // const { error } = sceneValidation(req.body);
  // if (error) return res.status(400).send(error.message);

  const scene = new Site({
    title: req.body.title,
    description: req.body.description,
    owner: user.userLoggedIn,
    shared: req.body.shared,
  });

  try {
    const savedScene = await scene.save();

    const newSiteData = new SiteData({
      siteID: savedScene._id,
      entities: [],
      snapshots: [],
    });

    const savedSiteData = await newSiteData.save();

    res.json();
  } catch (err) {
    res.json({ err });
  }
});

//GET A SPECIFIC SCENE (BY ID)
router.get("/:siteID", verify, async (req, res) => {
  if (!req.query.siteID)
    return res
      .status(400)
      .json({ err: "Client must specify the siteID as a parameter" });

  try {
    const site = await Site.findById(req.query.siteID);
    res.json(site);
  } catch (err) {
    res.json({ err });
  }
});

//DELETE A SPECIFIC SCENE (BY ID)
router.delete("/", verify, async (req, res) => {
  try {
    console.log(req.query.siteID);

    if (!req.query.siteID)
      return res
        .status(400)
        .json({ err: "Client must specify the siteID as a parameter" });

    const scene = await Site.deleteOne({ _id: req.query.siteID });
    res.json({ scene });
  } catch (err) {
    res.json({ message: err });
  }

  res.send();
});

//UPDATE A SPECIFIC SCENE (BY ID)
router.patch("/:siteID", verify, async (req, res) => {
  try {
    const patchScene = await Site.updateOne(
      { _id: req.params.siteID },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          shared: req.body.shared,
          date: req.body.date,
        },
      }
    );
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
