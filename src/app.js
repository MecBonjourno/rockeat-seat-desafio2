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

  const { title, url, techs, likes } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params;

    const {title, url, techs, likes } = request.body;

    const repoIndex = repositories.findIndex(repository => repository.id === id);

    if(repoIndex<0){
        return response.status(400).json({error: 'Repository not found'});
    }

    const repository = { 
        id,
        title, 
        url,
        techs,
        likes: repositories[repoIndex].likes
    }

    repositories[repoIndex] = repository;

    return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const repoIndex = repositories.findIndex(repository => repository.id === id);

  if(repoIndex<0){
    return response.status(400).json({error: 'Repository not found'});
}

  repositories.splice(repoIndex, 1);
 
  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repository.likes++;
  
  return response.json(repository);
});

module.exports = app;
