import { FaEdit } from 'react-icons/fa'
import './CardTurma.css'
import { Link, useNavigate } from 'react-router-dom'

export default function CardTurma({ id, nome, materias, alunos, professores }) {
  const navigate = useNavigate()
  function setarTurma() {
    sessionStorage.setItem(
      'turmaSelecionada',
      JSON.stringify({ id, nome, materias, alunos, professores })
    )

    navigate(`/admin/turmas/${nome}`)
  }
  return (
    <article onClick={setarTurma} className='cardTurma'>
      <h2>{nome}</h2>
      <FaEdit />
    </article>
  )
}
