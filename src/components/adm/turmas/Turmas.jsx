import CardTurma from './CardTurma'
import { IoAddCircle } from 'react-icons/io5'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import EditTurma from './EditTurma'
import { apiGet } from '../../../api'

import './Turmas.css'
import Search from '../Search'
import CreateTurma from './CreateTurma'
export default function Turmas() {
  const location = useLocation()
  const navigate = useNavigate()

  const [turmas, setTurmas] = useState([])

  useEffect(() => {
    apiGet('/api/turmas')
      .then((data) => setTurmas(data))
      .catch((err) => console.log(err))
  }, [location.pathname])

  const [searchTurma, setSearchTurma] = useState('')

  function handleChange(evento) {
    setSearchTurma(evento.target.value)
  }

  const turmasFiltradas = turmas.filter(({ serie }) =>
    serie.toLowerCase().includes(searchTurma.toLowerCase().trim())
  )
  function handleUpdateTurma(turmaAtualizada) {
    setTurmas((prev) => prev.map((t) => (t.id === turmaAtualizada.id ? turmaAtualizada : t)))
  }
  function handleUpdateTurmas(novaTurma) {
    setTurmas((prev) => [...prev, novaTurma])
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-search-grid'>
            <Search
              type={'text'}
              name={'turma'}
              placeholder={`Procurar turma`}
              onChange={handleChange}
            />

            <button
              className='buttonCreate'
              onClick={() => {
                navigate('/admin/turmas/createTurma')
              }}
            >
              <IoAddCircle />
            </button>
            <div className='grid-turmas'>
              {turmasFiltradas.length > 0 ? (
                turmasFiltradas.map((turma) => <CardTurma key={turma.id} {...turma} />)
              ) : (
                <p>Nenhuma turma encontrada</p>
              )}
            </div>
          </section>
        }
      />
      <Route path=':id' element={<EditTurma onUpdate={handleUpdateTurma} />} />
      <Route path='createTurma' element={<CreateTurma onUpdate={handleUpdateTurmas} />} />
    </Routes>
  )
}
