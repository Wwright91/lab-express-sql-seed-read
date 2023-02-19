const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
} = require("../queries/songs");
const {
  checkName,
  checkArtist,
  checkBoolean,
} = require("../validations/checkSongs.js");

// const albumController = require("./albumsController.js")
// songs.use("/:songId/albums", albumController);

//INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  // console.log(allSongs);

  // const { order, is_favorite } = req.query;

  // let songsCopy = [...allSongs];

  // if (songsCopy[0]) {
  //   if (order) {
  //     if (order === "asc") {
  //       songsCopy.sort((a, b) => (a.name > b.name ? 1 : -1));
  //     } else if (order === "desc") {
  //       songsCopy.sort((a, b) => (a.name > b.name ? -1 : 1));
  //     }
  //   }

  //   if (is_favorite) {
  //     if (is_favorite === "true") {
  //       songsCopy = songsCopy.filter(({ is_favorite }) => is_favorite === true);
  //     } else if (is_favorite === "false") {
  //       songsCopy = songsCopy.filter(
  //         ({ is_favorite }) => is_favorite === false
  //       );
  //     }
  //   }

  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// SHOW
songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// albums.get("/:albumName", async (req, res) => {
//   const { albumName } = req.params;
//   albumName.toLowerCase()
// const album = await getAlbum(albumName);
// if (album) {
//   res.json(album);
// } else {
//   res.status(404).json({ error: "not found" });
// }
// });

// CREATE
songs.post("/", checkName, checkArtist, async (req, res) => {
  // console.log(req.body)
  try {
    const song = await createSong(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//DELETE
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json(deletedSong);
  } else {
    res.status(404).json("Song not found");
  }
});

//UPDATE
songs.put("/:id", checkName, checkArtist, async (req, res) => {
  const { id } = req.params;
  const updatedSong = await updateSong(id, req.body);
  res.status(200).json(updatedSong);
});

module.exports = songs;
