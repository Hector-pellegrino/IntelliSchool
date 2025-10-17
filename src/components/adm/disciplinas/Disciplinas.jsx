import './Disciplinas.css'

import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { apiGet } from '../../../api'
import { IoAddCircle } from 'react-icons/io5'
import Search from '../Search'
import CardDisciplina from './CardDisciplina'
import CreateDisciplina from './CreateDisciplina'
import { useNavigate, useLocation } from 'react-router-dom'
import EditDisciplina from './EditDisciplina'

export default function Disciplinas() {
  const navigate = useNavigate()
  const location = useLocation()
  const [allDisciplinas, setAllDisciplinas] = useState([])
  const [searchDisciplina, setSearchDisciplina] = useState('')
  useEffect(() => {
    apiGet('/api/disciplinas')
      .then((data) => setAllDisciplinas(data))
      .catch((err) => console.log(err))
  }, [location.pathname])

  const disciplinasFiltradas = allDisciplinas.filter(({ nome }) =>
    nome.toLowerCase().includes(searchDisciplina.toLowerCase().trim())
  )

  function handleChange(evento) {
    setSearchDisciplina(evento.target.value)
  }
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-disciplinas-search'>
            <Search
              type='text'
              name='professor'
              placeholder='Procurar disciplina'
              onChange={handleChange}
            ></Search>
            <button
              className='buttonCreate'
              onClick={() => {
                navigate('/admin/disciplinas/createDisciplina')
              }}
            >
              <IoAddCircle />
            </button>
            <div className='grid-disciplinas'>
              {disciplinasFiltradas.length > 0 ? (
                disciplinasFiltradas.map((disciplina) => (
                  <CardDisciplina key={disciplina.id} {...disciplina} />
                ))
              ) : (
                <p>Nenhuma materia encontrada</p>
              )}
            </div>
          </section>
        }
      ></Route>
      <Route path='createDisciplina' element={<CreateDisciplina />} />
      <Route path=':id' element={<EditDisciplina />} />
    </Routes>
  )
}
