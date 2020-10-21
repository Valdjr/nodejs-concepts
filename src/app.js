const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepo);
  return response.status(201).json(newRepo);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const repoIndex = repositories.findIndex(repo => repo.id == request.params.id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  const updatedRepo = repositories[repoIndex];
  updatedRepo.title = title;
  updatedRepo.url = url;
  updatedRepo.techs = techs;
  repositories[repoIndex] = updatedRepo;
  return response.status(200).json(updatedRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const repoIndex = repositories.findIndex(repo => repo.id == request.params.id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  repositories.splice(repoIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const repoIndex = repositories.findIndex(repo => repo.id == request.params.id);
  if (repoIndex < 0) {
    return response.status(400).send();
  }
  repositories[repoIndex].likes += 1;
  return response.status(200).json(repositories[repoIndex]);
});

module.exports = app;
