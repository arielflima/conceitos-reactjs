import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get('repositories');

      setRepositories(response.data);
    }
    loadRepositories();
  },[]);

  

  async function handleAddRepository() {
    const newRepo = {
      title: `teste-${Date.now()}`,
      url: 'https://github.com/arielflima/conceitos-reactjs',
      techs: ['NodeJS', 'React Native', 'ReactJS'],
    };

    const response = await api.post('repositories', newRepo)

    setRepositories([...repositories, response.data]);
  }
  

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepos = repositories.filter(repo => repo.id !== id);

    setRepositories(newRepos);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id} >
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
