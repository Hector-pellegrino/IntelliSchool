import './CardAluno.css'
import { FaCircleUser } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { apiGet } from '../../../api'

export default function CardAluno({ id, nome, email }) {
  const navigate = useNavigate()
  const [turma, setTurma] = useState('carregando...')

  useEffect(() => {
    apiGet(`/api/matriculas/aluno/${id}`)
      .then((data) => setTurma(data[0]?.turma || 'carregando'))
      .catch((err) => console.log(err))
  }, [])
  function navigateEditAluno() {
    navigate(`/admin/alunos/${id}`)
  }

  return (
    <div className='card-aluno'>
      <FaCircleUser />
      <div>
        <p>
          <span>Nome:</span> {nome}
        </p>
        <p>
          <span>Email:</span> {email}
        </p>
        <p>
          <span>Turma:</span> {turma.serie ? turma.serie : 'Sem turma'}
        </p>
        <FaEdit onClick={navigateEditAluno}/>
      </div>
    </div>
  )
}
