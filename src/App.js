import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
  api.get('/repositories').then(reponse => {
    setRepositories(reponse.data)
  })
  },[repositories])

  

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: Date.now(),
      title: `teste-${Date.now()}`,
      url: 'https://github.com/arielflima/conceitos-reactjs',
      techs: ['NodeJS', 'React Native', 'ReactJS'], 
    })

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
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
