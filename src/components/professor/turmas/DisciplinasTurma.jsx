import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { IoReturnUpBackOutline, IoBookOutline } from 'react-icons/io5'
import './DisciplinasTurma.css'
import { apiGet } from '../../../api'
import Loading from '../../Loading'

export default function AtividadesTurma({ atribuicoes, serie }) {
  const navigate = useNavigate()
  const { idTurma } = useParams()
  const [currentTurma, setCurrentTurma] = useState('')
  const atribuicoesDessaTurma = atribuicoes.filter((atribuicao) => atribuicao.turma_id == idTurma)

  useEffect(() => {
    apiGet(`/api/turmas/18`).then(({ serie }) => setCurrentTurma(serie))
  })

  function navigateTurmas() {
    navigate('/professor/turmas')
  }
  function navigateAtividades(ptdId) {
    navigate(`/professor/turmas/turma/${idTurma}/atividades/${ptdId}`)
  }

  return (
    <section className='conteiner-atividades-turma'>
      <button className='button-voltar' onClick={navigateTurmas}>
        <IoReturnUpBackOutline />
      </button>
      {currentTurma.length > 0 ? (
        <section className='section-atividades-turma'>
          <h2>{currentTurma}</h2>
          <ul>
            {atribuicoesDessaTurma.map((atribuicao) => (
              <li key={atribuicao.id} onClick={() => navigateAtividades(atribuicao.id)}>
                {' '}
                <IoBookOutline /> {atribuicao.disciplina.nome}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <Loading />
      )}
    </section>
  )
}
