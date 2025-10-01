import { useState } from 'react'
import Input from '../form/Input'
import { FaTrashAlt, FaArrowRight, FaArrowDown } from 'react-icons/fa'
import './EditTurma.css'

export default function EditTurma() {
  const [view, setView] = useState(false)
  const [viewAlunos, setViewAlunos] = useState(false)
  const [viewMaterias, setViewMaterias] = useState(false)
  const [novaMateria, setNovaMateria] = useState('')
  const [turma, setTurma] = useState(JSON.parse(sessionStorage.getItem('turmaSelecionada')))
  function handleChange(evento) {
    setTurma({ ...turma, [evento.target.name]: evento.target.value })
  }

  function removeAluno(aluno) {
    const alunos = turma.alunos.filter((alunoFilter) => alunoFilter !== aluno)
    const novaTurma = { ...turma, alunos }
    setTurma(novaTurma)
    sessionStorage.setItem('turmaSelecionada', JSON.stringify(novaTurma))
  }
  function removeMateria(materia) {
    const materias = turma.materias.filter((materiaFilter) => materiaFilter !== materia)
    const novaTurma = { ...turma, materias }
    setTurma(novaTurma)
    sessionStorage.setItem('turmaSelecionada', JSON.stringify(novaTurma))
  }

  function openView(e) {
    e.preventDefault()
    setView(!view)
  }

  function addMateria(e) {
    e.preventDefault()
    const materias = [...turma.materias, novaMateria]
    const novaTurma = { ...turma, materias }
    setTurma(novaTurma)
    setView(false)
    sessionStorage.setItem('turmaSelecionada', JSON.stringify(novaTurma))
  }

  function showAlunos() {
    setViewAlunos(!viewAlunos)
  }
  function showMaterias() {
    setViewMaterias(!viewMaterias)
  }
  return (
    <section className='section-edit-turma'>
      <form className='form-edit-turma'>
        <div className='form-div-label-input'>
          <label className='label-edit-turma' htmlFor={turma.nome}>
            Nome:
          </label>
          <input
            className='input-edit-turma'
            type='text'
            placeholder='Nome da turma'
            id={turma.id}
            onChange={handleChange}
            name={turma.nome}
            defaultValue={turma.nome}
          />
        </div>

        <div className='form-div-lista-alunos'>
          <h2 className='title-alunos-materias' onClick={showAlunos}>
            Alunos: {viewAlunos ? <FaArrowDown /> : <FaArrowRight />}
          </h2>
          {viewAlunos &&
            turma.alunos.sort().map((aluno) => (
              <div className='div-aluno' key={`div-${aluno}`}>
                <p key={`aluno-${aluno}`}>{aluno}</p>{' '}
                <FaTrashAlt onClick={() => removeAluno(aluno)} />
              </div>
            ))}
        </div>

        <div className='form-div-lista-materias'>
          <h2 className='title-alunos-materias' onClick={showMaterias}>
            Matérias: {viewMaterias ? <FaArrowDown /> : <FaArrowRight />}
          </h2>
          {viewMaterias && (
            <>
              {turma.materias.sort().map((materia) => (
                <div className={`div-materia`} key={`div-${materia}`}>
                  <p key={`materia-${materia}`}>{materia}</p>{' '}
                  <FaTrashAlt onClick={() => removeMateria(materia)} />{' '}
                </div>
              ))}
              {view ? (
                <div className='addMateria'>
                  <input
                    type='text'
                    placeholder='Digite o nome da materia'
                    onChange={(e) => setNovaMateria(e.target.value.trim())}
                  />
                  <div className='conteiner-buttons-materias'>
                    <button className='buttons-materias' id='button-salvar' onClick={addMateria}>
                      Salvar
                    </button>
                    <button className='buttons-materias' id='button-cancelar' onClick={openView}>
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <button className='buttons-materias' onClick={openView}>
                  Adiconar materia
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </section>
  )
}
