import { useEffect, useState } from 'react'
import { FaTrashAlt, FaArrowRight, FaArrowDown } from 'react-icons/fa'
import { RxAvatar } from 'react-icons/rx'
import { IoBookOutline, IoReturnUpBackOutline } from 'react-icons/io5'
import { IoMdPersonAdd } from 'react-icons/io'
import { useParams, useNavigate } from 'react-router-dom'
import './EditTurma.css'
import Loading from '../../../assets/loading.svg'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../api'

export default function EditTurma({ onUpdate }) {
  const { id } = useParams()

  const navigate = useNavigate()

  const [view, setView] = useState(false)
  const [viewAlunos, setViewAlunos] = useState(false)
  const [viewMaterias, setViewMaterias] = useState(false)
  const [novaMateria, setNovaMateria] = useState(null)
  const [novoProfessor, setNovoProfessor] = useState(null)
  const [CurrentMateriaNome, setCurrentMateriaNome] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [nome, setNome] = useState(null)

  const [turma, setTurma] = useState(null)
  const [materiasTurma, setMateriasTurma] = useState([])
  const [alunos, setAlunos] = useState([])
  const [alunosRemoved, setAlunosRemoved] = useState([])
  const [allMaterias, setAllMaterias] = useState([])
  const [allProfessores, setAllProfessores] = useState([])

  useEffect(() => {
    apiGet(`/api/turmas/${id}`)
      .then((data) => setTurma(data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    apiGet(`/api/listar-turma-disciplina/turma/${id}`)
      .then((data) => setMateriasTurma(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    apiGet(`/api/matriculas/turma/${id}`)
      .then((data) => setAlunos(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    apiGet('/api/disciplinas')
      .then((data) => setAllMaterias(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    apiGet('/api/usuarios?tipo=professor&ativo=true')
      .then((data) => setAllProfessores(data))
      .catch((err) => console.log(err))
  }, [])
  function handleChangeNome(evento) {
    setNome(evento.target.value)
  }

  async function removeAluno(aluno) {
    const matricula = await apiGet(`/api/matriculas/aluno/${aluno.User.id}`)
    await apiDelete(`/api/matriculas/${matricula[0].id}`)
    setAlunos(alunos.filter((currentAluno) => currentAluno.User.id !== aluno.User.id))
    setAlunosRemoved((prev) => [...prev, aluno])
  }

  async function addAluno(aluno) {
    apiPost(`/api/matriculas`, {
      aluno_id: aluno.User.id,
      turma_id: id,
      data_matricula: new Date().toISOString().split('T')[0],
    })
    setAlunosRemoved(alunosRemoved.filter((currentAluno) => currentAluno.User.id !== aluno.User.id))
    setAlunos((prev) => [...prev, aluno])
  }

  async function removeMateria(e, materia) {
    e.preventDefault()
    const data = await apiGet(
      `/api/atribuicao/retorna-atribuicao?disciplina_id=${materia.id}&turma_id=${id}`
    )
      .then((data) => {
        return data
      })
      .catch((err) => console.log(err))
    await apiDelete(`/api/professor-turma-disciplina/${data.id_atribuicao}`)
    setMateriasTurma(
      materiasTurma.filter((currentMateria) => currentMateria.disciplina.id !== materia.id)
    )
  }

  function addMateria(event, novaMateria, novoProfessor, CurrentMateriaNome) {
    event.preventDefault()
    apiPost(`/api/professor-turma-disciplina`, {
      professor_id: novoProfessor,
      turma_id: id,
      disciplina_id: novaMateria,
    })
    setMateriasTurma((prev) => [
      ...prev,
      { disciplina: { id: novaMateria, nome: CurrentMateriaNome } },
    ])
    setView(false)
  }

  function openView(e) {
    e.preventDefault()
    setView(!view)
  }

  function showAlunos() {
    setViewAlunos(!viewAlunos)
  }
  function showMaterias() {
    setViewMaterias(!viewMaterias)
  }
  function navigateTurmas() {
    navigate('/admin/turmas')
  }

  async function handleSave(e) {
    e.preventDefault()
    const atualizado = await apiPut(`/api/turmas/${id}`, {
      ano: turma.ano,
      serie: nome ? nome : turma.serie,
      periodo: turma.periodo,
    })
    onUpdate(atualizado.data[0])
    navigate('/admin/turmas')
  }

  async function handleDelete(e) {
    e.preventDefault()
    await apiDelete(`/api/turmas/${id}`)
    navigate('/admin/turmas')
  }

  if (isLoading) {
    return <img src={Loading} alt='' />
  }
  if (!turma) {
    return <p>Turma não encontrada</p>
  }

  function handleModalOpen(e) {
    e.preventDefault()
    setIsModalOpen(true)
  }
  return (
    <section className='section-edit-turma'>
      <button className='button-voltar' onClick={navigateTurmas}>
        <IoReturnUpBackOutline />
      </button>
      <form className='form-edit-turma'>
        <div className='form-div-label-input'>
          <label className='label-edit-turma' htmlFor={turma.serie}>
            Turma:
          </label>
          <input
            className='input-edit-turma'
            type='text'
            placeholder='Nome da turma'
            id={turma.id}
            onChange={handleChangeNome}
            name={turma.serie}
            defaultValue={turma.serie}
          />
        </div>

        <div className='form-div-lista-alunos'>
          <h2 className='title-alunos-materias' onClick={showAlunos}>
            Alunos: {viewAlunos ? <FaArrowDown /> : <FaArrowRight />}
          </h2>
          {viewAlunos && (
            <>
              {alunos.sort().map((aluno) => (
                <div className='div-aluno' key={`div-${aluno.User.id}`}>
                  <div>
                    <RxAvatar />
                    <p key={`aluno-${aluno.User.id}`}>{aluno.User.nome}</p>{' '}
                  </div>
                  <FaTrashAlt onClick={() => removeAluno(aluno)} />
                </div>
              ))}
              {alunosRemoved && (
                <>
                  {alunosRemoved.map((alunoRemoved) => (
                    <div className='div-aluno' key={`div-${alunoRemoved.User.id}`}>
                      <RxAvatar />
                      <p key={`aluno-${alunoRemoved.User.id}`}>{alunoRemoved.User.nome}</p>
                      <IoMdPersonAdd onClick={() => addAluno(alunoRemoved)} />
                    </div>
                  ))}{' '}
                </>
              )}
            </>
          )}
        </div>

        <div className='form-div-lista-materias'>
          <h2 className='title-alunos-materias' onClick={showMaterias}>
            Matérias: {viewMaterias ? <FaArrowDown /> : <FaArrowRight />}
          </h2>
          {viewMaterias && (
            <>
              {materiasTurma.map((materia) => (
                <div className={`div-materia`} key={`div-${materia.disciplina.id}`}>
                  <div>
                    <IoBookOutline />
                    <p>{materia.disciplina.nome}</p>{' '}
                  </div>
                  <FaTrashAlt onClick={(e) => removeMateria(e, materia.disciplina)} />{' '}
                </div>
              ))}
              {view ? (
                <div className='addMateria'>
                  <select
                    name=''
                    id=''
                    className='input-materias'
                    onChange={(e) => {
                      setNovaMateria(e.target.value)
                      setCurrentMateriaNome(
                        e.target.options[e.target.selectedIndex].getAttribute('materianome')
                      )
                    }}
                  >
                    <option value=''>Selecione uma disciplina</option>
                    {allMaterias.map((materia) => (
                      <option key={materia.id} value={materia.id} materianome={materia.nome}>
                        {materia.nome}
                      </option>
                    ))}
                  </select>
                  <select
                    name=''
                    id=''
                    className='input-materias'
                    onChange={(e) => setNovoProfessor(e.target.value)}
                  >
                    <option value=''>Selecione um Professor</option>
                    {allProfessores.map((professor) => (
                      <option key={professor.id} value={professor.id}>
                        {professor.nome}
                      </option>
                    ))}
                  </select>
                  <div className='conteiner-buttons-materias'>
                    <button className='buttons-materias' id='button-cancelar' onClick={openView}>
                      Cancelar
                    </button>
                    <button
                      className='buttons-materias'
                      id='button-salvar'
                      onClick={(event) =>
                        addMateria(event, novaMateria, novoProfessor, CurrentMateriaNome)
                      }
                    >
                      Salvar
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
        <div className='salvar-excluir'>
          <button className='excluir-turma'>
            <FaTrashAlt onClick={(e) => (handleModalOpen(e))} />
          </button>
          <button className='button-enviar' onClick={handleSave}>
            Salvar
          </button>
        </div>
      </form>
      {isModalOpen && (<div className='modal-excluir-turma'>
        <div className='modal-content'>
          <p>Tem certeza que deseja excluir esta turma?</p>
          <div className='modal-buttons'>
            <button className='modal-button' id='cancel' onClick={() => setIsModalOpen(false)}>Cancelar</button>
            <button className='modal-button' id='confirm' onClick={(e) => { handleDelete(e)}}>Confirmar</button>
          </div>
        </div>
      </div>)}
    </section>
  )
}
