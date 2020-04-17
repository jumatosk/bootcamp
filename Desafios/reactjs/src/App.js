import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Repositorio Novo',
      url: 'github.com/repository',
      techs: 'React, JavaScript',
      likes: 0
     })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
   await api.delete(`repositories/${id}`)

   setRepositories(repositories.filter(repository => repository.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
           Title: {repository.title}<br/>
           URL: {repository.url}<br/>
           Techs: {repository.techs}<br/>
           Likes: {repository.likes}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
