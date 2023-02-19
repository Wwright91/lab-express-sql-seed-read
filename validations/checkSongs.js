const checkName = (req, res, next) => {
    if (req.body.name) {
        // console.log("name is ok");
        next();
    } else {
      res.status(400).json({ error: "Name is required!" });
    }
};

const checkArtist = (req, res, next) => {
    if (req.body.artist) {
        // console.log("name is ok");
        next();
    } else {
      res.status(400).json({ error: "Artist is required!" });
    }
};

const checkBoolean = (req, res, next) => {
    const {is_favorite} = req.body
    if (!is_favorite || is_favorite === "true" || is_favorite === "false")  {
      next();
      // if (is_favorite == true || is_favorite == false || is_favorite == undefined) {
      //   next();
    } else {
      res.status(400).json({ error: "is_favorite must be a boolean value!" });
    }
  };
  
  
module.exports = { checkName, checkArtist, checkBoolean };