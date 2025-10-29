import React, { useState } from 'react'
import { apiPost, apiGet } from '../../../../api'

export default function AvaliacaoForm({
  submissaoId,
  currentUser,
  onCancel,
  onSuccess,
  idAtividade,
}) {
  const [nota, setNota] = useState('')
  const [comentario, setComentario] = useState('')
  const [requerReenvio, setRequerReenvio] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!currentUser?.id) return alert('Usuário não identificado')

    const body = {
      submissao_id: Number(submissaoId),
      professor_id: Number(currentUser.id),
      nota: Number(nota),
      comentario_geral: comentario,
      comentarios_detalhados: {},
      requer_reenvio: Boolean(requerReenvio),
    }

    try {
      const data = await apiPost('/api/avaliacoes', body)
      if (data.message) alert('Avaliação enviada com sucesso')
      await onSuccess()
      onCancel()
    } catch (err) {
      console.error(err)
      alert('Erro ao enviar avaliação')
    }
  }

  return (
    <form className='form-avaliacao' onSubmit={handleSubmit}>
      <div>
        <label>Nota:</label>
        <input
          type='number'
          step='0.5'
          min='0'
          max='10'
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Comentário geral:</label>
        <textarea value={comentario} onChange={(e) => setComentario(e.target.value)} />
      </div>

      <div>
        <label>
          <input
            type='checkbox'
            checked={requerReenvio}
            onChange={(e) => setRequerReenvio(e.target.checked)}
          />
          Requer reenvio
        </label>
      </div>

      <div className='form-avaliacao-actions'>
        <button type='submit'>Enviar avaliação</button>
        <button type='button' onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  )
}
