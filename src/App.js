import React, { useState, useEffect } from 'react';
import api from './services/api'
import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevItem from './components/DevItem'
import DevForm from './components/DevForm'
//Componente é um bloco usolado de HTML, CSS e JS que não interfere no restante da aplicação. 
//Propriedade são atributos de um componente passados do componente pai para o componente filho
//Estado informações mantidas pelo componente

function App() {
  const [devs, setDevs] = useState([])

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')
      setDevs(response.data)
    }
    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)


    setDevs([...devs, response.data])
  }
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div>
  );
}

export default App;