const Router = require("express").Router();
const PublicationModel = require("../../database/publications");

Router.get("/", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});

//adding new publications
// Router.post("/new", async (req, res) => {
//   const { newPublication } = req.body;

//   const addNewPublication = PublicationModel.create(newPublication);
//   return res.json({
//     publications: database.publications,
//     message: "new publication is assigned!",
//   });
// });

//adding new publication
Router.post("/new", (req, res) => {
  const { newPublication } = req.body;
  PublicationModel.create(newPublication);
  return res.json({ message: "Publication  was added!" });
});

module.exports = Router;
