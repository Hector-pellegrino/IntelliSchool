import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiDelete, apiGet, apiPost, apiPut } from '../../../api'
import Loading from '../../Loading'
import './EditAluno.css'

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
        <section className='section-edit-aluno'>
          <button className='button-voltar' onClick={navigateAlunos}>
            <IoReturnUpBackOutline />
          </button>
          <section className='conteiner-edit-aluno'>
            <form onSubmit={salvar} className='form-edit-aluno'>
              <h2 className='h2-edit'>Editar Aluno</h2>
              <div className='forms'>
                <label htmlFor='nome'>Nome:</label>
                <input
                  type='text'
                  placeholder='Nome do Aluno'
                  name='nome'
                  defaultValue={aluno.nome}
                  onChange={handleChange}
                />
              </div>
              <div className='forms'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  placeholder='Email do Aluno'
                  name='email'
                  defaultValue={aluno.email}
                  onChange={handleChange}
                />
              </div>
              <div className='forms'>
                <label htmlFor='novaSenha'>Nova senha:</label>
                <input
                  type='password'
                  placeholder='Senha do Aluno'
                  name='novaSenha'
                  onChange={(e) => setNovaSenha(e.target.value)}
                />
              </div>
              <div className='forms'>
                <label htmlFor='confirmarSenha'>Confirmar senha:</label>
                <input
                  type='password'
                  placeholder='Confirme a senha'
                  name='senha'
                  onChange={handleChange}
                />
              </div>
              <div className='ativo'>
                <input
                  type='checkbox'
                  name='ativo'
                  defaultChecked={aluno.ativo}
                  onChange={handleChange}
                />
                <label htmlFor='ativo'>Ativo</label>
              </div>
              <button type='submit'>Salvar</button>
            </form>
            {turmaAluno.length === 0 ? (
              <div className='matricula'>
                <h3>Matricular Aluno: </h3>{' '}
                <div>
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
                  <button className='button-matricular' onClick={matricularAluno}>
                    Matricular
                  </button>
                </div>
              </div>
            ) : (
              <div className='matricula'>
                <h3>Turma: </h3>
                <div>
                  <p>{turmaAluno.turma.serie}</p>
                  <button className='button-remover' onClick={removerAlunoTurma}>
                    Remover Aluno da turma
                  </button>
                </div>
              </div>
            )}
          </section>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  )
}
