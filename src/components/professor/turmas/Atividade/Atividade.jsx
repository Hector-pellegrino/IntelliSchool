import React, { useEffect, useState, useContext } from 'react'
import './Atividade.css'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import { apiGet, apiPut, apiPost } from '../../../../api'
import { UserContext } from '../../../../context/UserContext'
import Loading from '../../../Loading'
import AtividadeHeader from './AtividadeHeader'
import SubmissaoItem from './SubmissaoItem'

export default function Atividade() {
  const [atividade, setAtividade] = useState(null)
  const [submissoes, setSubmissoes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { idAtividade } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useContext(UserContext)

  useEffect(() => {
    if (!idAtividade) return
    async function fetchAll() {
      setIsLoading(true)
      try {
        const dataAtividade = await apiGet(`/api/tarefas/${idAtividade}`)
        const dataSubmissoes = await apiGet(`/api/submissoes/tarefa/${idAtividade}`)
        setAtividade(dataAtividade)
        setSubmissoes(dataSubmissoes)
      } catch (err) {
        alert('Erro ao carregar dados da atividade')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAll()
  }, [idAtividade])

  // Atualiza dados da atividade
  async function atualizarAtividade() {
    const data = await apiGet(`/api/tarefas/${idAtividade}`)
    setAtividade(data)
  }

  if (isLoading) return <Loading />
  if (!atividade) return <p>Atividade não encontrada</p>

  return (
    <section className='conteiner-atividade'>
      <button className='button-voltar' onClick={() => navigate(-1)}>
        <IoReturnUpBackOutline />
      </button>

      <AtividadeHeader atividade={atividade} atualizarAtividade={atualizarAtividade} />

      <h2>Submissões</h2>
      <ul className='submissoes-list'>
        {submissoes.length === 0 ? (
          <p>Nenhuma submissão</p>
        ) : (
          submissoes.map((sub) => (
            <SubmissaoItem
              key={sub.id}
              submissao={sub}
              idAtividade={idAtividade}
              currentUser={currentUser}
              recarregar={() => apiGet(`/api/submissoes/tarefa/${idAtividade}`).then(setSubmissoes)}
            />
          ))
        )}
      </ul>
    </section>
  )
}
