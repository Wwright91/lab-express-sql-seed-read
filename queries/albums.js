const db = require("../db/dbConfig.js");

const getAllAlbums = async () => {
  try {
    const allAlbums = await db.any("SELECT * FROM albums");
    return allAlbums;
  } catch (error) {
    return error;
  }
};

// ONE Album
const getAlbum = async (album_name) => {
  try {
    //can also use:
    //await db.one("SELECT * FROM albums WHERE id=$[id]", {
    //   id: id,
    // });
    const oneAlbum = await db.oneOrNone("SELECT * FROM albums WHERE LOWER(album_name)=LOWER($1)", album_name);
    return oneAlbum;
  } catch (error) {
    return error;
  }
};

// CREATE 
const createAlbum = async (album) => {
  const { album_name, artist_name } = album;
  try {
    const newAlbum = await db.oneOrNone(
      "INSERT INTO albums (album_name, artist_name) VALUES($1, $2) RETURNING *",
      [album_name, artist_name]
    );
    return newAlbum;
  } catch (error) {
    throw error;
  }
};

//DELETE
const deleteAlbum = async (id) => {
  try {
    const deletedAlbum = await db.one(
      "DELETE FROM albums WHERE id = $1 RETURNING *",
      id
    );
    return deletedAlbum;
  } catch (error) {
    return error;
  }
};

//UPDATE
const updateAlbum = async (id, album) => {
  const { album_name, artist_name } = album;
  try {
    const updatedAlbum = await db.one(
      "UPDATE albums SET album_name=$1, artist_name=$2 WHERE id=$3 RETURNING *",
      [album_name, artist_name, id]
    );
    return updatedAlbum;
  } catch (error) {
    return error;
  }
};

const getAllSongsForAlbum = async (album) => {
  try {
    const songsOnAlbum = await db.any(
      `SELECT
        *
       FROM
     albums
     JOIN
     songs
     ON
     songs.album = albums.album_name
     WHERE
     LOWER(albums.album_name) = LOWER($1);
     `,
      album
    );
    return songsOnAlbum;
  } catch (err) {
    return err;
  }
};

const deleteSongFromAlbum = async (albumId, id) => {
  try {
    let remove = await db.none(
      `DELETE FROM songs WHERE album_id=$1 AND id = $2 `,
      [albumId, id]
    );
    return !remove;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAllAlbums,
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
  getAllSongsForAlbum,
  deleteSongFromAlbum,
};
