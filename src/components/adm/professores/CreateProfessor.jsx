import { IoReturnUpBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiPost } from '../../../api'

export default function CreateProfessor() {
  const navigate = useNavigate()
  function navigateProfessor() {
    navigate('/admin/professores')
  }

  const [professorCreation, setProfessorCreation] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'professor',
    ativo: false,
  })
  function handleChange(evento) {
    const value = evento.target.name === 'ativo' ? evento.target.checked : evento.target.value
    setProfessorCreation((prev) => ({ ...prev, [evento.target.name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (professorCreation.nome === '' || professorCreation.email === '' || professorCreation.senha === '') {
      return alert('Por favor, preencha todos os campos')
    }
    await apiPost('/api/usuarios', { ...professorCreation })
      .then((data) => {
        alert(data.message)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    navigateProfessor()
  }
  return (
    <section>
      <button className='button-voltar' onClick={navigateProfessor}>
        <IoReturnUpBackOutline />
      </button>
      <form>
        <div>
          <label htmlFor=''>Nome:</label>
          <input
            type='text'
            placeholder='Nome do professor'
            name='nome'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>Email:</label>
          <input
            type='email'
            placeholder='Email do professor'
            name='email'
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor=''>Senha:</label>
          <input
            type='password'
            placeholder='Senha do professor'
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
          Criar Professor
        </button>
      </form>
    </section>
  )
}