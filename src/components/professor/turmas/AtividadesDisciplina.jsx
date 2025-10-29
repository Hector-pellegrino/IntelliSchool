import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiDelete, apiGet, apiPost } from '../../../api'
import { IoReturnUpBackOutline, IoAddCircle } from 'react-icons/io5'
import { FaTrashAlt, FaEye } from 'react-icons/fa'
import './AtividadesDisciplina.css'

export default function AtividadesTurma() {
  const navigate = useNavigate()
  const [toogleModal, setToogleModal] = useState(false)
  const { idTurma, idAtividadesDisciplina } = useParams()
  const [atividades, setAtividades] = useState([])
  const [novaAtividade, setNovaAtividade] = useState({
    titulo: '',
    descricao: '',
    prazo: '',
    tipo: '',
    link_material: '',
    visivel: true,
    professor_turma_disciplina_id: idAtividadesDisciplina,
  })

  function handleChange(e) {
    const value = e.target.value
    setNovaAtividade((prev) => ({ ...prev, [e.target.name]: value }))
  }
  useEffect(() => {
    apiGet(`/api/tarefas/professor-turma-disciplina/${idAtividadesDisciplina}`).then((data) =>
      setAtividades(data)
    )
  }, [])

  async function postarAtividade(e) {
    e.preventDefault()
    if (
      novaAtividade.titulo === '' ||
      novaAtividade.descricao === '' ||
      novaAtividade.prazo === '' ||
      novaAtividade.tipo === ''
    ) {
      return alert('Por favor preencha todos os campos corretamente')
    }
    const { message } = await apiPost('/api/tarefas', novaAtividade)
    try {
      alert(message)
      const data = await apiGet(`/api/tarefas/professor-turma-disciplina/${idAtividadesDisciplina}`)
      setAtividades(data)
    } catch (error) {
      alert('Falha ao criar atividade, verifique se todos campos foram preenchidos corretamente')
    } finally {
      setToogleModal(false)
    }
  }

  async function deletarTarefa(idTarefa) {
    try {
      const { message } = await apiDelete(`/api/tarefas/${idTarefa}`)
      message
        ? alert(message)
        : alert(
            'Não foi possível deletar a tarefa, verifique se ela tem alguma submissão de aluno, caso tenha e você queira apagá-la opte por desativar. Caso contrario contate um Admin.'
          )
    } catch (error) {
      alert(
        'Não foi possível deletar a tarefa, verifique se ela tem alguma submissão de aluno, caso tenha e você queira apagá-la opte por desativar. Caso contrario contate um Admin'
      )
    } finally {
      const data = await apiGet(`/api/tarefas/professor-turma-disciplina/${idAtividadesDisciplina}`)
      setAtividades(data)
    }
  }
  function navigateTurmas() {
    navigate(-1)
  }
  function navigateAtividade(idAtividade) {
    navigate(
      `/professor/turmas/turma/${idTurma}/atividades/${idAtividadesDisciplina}/atividade/${idAtividade}`
    )
  }
  const [filtro, setFiltro] = useState('ativas')
  const atividadesFiltradas = atividades.filter((atividade) => {
    if (filtro === 'todas') return true
    if (filtro === 'ativas') return atividade.visivel === true
    if (filtro === 'inativas') return atividade.visivel === false
    return true
  })
  return (
    <section className='conteiner-atividades-disciplina'>
      <button className='button-voltar' onClick={navigateTurmas}>
        <IoReturnUpBackOutline />
      </button>
      <div className='filtros'>
        <button
          className={filtro === 'ativas' ? 'btn-filtrar active' : 'btn-filtrar'}
          onClick={() => setFiltro('ativas')}
        >
          Ativas
        </button>
        <button
          className={filtro === 'inativas' ? 'btn-filtrar active' : 'btn-filtrar'}
          onClick={() => setFiltro('inativas')}
        >
          Inativas
        </button>
        <button
          className={filtro === 'todas' ? 'btn-filtrar active' : 'btn-filtrar'}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
      </div>
      <ul className='lista-atividades-disciplina'>
        {atividadesFiltradas.length > 0 ? (
          atividadesFiltradas.map((atividade) => (
            <li key={atividade.id}>
              {atividade.titulo} - {atividade.prazo.substring(0, 10).replace(/-/g, '/')}
              <div>
                <FaEye className='inspecionar' onClick={() => navigateAtividade(atividade.id)}>
                  Inspecionar Tarefa
                </FaEye>
                <FaTrashAlt className='deletar' onClick={() => deletarTarefa(atividade.id)}>
                  Deletar
                </FaTrashAlt>
              </div>
            </li>
          ))
        ) : (
          <p>Não há tarefas</p>
        )}
      </ul>
      <button
        className='buttonCreate'
        onClick={() => {
          setToogleModal(true)
        }}
      >
        <IoAddCircle />
      </button>

      {toogleModal ? (
        <div className='conteiner-modal'>
          <form className='modal' onSubmit={postarAtividade}>
            <div>
              <label htmlFor='titulo'>Titulo:</label>
              <input
                type='text'
                placeholder='Titulo da tarefa'
                name='titulo'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='descricao'>Descrição:</label>
              <input
                type='text'
                placeholder='Descrição da tarefa'
                name='descricao'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='prazo'>Prazo:</label>
              <input
                type='date'
                placeholder='Prazo da atividade'
                name='prazo'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='tipo'>Tipo:</label>
              <input
                type='text'
                placeholder='Tipo da atividade'
                name='tipo'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='link_material'>Link do material:</label>
              <input
                type='text'
                placeholder='link do material'
                name='link_material'
                onChange={handleChange}
              />
            </div>
            <div>
              <button onClick={() => setToogleModal(false)}>Fechar</button>
              <button type='submit'>Postar Tarefa</button>
            </div>
          </form>
        </div>
      ) : (
        ''
      )}
    </section>
  )
}
