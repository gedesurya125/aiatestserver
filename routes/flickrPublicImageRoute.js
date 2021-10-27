const route = require("express").Router();
const {getImages} = require('../controllers/flickrPublicImageController')

route.get("/", getImages);

module.exports = route