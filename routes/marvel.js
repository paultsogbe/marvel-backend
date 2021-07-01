const express = require("express");
const router = express.Router();
const axios = require("axios");
const md5 = require("md5");
const uid2 = require("uid2");

router.get("/characters", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
    );
    let offset = req.query.offset;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?limit=100&offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("characters error", error.message);
  }
});

router.get("/comics", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
    );

    let offset = req.query.offset;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("comics error", error.message);
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    let ts = uid2(8);
    let hash = md5(
      ts + process.env.MARVEL_SECRET_API_KEY + process.env.MARVEL_PUBLIC_API_KEY
    );
    let characterId = req.params.characterId;
    let offset = req.query.offset;

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${characterId}/comics?offset=${offset}&ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("characterId/comics", error.message);
  }
});

router.post("/favorites", async (req, res) => {
  const fav = req.fields.fav;

  let favTab = [[], []];
  try {
    for (let i = 0; i < fav.length; i++) {
      if (i === 0) {
        for (let j = 0; j < fav[i].length; j++) {
          let ts = uid2(8);
          let hash = md5(
            ts +
              process.env.MARVEL_SECRET_API_KEY +
              process.env.MARVEL_PUBLIC_API_KEY
          );

          const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/characters/${fav[i][j]}?ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
          );

          favTab[0].push(response.data);
        }
      } else {
        for (let j = 0; j < fav[i].length; j++) {
          let ts = uid2(8);
          let hash = md5(
            ts +
              process.env.MARVEL_SECRET_API_KEY +
              process.env.MARVEL_PUBLIC_API_KEY
          );

          const response = await axios.get(
            `https://lereacteur-marvel-api.herokuapp.com/comics/${fav[i][j]}?ts=${ts}&apikey=${process.env.MARVEL_PUBLIC_API_KEY}&hash=${hash}`
          );

          favTab[1].push(response.data);
        }
      }
    }
    res.json(favTab);
  } catch (error) {
    console.log("favorites", error.message);
  }
});

module.exports = router;
