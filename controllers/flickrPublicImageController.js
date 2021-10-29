const { feedsAPI } = require("../extAPI/baseSetup");
class FlickerPublicImageController {
  getImages = async (req, res, next) => {
    let endPoint = "photos_public.gne?format=json&nojsoncallback=1&lang=en-us";
    try {
      const { tags, id } = req.query;

      if (tags) {
        endPoint = endPoint + `&tags=${tags}`;
      }

      if (id) {
        endPoint = endPoint + `&id=${id}`;
      }

      const response = await feedsAPI(endPoint).then((res) => res.data);
      return res.status(200).json(response);
    } catch (err) {
      console.log("ERR ON GET PHOTO FLICKR", err);
      next(err);
    }
  };
}

module.exports = new FlickerPublicImageController();
