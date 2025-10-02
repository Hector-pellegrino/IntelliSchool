import { useState } from 'react'

export default function LiAtividades({
  atividades,
  atualizarResposta,
  atualizarArquivo,
  entregarAtividade,
  validarEntrega,
}) {
  const [atividadesAbertas, setAtividadesAbertas] = useState([])
  function toggleAtividade(id) {
    if (atividadesAbertas.includes(id)) {
      setAtividadesAbertas(atividadesAbertas.filter((atvId) => atvId !== id))
    } else {
      setAtividadesAbertas([...atividadesAbertas, id])
    }
  }

  return (
    // {viewAtividades.map(({ id, titulo, descricao, status, aberto, resposta }) => (
    atividades.map(({ id, titulo, descricao, status, resposta }) => (
      <li
        id={`atividade-${id}`}
        key={id}
        className={`atividade ${status.toLowerCase().replace(' ', '-')}`}
      >
        <div className='atividade-header' onClick={() => toggleAtividade(id)}>
          <span>{titulo}</span>
          <span className='status'>{status}</span>
        </div>

        {atividadesAbertas.includes(id) && (
          <div className='atividade-detalhes' id={`atividade-${id}`}>
            <p className='descricao'>
              <strong>Proposta:</strong> {descricao}
            </p>

            {status === 'Pendente' && (
              <>
                <textarea
                  name={`atv-${id}`}
                  placeholder='Escreva sua resposta ou anexe o trabalho aqui...'
                  onChange={(e) => atualizarResposta(id, e.target.value)}
                />
                <input type='file' onChange={(e) => atualizarArquivo(id, e.target.value)} />
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
