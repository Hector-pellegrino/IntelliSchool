import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { apiGet } from '../../../api'
import Search from '../Search'

export default function Disciplinas() {
  const [allDisciplinas, setAllDisciplinas] = useState([])
  const [search, setSearchDisciplina] = useState([])
  useEffect(() => {
    apiGet('/api/disciplinas')
      .then((data) => setAllDisciplinas(data))
      .catch((err) => console.log(err))
  }, [])

  function handleChange(evento) {
    setSearchDisciplina(evento.target.value)
  }
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section>
            <Search
              type='text'
              name='professor'
              placeholder='Procurar disciplina'
              onChange={handleChange}
            ></Search>
            {allDisciplinas.map((disciplina) => (
              <div key={disciplina.id}>
                {disciplina.nome} - {disciplina.ementa} - {disciplina.carga_horaria}h{' '}
              </div>
            ))}
          </section>
        }
      ></Route>
    </Routes>
  )
}
