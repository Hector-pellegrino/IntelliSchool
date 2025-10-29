import './TurmasProfessor.css'

import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import { apiGet } from '../../../api'
import { Route, Routes, useNavigate } from 'react-router-dom'
import DisciplinasTurma from './DisciplinasTurma'
import CardTurma from './CardTurma'
import AtividadesDisciplina from './AtividadesDisciplina'
import Atividade from './Atividade/Atividade'

export default function TurmasProfessor() {
  const { currentUser } = useContext(UserContext)
  const [currentTurma, setCurrentTurma] = useState()
  const [atribuicoes, setAtribuicoes] = useState([])
  const [turmasProf, setTurmas] = useState([])

  useEffect(() => {
    apiGet(`/api/professor-turma-disciplina/professor/${currentUser.id}`)
      .then((data) => setAtribuicoes(data))
      .catch((err) => console.log(err))
  }, [currentUser?.id])

  useEffect(() => {
    apiGet(`/api/professor-turmas-distintas/${currentUser.id}`)
      .then((data) => setTurmas(data))
      .catch((err) => console.log(err))
  }, [])

  function atualizarCurrentTurma(turma) {
    setCurrentTurma(turma)
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <section className='conteiner-card-turmas'>
            {turmasProf.length > 0 ? (
              turmasProf.map((turma) => (
                <CardTurma key={turma.id} handleTurma={atualizarCurrentTurma} {...turma} />
              ))
            ) : (
              <p>Não há nenhuma turma</p>
            )}
          </section>
        }
      ></Route>
      <Route
        path='/turma/:idTurma'
        element={<DisciplinasTurma atribuicoes={atribuicoes} serie={currentTurma} />}
      ></Route>
      <Route
        path='/turma/:idTurma/atividades/:idAtividadesDisciplina'
        element={<AtividadesDisciplina />}
      ></Route>
      <Route
        path='/turma/:idTurma/atividades/:idAtividadesDisciplina/atividade/:idAtividade'
        element={<Atividade />}
      ></Route>
    </Routes>
  )
}
