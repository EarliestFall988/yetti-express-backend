const express = require("express");
const router = express.Router();
const Site = require("../models/Site");
const SiteData = require("../models/SiteData");
const UserLoggedIn = require("../models/UserLoginSchema");
const { siteDataValidation } = require("../validation");
const verify = require("./verifyToken");

//CANNOT GET ALL SITE DATA FOR ALL SITES AT ONCE CURRENTLY
router.get("/", verify, async (req, res) => {
  res.status(400).send({
    err: "Cannot get all site data. Specify the site id as a parameter -> ...?siteID=<siteID>",
  });
});

//GET A SITE
router.get("/:siteID", verify, async (req, res) => {
  try {
    if (!req.params.siteID)
      res.status(400).send({ err: "no parameter with the scene id" });

    const siteData = await SiteData.findOne({ siteID: req.params.siteID });

    if (siteData) res.json({ siteData });
    else res.status(400).json({ err: "could not find scene" });
  } catch (err) {
    res.json({ err });
  }
});

//SUBMIT NEW SITE DATA
router.post("/", verify, async (req, res) => {
  const { error } = siteDataValidation(req.body);
  if (error) return res.status(400).send(error.message);

  var foundSiteData = SiteData.findOne({ siteID: req.body.siteID });

  if (foundSiteData)
    return res
      .status(400)
      .send({ error: "site with the id already exists. Try PATCH or DELETE" });

  const newSiteData = new SiteData({
    siteID: req.body.siteID,
    entities: req.body.entities,
    snapshots: req.body.snapshots,
    cameraLocation: req.body.cameraLocation,
  });

  try {
    const savedSiteData = await newSiteData.save();

    res.json({
      siteID: newSiteData.siteID,
      result: "Success!",
    });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// DELETE A SPECIFIC SITE DATA (BY SCENE ID)
router.delete("/:siteID", verify, async (req, res) => {
  try {
    const scene = await siteData.remove({ siteID: req.body.params.siteID });
    if (!scene) res.send(400).send({ err: "could not find the site with id" });
    else res.json(scene);
  } catch (err) {
    res.json({ err });
  }
});

//UPDATE A SPECIFIC SITE (BY SITE ID)
router.patch("/", verify, async (req, res) => {
  try {
    const tryPatchSiteData = await SiteData.findOne({
      siteID: req.body.siteID,
    });
    if (!tryPatchSiteData)
      return res.status(400).send({
        err: "cannot patch site data that does not exist. Try POST instead.",
      });

    const patchSiteData = await SiteData.updateOne(
      {
        siteID: req.body.siteID,
      },
      {
        $set: {
          cameraLocation: req.body.cameraLocation,
          entities: req.body.entities,
          snapshots: req.body.snapshots,
        },
      }
    );

    res.send({ siteID: req.body.siteID, result: "Success!" });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
