import { FaTrashAlt } from 'react-icons/fa'
import { apiDelete, apiGet } from '../../../../api'
import { useEffect, useState } from 'react'

export default function AvaliacoesList({ submissao, onClose, handleUpdate }) {
  const [avaliacao, setAvaliacao] = useState({})
  const [isLoading, setIsLoading] = useState()
  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true)
      try {
        const dataAvaliação = await apiGet(`/api/avaliacoes/submissao/${submissao}`)
        setAvaliacao(dataAvaliação)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchAll()
  }, [])

  async function excluirAvaliacao(id) {
    try {
      setIsLoading(true)
      const { message } = await apiDelete(`/api/avaliacoes/${id}`)
      alert(message)
      await handleUpdate()
      onClose()
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='avaliacoes-existentes'>
      <h4>Avaliação</h4>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div key={avaliacao.id}>
            <p>Nota: {avaliacao.nota}</p>
            <p>Comentário: {avaliacao.comentario_geral}</p>
            <FaTrashAlt onClick={() => excluirAvaliacao(avaliacao.id)} />
          </div>
          <button onClick={onClose}>Fechar avaliação</button>
        </>
      )}
    </div>
  )
}
