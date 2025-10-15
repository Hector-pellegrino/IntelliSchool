import './CardProfessor.css'
import { FaEdit } from 'react-icons/fa'
import { FaCircleUser } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function CardProfessor({ id, nome, email }) {
  const navigate = useNavigate()
  function navigateEditProfessores() {
    navigate(`/admin/professores/${id}`)
  }
  return (
    <div className='card-professor'>
      <FaCircleUser />
      <div>
        <p>
          <span>Nome:</span> {nome}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
        <FaEdit onClick={navigateEditProfessores} />
      </div>
    </div>
  )
}
