import './Professores.css'

import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from '../Search'
import { apiGet } from '../../../api'
import { IoAddCircle } from 'react-icons/io5'
import { useNavigate, useLocation } from 'react-router-dom'
import CardProfessor from './CardProfessor'
import CreateProfessor from './CreateProfessor'
import EditProfessor from './EditProfessor'

export default function professores() {
  const navigate = useNavigate()
  const location = useLocation()
  const [professores, setProfessores] = useState([])
  const [searchProfessor, setSearchProfessor] = useState('')

  useEffect(() => {
    apiGet(`/api/usuarios?tipo=professor&ativo=true`)
      .then((data) => setProfessores(data))
      .catch((err) => console.log(err))
  }, [location.pathname])

  function handleChange(evento) {
    setSearchProfessor(evento.target.value)
  }

  const professoresFiltrados = professores.filter((professor) =>
    professor.nome.toLowerCase().includes(searchProfessor.toLowerCase().trim())
  )
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-professores-search'>
            <Search
              type='text'
              name='professor'
              placeholder='Procurar professor'
              onChange={handleChange}
            ></Search>
            <button
              className='buttonCreate'
              onClick={() => {
                navigate('/admin/professores/createProfessor')
              }}
            >
              <IoAddCircle />
            </button>

            <div className='grid-professores'>
              {professoresFiltrados.length !== 0 ? (
                professoresFiltrados.map((professor) => (
                  <CardProfessor key={professor.id} {...professor} />
                ))
              ) : (
                <p>Procure por um professor</p>
              )}
            </div>
          </section>
        }
      ></Route>
      <Route path='createProfessor' element={<CreateProfessor/>} />
      <Route path=':id' element={<EditProfessor/>} />
    </Routes>
  )
}
