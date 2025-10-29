import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../api'

import { FaTrashAlt } from 'react-icons/fa'
import { IoBookOutline, IoReturnUpBackOutline } from 'react-icons/io5'
import Loading from '../../Loading'

export default function EditProfessor() {
  const { id } = useParams()
  const navigate = useNavigate()

  function navigateProfessores() {
    navigate('/admin/professores')
  }

  const [novaSenha, setNovaSenha] = useState('')
  const [professor, setProfessor] = useState(null)
  const [formEditProfessor, setFormEditProfessor] = useState({
    nome: '',
    email: '',
    senha: '',
    ativo: false,
  })
  const [turmasProfessor, setTurmasProfessor] = useState([])
  const [allTurmas, setAllTurmas] = useState([])
  const [allMaterias, setAllMaterias] = useState([])
  const [selectMateria, setSelectMateria] = useState('')
  const [selectTurma, setSelectTurma] = useState('')

  // Carrega professor (uma vez, ou quando id muda)
  useEffect(() => {
    if (!id) return
    apiGet(`/api/usuarios/${id}`)
      .then((data) => {
        setProfessor(data)
        // inicializa o form com os dados do professor recebidos
        setFormEditProfessor((prev) => ({
          ...prev,
          nome: data.nome ?? '',
          email: data.email ?? '',
          ativo: !!data.ativo,
        }))
      })
      .catch((err) => console.log(err))
  }, [id])

  // Carrega atribuições do professor (uma vez, ou quando id muda)
  useEffect(() => {
    if (!id) return
    apiGet(`/api/professor-turma-disciplina/professor/${id}`)
      .then((data) => setTurmasProfessor(data))
      .catch((err) => console.log(err))
  }, [id])

  useEffect(() => {
    apiGet('/api/turmas')
      .then((data) => setAllTurmas(data))
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    apiGet('/api/disciplinas')
      .then((data) => setAllMaterias(data))
      .catch((err) => console.log(err))
  }, [])

  function handleChange(evento) {
    const { name, type, value, checked } = evento.target
    const newValue = type === 'checkbox' ? checked : value
    setFormEditProfessor((prev) => ({ ...prev, [name]: newValue }))
  }

  async function salvar(e) {
    e.preventDefault()

    // monta payload sem senha se usuario não informou nova senha
    const payload = { ...formEditProfessor }

    if (novaSenha) {
      // confirmar se confirmacao bate (você guarda confirmação em formEditProfessor.senha)
      if (novaSenha !== formEditProfessor.senha) {
        return alert('As senhas não coincidem')
      }
      payload.senha = novaSenha
    } else {
      // não enviar campo senha vazio
      delete payload.senha
    }

    try {
      const data = await apiPut(`/api/usuarios/${id}`, payload)
      alert(data.message ?? 'Salvo com sucesso')
      // opcional: atualizar dados locais
      apiGet(`/api/usuarios/${id}`).then((d) => {
        setProfessor(d)
        setFormEditProfessor((prev) => ({
          ...prev,
          nome: d.nome ?? '',
          email: d.email ?? '',
          ativo: !!d.ativo,
        }))
      })
    } catch (err) {
      console.log(err)
      alert('Erro ao salvar')
    }
  }

  async function atribuir() {
    if (!selectTurma || !selectMateria) {
      return alert('Selecione turma e disciplina')
    }
    try {
      const data = await apiPost('/api/professor-turma-disciplina', {
        professor_id: id,
        turma_id: selectTurma,
        disciplina_id: selectMateria,
      })
      if (data.detail) {
        return alert(
          'Você tentou adicionar uma atribuição inválida, ela pode já existir ou faltar algum campo.'
        )
      }
      // atualiza lista local (assumindo que API retorna a atribuição criada em data)
      if (data && data.id) {
        setTurmasProfessor((prev) => [...prev, data])
      } else {
        // caso a API não retorne o objeto, recarrega
        const remote = await apiGet(`/api/professor-turma-disciplina/professor/${id}`)
        setTurmasProfessor(remote)
      }
    } catch (err) {
      console.log(err)
      alert('Erro ao atribuir')
    }
  }

  async function removerAtribuição(idAtribuicao) {
    try {
      const resp = await apiDelete(`/api/professor-turma-disciplina/${idAtribuicao}`)
      // dependendo do retorno da sua API ajuste a verificação:
      if (resp && (resp.message === 'Atribuição removida' || resp.success)) {
        setTurmasProfessor((prev) => prev.filter((a) => a.id !== idAtribuicao))
      } else {
        // fallback: recarrega lista do servidor
        const remote = await apiGet(`/api/professor-turma-disciplina/professor/${id}`)
        setTurmasProfessor(remote)
      }
    } catch (err) {
      console.log(err)
      alert('Erro ao remover atribuição')
    }
  }

  if (!professor) return <Loading />

  return (
    <>
      <section className='section-edit-professor'>
        <button className='button-voltar' onClick={navigateProfessores}>
          <IoReturnUpBackOutline />
        </button>
        <section className='conteiner-edit-professor'>
          <form onSubmit={salvar} className='form-edit-professor'>
            <div className='forms'>
              <label htmlFor='nome'>Nome:</label>
              <input
                type='text'
                placeholder='Nome do Professor'
                name='nome'
                value={formEditProfessor.nome}
                onChange={handleChange}
              />
            </div>
            <div className='forms'>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                placeholder='Email do Professor'
                name='email'
                value={formEditProfessor.email}
                onChange={handleChange}
              />
            </div>
            <div className='forms'>
              <label htmlFor='novaSenha'>Nova senha:</label>
              <input
                type='password'
                placeholder='Senha do Professor'
                name='novaSenha'
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div className='forms'>
              <label htmlFor='confirmarSenha'>Confirmar senha:</label>
              <input
                type='password'
                placeholder='Confirme a senha'
                name='senha'
                value={formEditProfessor.senha || ''}
                onChange={handleChange}
              />
            </div>
            <div className='ativo'>
              <input
                type='checkbox'
                name='ativo'
                checked={!!formEditProfessor.ativo}
                onChange={handleChange}
              />
              <label htmlFor='ativo'>Ativo</label>
            </div>
            <button type='submit'>Salvar</button>
          </form>

          <div className='atribuicoes-professor'>
            <h3>Atribuições</h3>
            {turmasProfessor.length > 0 ? (
              turmasProfessor.map((atribuicao) => (
                <div key={atribuicao.id}>
                  <div>
                    <IoBookOutline />
                    <p>
                      {atribuicao.disciplina?.nome} - {atribuicao.turma?.serie}
                    </p>
                  </div>
                  <FaTrashAlt onClick={() => removerAtribuição(atribuicao.id)} />
                </div>
              ))
            ) : (
              <p>O professor não possui nenhuma atribuição</p>
            )}
          </div>

          <div className='atribuicoes-professor'>
            <h3>Atribuir professor a uma turma: </h3>
            <div className='selecao-professores'>
              <select
                name='selectTurma'
                id='selectTurma'
                value={selectTurma}
                onChange={(e) => setSelectTurma(e.target.value)}
              >
                <option value=''>Selecione uma turma</option>
                {allTurmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.serie} - {turma.ano} - {turma.periodo}
                  </option>
                ))}
              </select>
              <select
                name='selectDisciplina'
                id='selectdisciplina'
                value={selectMateria}
                onChange={(e) => setSelectMateria(e.target.value)}
              >
                <option value=''>Selecione uma disciplina</option>
                {allMaterias.map((materia) => (
                  <option key={materia.id} value={materia.id}>
                    {materia.nome} - {materia.ementa}
                  </option>
                ))}
              </select>
            </div>
            <div className='button-atribuir'>
              <button onClick={atribuir}>Atribuir</button>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
