import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  })

  async function handleAddRepository() {
    try {
      const response = await api.post('repositories', {
        title: `Desafio - Conceitos do ReactJS - ${Date.now()}`,
        url: "https://github.com/matheusguermandi",
        techs: "NodeJS, ReactJS",
      });

      const repository = response.data;

      setRepositories([...repositories, repository]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(repositories.filter((repository) => repository.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id} >

            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>

          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
