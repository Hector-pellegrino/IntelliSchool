import { IoReturnUpBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiPost } from '../../../api'

export default function CreateAluno() {
  const navigate = useNavigate()
  function navigateAlunos() {
    navigate('/admin/alunos')
  }

  const [alunoCreation, setAlunoCreation] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'aluno',
    ativo: false,
  })
  function handleChange(evento) {
    const value = evento.target.name === 'ativo' ? evento.target.checked : evento.target.value
    setAlunoCreation((prev) => ({ ...prev, [evento.target.name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (alunoCreation.nome === '' || alunoCreation.email === '' || alunoCreation.senha === '') {
      return alert('Por favor, preencha todos os campos')
    }
    await apiPost('/api/usuarios', { ...alunoCreation })
      .then((data) => {
        alert(data.message)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    navigateAlunos()
  }
  return (
    <section>
      <button className='button-voltar' onClick={navigateAlunos}>
        <IoReturnUpBackOutline />
      </button>
      <form>
        <div>
          <label htmlFor=''>Nome:</label>
          <input
            type='text'
            placeholder='Nome do aluno'
            name='nome'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>Email:</label>
          <input
            type='email'
            placeholder='Email do aluno'
            name='email'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>Senha:</label>
          <input
            type='password'
            placeholder='Senha do aluno'
            name='senha'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>Ativo:</label>
          <input type='checkbox' name='ativo' onChange={handleChange} />
        </div>
        <button type='submit' onClick={handleSubmit}>
          Criar Aluno
        </button>
      </form>
    </section>
  )
}