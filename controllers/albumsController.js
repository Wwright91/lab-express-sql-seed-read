const express = require("express");
const albums = express.Router({ mergeParams: true });
const {
  getAllAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAllSongsForAlbum,
  deleteSongFromAlbum,
} = require("../queries/albums");

albums.get("/", async (req, res) => {
  //   const { songId } = req.params;

  try {
    const allAlbums = await getAllAlbums();
    res.status(200).json(allAlbums);
  } catch (err) {
    res.json(err);
  }
});

albums.get("/:albumName", async (req, res) => {
    const { albumName } = req.params;
    albumName.toLowerCase()
  const album = await getAlbum(albumName);
  if (album) {
    res.json(album);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// CREATE
albums.post("/", async (req, res) => {
  // console.log(req.body)
  try {
    const album = await createAlbum(req.body);
    res.json(album);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//DELETE
albums.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedAlbum = await deleteAlbum(id);
  if (deletedAlbum.id) {
    res.status(200).json(deletedAlbum);
  } else {
    res.status(404).json("Album not found");
  }
});

//UPDATE
albums.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedAlbum = await updateAlbum(id, req.body);
  res.status(200).json(updatedAlbum);
});

//get albums and songs
albums.get("/:album/songs", async (req, res) => {
  const { album } = req.params;
  const albumAndSong = await getAllSongsForAlbum(album);
  res.status(200).json(albumAndSong);
});

//delete song from an album
albums.delete("/:id/songs/:songId", async (req, res) => {
    const { id, songId } = req.params;
    const successfulDelete = await deleteSongFromAlbum(id, songId);
    if (successfulDelete) {
      res.status(202).json({ message: "ok" });
    } else {
      res.status(400).json({ info: successfulDelete });
    }
})

module.exports = albums;
