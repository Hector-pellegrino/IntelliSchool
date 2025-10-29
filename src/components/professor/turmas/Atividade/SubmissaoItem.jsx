import React, { useState } from 'react'
import AvaliacoesList from './AvaliacoesList'
import AvaliacaoForm from './AvaliacaoForm'

export default function SubmissaoItem({ submissao, currentUser, idAtividade, recarregar }) {
  const [showAvaliar, setShowAvaliar] = useState(false)
  const [showAvaliacoes, setShowAvaliacoes] = useState(false)

  return (
    <li className='submissao-item'>
      <div className='submissao-top'>
        <strong>{submissao.User?.nome ?? 'Aluno'}</strong>
        <a href={submissao.link_arquivo} target='_blank' rel='noreferrer'>
          Arquivo enviado
        </a>
        <span className='submissao-data'>{String(submissao.data_envio).split('T')[0]}</span>
      </div>

      {submissao.avaliacao ? (
        showAvaliacoes ? (
          <AvaliacoesList
            submissao={submissao.id}
            onClose={() => setShowAvaliacoes(false)}
            handleUpdate={recarregar}
          />
        ) : (
          <button onClick={() => setShowAvaliacoes(true)}>Abrir avaliação</button>
        )
      ) : (
        <>
          {!showAvaliar && <button onClick={() => setShowAvaliar(true)}>Avaliar</button>}
          {showAvaliar && (
            <AvaliacaoForm
              submissaoId={submissao.id}
              currentUser={currentUser}
              onCancel={() => setShowAvaliar(false)}
              onSuccess={recarregar}
              idAtividade={idAtividade}
            />
          )}
        </>
      )}
    </li>
  )
}
