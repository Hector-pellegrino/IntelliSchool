import './Alunos.css'
import { useEffect, useState } from 'react'
import CardAluno from './CardAluno'
import EditAluno from './EditAluno'
import { FaSearch } from 'react-icons/fa'
import Search from '../Search'
import { apiGet } from '../../../api'
import { Route, Routes } from 'react-router-dom'

export default function Alunos() {
  const [alunos, setAlunos] = useState([])
  const [searchAluno, setSearchAluno] = useState('')

  useEffect(() => {
    apiGet(`/api/usuarios?tipo=aluno`)
      .then((data) => setAlunos(data))
      .catch((err) => console.log(err))
  }, [])

  function handleChange(evento) {
    setSearchAluno(evento.target.value)
  }
  const alunosFiltrados = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(searchAluno.toLowerCase().trim())
  )
  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-alunos-search'>
            <Search type='text' name='aluno' placeholder='Procurar aluno' onChange={handleChange} />

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
      <Route path=':id' element={<EditAluno/>} />
    </Routes>
  )
}
