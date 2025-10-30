import './Alunos.css'
import { IoAddCircle } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import CardAluno from './CardAluno'
import EditAluno from './EditAluno'
import CreateAluno from './CreateAluno'
import Search from '../Search'
import { apiGet } from '../../../api'
import { Route, Routes } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Alunos() {
  const navigate = useNavigate()
  const [searchAluno, setSearchAluno] = useState('')
  const [alunosFiltrados, setAlunosFiltrados] = useState('')

  function handleChange(evento) {
    setSearchAluno(evento.target.value)
  }

  async function procurar() {
    const data = await apiGet(`/api/usuarios?tipo=aluno`)
    return setAlunosFiltrados(
      data.filter((aluno) => aluno.nome.toLowerCase().includes(searchAluno.toLowerCase().trim()))
    )
  }
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-alunos-search'>
            <Search
              type='text'
              name='aluno'
              placeholder='Procurar aluno'
              onChange={handleChange}
              onSearch={procurar}
            />
            <button
              className='buttonCreate'
              onClick={() => {
                navigate('/admin/alunos/createAluno')
              }}
            >
              <IoAddCircle />
            </button>

            <div className='grid-alunos'>
              {alunosFiltrados.length !== 0 ? (
                alunosFiltrados.map((aluno) => <CardAluno key={aluno.id} {...aluno} />)
              ) : (
                <p>Procure por um aluno</p>
              )}
            </div>
          </section>
        }
      />
      <Route path=':id' element={<EditAluno />} />
      <Route path='createAluno' element={<CreateAluno />} />
    </Routes>
  )
}
