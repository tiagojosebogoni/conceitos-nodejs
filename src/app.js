const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(), 
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body

  const repository = repositories.find( r => r.id === id)

  if (!repository){
    response.status(400).send();
  }

  repository.title = title
  repository.url = url
  repository.techs = techs

  return response.json(repository);
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  const indexRepository = repositories.findIndex(repository => repository.id === id);

  if (indexRepository < 0) {
    return res.status(400).send()
  }

  repositories.splice(indexRepository, 1);

  return res.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repo => repo.id === id)

  if (!repository){
    response.status(400).send();
  }

  repository.likes += 1;
  return response.json(repository)
});

module.exports = app;
