import React, { useState } from 'react'
import { apiPut, apiGet } from '../../../../api'
import './Atividade.css'

export default function AtividadeHeader({ atividade, atualizarAtividade }) {
  const [showPrazoInput, setShowPrazoInput] = useState(false)
  const [novoPrazo, setNovoPrazo] = useState('')
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false)

  async function handlePrazo(e) {
    e.preventDefault()
    try {
      await apiPut(`/api/tarefas/${atividade.id}`, { prazo: novoPrazo })
      alert('Prazo atualizado')
      await atualizarAtividade()
      setShowPrazoInput(false)
      setNovoPrazo('')
    } catch {
      alert('Erro ao atualizar prazo')
    }
  }

  async function toggleVisibilidade(visivel) {
    const confirmacao = window.confirm(
      `Deseja realmente ${visivel ? 'reativar' : 'desativar'} esta atividade?`
    )
    if (!confirmacao) return
    try {
      setIsTogglingVisibility(true)
      await apiPut(`/api/tarefas/${atividade.id}`, { visivel })
      await atualizarAtividade()
    } finally {
      setIsTogglingVisibility(false)
    }
  }

  return (
    <div className='atividade-top'>
      <div className='atividade-dados'>
        <h2>{atividade.titulo}</h2>
        <small>{atividade.descricao}</small>
        <p>Prazo: {atividade.prazo ? String(atividade.prazo).split('T')[0] : 'Sem prazo'}</p>
        <p>Visível: {atividade.visivel ? 'Sim' : 'Não'}</p>
      </div>

      <div className='atividade-acoes'>
        {showPrazoInput ? (
          <form onSubmit={handlePrazo}>
            <input
              type='date'
              value={novoPrazo}
              onChange={(e) => setNovoPrazo(e.target.value)}
              required
            />
            <button type='submit'>Confirmar</button>
            <button type='button' onClick={() => setShowPrazoInput(false)}>
              Cancelar
            </button>
          </form>
        ) : (
          <button onClick={() => setShowPrazoInput(true)}>Estender prazo</button>
        )}

        <button
          onClick={() => toggleVisibilidade(!atividade.visivel)}
          disabled={isTogglingVisibility}
        >
          {isTogglingVisibility
            ? 'Aguarde...'
            : atividade.visivel
            ? 'Desativar Atividade'
            : 'Reativar Atividade'}
        </button>
      </div>
    </div>
  )
}
