import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../api'
import Loading from '../../Loading'

import { IoReturnUpBackOutline } from 'react-icons/io5'

export default function EditAluno() {
  const { id } = useParams()
  const navigate = useNavigate()

  function navigateAlunos() {
    navigate('/admin/alunos')
  }

  function matricularAluno() {
    if (selectTurma === '') {
      return alert('Selecione uma turma para matricular o aluno')
    }
    const dataMatricula = new Date()
    dataMatricula.toISOString().split('T')[0]
    apiPost(`/api/matriculas`, {
      aluno_id: id,
      turma_id: selectTurma,
      data_matricula: dataMatricula,
    })
      .then((data) => {
        alert(data.message)
      })
      .catch((err) => console.log(err))
  }

  const [novaSenha, setNovaSenha] = useState()
  async function salvar(e) {
    e.preventDefault()
    if (novaSenha !== formEditAluno.senha) {
      return alert('As senhas não coincidem')
    }
    if (novaSenha === '') {
      delete formEditAluno.senha
    }
    apiPut(`/api/usuarios/${id}`, { ...formEditAluno })
      .then((data) => {
        alert(data.message)
      })
      .catch((err) => console.log(err))
  }

  function removerAlunoTurma() {
    apiDelete(`/api/matriculas/${turmaAluno.id}`)
      .then((data) => {
        alert(data.message)
        setTurmaAluno([])
      })
      .catch((err) => console.log(err))
  }

  function handleChange(evento) {
    const value = evento.target.name === 'ativo' ? evento.target.checked : evento.target.value
    setFormEditAluno((prev) => ({ ...prev, [evento.target.name]: value }))
  }

  const [aluno, setAluno] = useState('Carregando...')
  const [formEditAluno, setFormEditAluno] = useState({})
  const [turmaAluno, setTurmaAluno] = useState([])
  const [allTurmas, setAllTurmas] = useState([])
  const [selectTurma, setSelectTurma] = useState()

  useEffect(() => {
    apiGet('/api/turmas')
      .then((data) => setAllTurmas(data))
      .catch((err) => console.log(err))
  })

  useEffect(() => {
    apiGet(`/api/matriculas/aluno/${id}`)
      .then((data) => setTurmaAluno(data[0] || []))
      .catch((err) => console.log(err))
  }, [turmaAluno])
  useEffect(() => {
    apiGet(`/api/usuarios/${id}`)
      .then((data) => setAluno(data))
      .catch((err) => console.log(err))
  }, [])
  return (
    <div>
      {aluno.nome ? (
        <section>
          <button className='button-voltar' onClick={navigateAlunos}>
            <IoReturnUpBackOutline />
          </button>
          <form onSubmit={salvar}>
            <div>
              <label htmlFor='nome'>Nome:</label>
              <input
                type='text'
                placeholder='Nome do Aluno'
                name='nome'
                defaultValue={aluno.nome}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                placeholder='Email do Aluno'
                name='email'
                defaultValue={aluno.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='novaSenha'>Nova senha:</label>
              <input
                type='password'
                placeholder='Senha do Aluno'
                name='novaSenha'
                onChange={(e) => setNovaSenha(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='confirmarSenha'>Confirmar senha:</label>
              <input
                type='password'
                placeholder='Confirme a senha'
                name='senha'
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='ativo'>Ativo:</label>
              <input
                type='checkbox'
                name='ativo'
                defaultChecked={aluno.ativo}
                onChange={handleChange}
              />
            </div>
            <button type='submit'>Salvar</button>
          </form>
          {turmaAluno.length === 0 ? (
            <>
              <h2>Matricular Aluno: </h2>{' '}
              <select
                name='selectTurma'
                id='selectTurma'
                onChange={(e) => setSelectTurma(e.target.value)}
              >
                <option value=''>Selecione uma turma</option>
                {allTurmas.map((turma) => (
                  <option key={turma.id} value={turma.id}>
                    {turma.serie} - {turma.ano} - {turma.periodo}
                  </option>
                ))}
              </select>
              <button onClick={matricularAluno}>Matricular</button>
            </>
          ) : (
            <div>
              <h3>Turma: </h3>
              <p>{turmaAluno.turma.serie}</p>
              <button onClick={removerAlunoTurma}>Remover Aluno da turma</button>
            </div>
          )}
        </section>
      ) : (
        <Loading />
      )}
    </div>
  )
}
