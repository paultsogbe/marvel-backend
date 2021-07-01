const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

router.get("/search/characters", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
    );
    let offset = req.query.offset;

    let name = req.query.name;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?offset=${offset}&limit=100&nameStartsWith=${name}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("char search error", error.message);
  }
});

router.get("/search/comics", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
    );
    let offset = req.query.offset;

    let title = req.query.title;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?offset=${offset}&limit=100&titleStartsWith=${title}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
    );

    res.json(response.data);
  } catch (error) {
    console.log("comics search error", error.message);
  }
});

module.exports = router;
