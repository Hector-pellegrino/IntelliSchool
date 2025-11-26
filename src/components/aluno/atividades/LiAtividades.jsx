import './LiAtividades.css'
import { useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import { apiPost } from '../../../api'
import { MdOutlineFileUpload } from 'react-icons/md'
import { FaTrashAlt } from 'react-icons/fa'

export default function LiAtividades({ atividades, functionEnviar }) {
  const { currentUser } = useContext(UserContext)
  const [atividadesAbertas, setAtividadesAbertas] = useState([])
  function toggleAtividade(id) {
    if (atividadesAbertas.includes(id)) {
      setAtividadesAbertas(atividadesAbertas.filter((atvId) => atvId !== id))
    } else {
      setAtividadesAbertas([...atividadesAbertas, id])
    }
  }

  async function entregarAtividade(arquivo, id, idUsuario) {
    const formData = new FormData()
    formData.append('file', arquivo) // nome "file" deve coincidir com o esperado no backend
    formData.append('aluno_id', idUsuario)
    formData.append('tarefa_id', id)

    apiPost('/api/submissoes/upload', formData)
      .then((data) => alert(data.message))
      .catch((error) => console.log(error))
    functionEnviar(id)
  }
  const [arquivo, setArquivo] = useState(null)

  return (
    // {viewAtividades.map(({ id, titulo, descricao, status, aberto, resposta }) => (
    atividades.map(
      ({ tarefa_id, titulo, descricao, link_material, prazo, disciplina, enviada, avaliacao }) => (
        <li id={`atividade-${tarefa_id}`} key={tarefa_id} className={`atividade`}>
          <div
            className={`atividade-header ${enviada ? 'tarefaEnviada' : ''}`}
            onClick={() => toggleAtividade(tarefa_id)}
          >
            <span>
              {disciplina.nome} - {titulo}
            </span>
          </div>

          {atividadesAbertas.includes(tarefa_id) &&
            (enviada ? (
              <div className='tarefa-enviada'>
                <p>Tarefa enviada</p>
                <p>Nota: {avaliacao?.nota ? avaliacao.nota : ' Aguardando nota...'}</p>
                <p>Comentario: {avaliacao?.comentario_geral}</p>
              </div>
            ) : (
              <div className='atividade-detalhes'>
                <p className='descricao'>
                  <strong>Descrição:</strong> {descricao}
                </p>
                <p>
                  <strong>Prazo:</strong> {prazo.replace(/-/g, '/').replace('T', ' - ')}
                </p>
                <p>
                  <strong>Arquivo do Professor:</strong> {link_material}
                </p>
                <strong>
                  <label htmlFor='resposta'>Resposta:</label>
                </strong>
                {arquivo ? (
                  <div className='div-arquivo-resposta'>
                    <p>{arquivo.name}</p>
                    <FaTrashAlt onClick={() => setArquivo(null)} />
                  </div>
                ) : (
                  <div className='div-input-resposta'>
                    <input
                      name='resposta'
                      className='input-resposta'
                      type='file'
                      onChange={(e) => setArquivo(e.target.files[0])}
                    />
                    <MdOutlineFileUpload /> Carregar Arquivo
                  </div>
                )}
                <button
                  className='btn-entregar'
                  onClick={() => entregarAtividade(arquivo, tarefa_id, currentUser.id)}
                >
                  Entregar Atividade
                </button>
              </div>
            ))}
        </li>
      )
    )
  )
}
