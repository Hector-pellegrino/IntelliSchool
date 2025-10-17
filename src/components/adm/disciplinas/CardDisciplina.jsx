import { useNavigate } from 'react-router-dom'
import './CardDisciplina.css'

import { FaEdit } from 'react-icons/fa'

export default function CardDisciplina({ id, nome, ementa, carga_horaria }) {
  const navigate = useNavigate()
  function setarDisciplina() {
    navigate(`/admin/disciplinas/${id}`)
  }
  return (
    <div className='conteiner-cardDisciplina'>
      <div className='cardDisciplina' onClick={setarDisciplina}>
        {nome} - {ementa} - {carga_horaria}h <FaEdit />
      </div>
    </div>
  )
}
