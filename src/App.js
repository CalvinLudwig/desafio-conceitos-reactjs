import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['react', 'node']
    })

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`)

    console.log(response)

    if (response.status === 204) {
      const repos = [...repositories]

      setRepositories(repos.filter(repo => repo.id !== id))
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
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
