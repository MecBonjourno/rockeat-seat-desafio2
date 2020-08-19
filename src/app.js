const express = require("express");
const cors = require("cors");

const { v4: uuid, isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  
  const {title} = request.query;

  const results = title ? repositories.filter(project => project.title.includes(title)) : repositories;

  return response.json(results);
});

// POST /repositories: A rota deve receber title, url e techs 
// dentro do corpo da requisição, sendo a URL o link para o github desse repositório. 
// Ao cadastrar um novo projeto, ele deve ser armazenado dentro de um objeto no seguinte 
// // formato: { id: "uuid",
              //  title: 'Desafio Node.js', 
              //  url: 'http://github.com/...', 
              //  techs: ["Node.js", "..."], 
              //  likes: 0 }; 
//  Certifique-se que o ID seja um UUID, e de sempre iniciar os likes como 0.

app.post("/repositories", (request, response) => {

  const { title, url, techs, likes  } = request.body;

  const repository = { id: uuid(), title, url, techs, likes }

  repositories.push(repository)

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  return response.json({ message:"Updating a repository" });
});

app.delete("/repositories/:id", (request, response) => {
  return response.json({ message:"Deleting a repository" });
});

app.post("/repositories/:id/like", (request, response) => {
  return response.json({ message:"Liked a repository" });
});

module.exports = app;
