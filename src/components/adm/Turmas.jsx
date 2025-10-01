import CardTurma from './CardTurma'
import Input from '../form/Input'
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'

import './Turmas.css'
export default function Turmas() {
  const turmas = [
    {
      id: 1,
      nome: '32B',
      materias: ['Matemática', 'Português'],
      alunos: ['Héctor', 'Gui', 'Leo', 'Eder', 'Cauan', 'Vitor'],
      Professor: ['Vitor Roque', 'Flaco Lopez'],
    },
    {
      id: 2,
      nome: '22B',
      materias: ['História', 'Geografia'],
      alunos: ['Héctor', 'Gui', 'Leo', 'Eder', 'Cauan', 'Vitor'],
      professores: ['Andreas Pereira', 'Felipe Anderson'],
    },
  ]

  const [searchTurma, setSearchTurma] = useState('')
  function handleChange(evento) {
    setSearchTurma(evento.target.value)
  }

  const turmasFiltradas = turmas.filter(({ nome }) =>
    nome.toLowerCase().includes(searchTurma.toLowerCase().trim())
  )
  return (
    <section className='conteiner-search-grid'>
      <div className='grid-search'>
        <input
          type={'text'}
          name={'turma'}
          placeholder={`Procurar turma`}
          onChange={handleChange}
        />
        <FaSearch />
      </div>

      <div className='grid-turmas'>
        {turmasFiltradas.length > 0 ? (
          turmasFiltradas.map((turma) => <CardTurma key={turma.id} {...turma} />)
        ) : (
          <p>Nenhuma turma encontrada</p>
        )}
      </div>
    </section>
  )
}
