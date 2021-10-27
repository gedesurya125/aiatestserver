const axios = require("axios");

class extAPI {
  feedsAPI = axios.create({
    baseURL: "https://api.flickr.com/services/feeds"
  })
}

module.exports = new extAPI();