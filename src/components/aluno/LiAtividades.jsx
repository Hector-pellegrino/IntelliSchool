import React from 'react'



export default function LiAtividades({atividades, toogleAtv, atualizarResposta, entregarAtividade, validarEntrega}) {

  return (
    // {viewAtividades.map(({ id, titulo, descricao, status, aberto, resposta }) => (
    atividades.map(({id, titulo, descricao, status, aberto, resposta}) =>  (
    <li key={id} className={`atividade ${status.toLowerCase().replace(' ', '-')}`}>
      {/* Cabeçalho */}
      <div className='atividade-header' onClick={() => toogleAtv(id)}>
        <span>{titulo}</span>
        <span className='status'>{status}</span>
      </div>

      {/* Conteúdo expandido */}
      {aberto && (
        <div className='atividade-detalhes'>
          <p className='descricao'>
            <strong>Proposta:</strong> {descricao}
          </p>

          {status === 'Pendente' && (
            <>
              <textarea
                name={`atv-${id}`}
                placeholder='Escreva sua resposta ou anexe o trabalho aqui...'
                value={resposta}
                onChange={(e) => atualizarResposta(id, e.target.value)}
              />
              <button
                className='btn-entregar'
                onClick={() => entregarAtividade(id)}
                disabled={resposta.trim() === ''}
              >
                Entregar Atividade
              </button>
            </>
          )}

          {status === 'Em Análise' && (
            <>
              <p className='texto-analise'>⏳ Sua atividade foi enviada e está em análise.</p>
              <button className='btn-validar' onClick={() => validarEntrega(id)}>
                Validar (Simulação do Professor)
              </button>
            </>
          )}

          {status === 'Entregue' && (
            <p className='texto-sucesso'>✅ Atividade entregue e validada!</p>
          )}
        </div>
      )}
    </li>
    )) 
  )
}
