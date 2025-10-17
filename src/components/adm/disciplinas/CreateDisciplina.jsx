import { IoReturnUpBackOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiPost } from '../../../api'
import Loading from '../../Loading'
import './CreateDisciplina.css'

export default function CreateDisciplina({}) {
  const navigate = useNavigate()
  function navigateDisciplinas() {
    navigate(`/admin/disciplinas`)
  }
  const [carregando, setCarregando] = useState(false)
  const [disciplinaCreation, setDisciplinaCreation] = useState({
    nome: '',
    carga_horaria: 0,
    ementa: '',
  })

  function handleChange(evento) {
    setDisciplinaCreation((prev) => ({ ...prev, [evento.target.name]: evento.target.value }))
  }

  async function criarDisciplina(e) {
    e.preventDefault()
    if (
      disciplinaCreation.nome === '' ||
      disciplinaCreation.ementa === '' ||
      disciplinaCreation.carga_horaria === 0
    ) {
      alert('Por favor preencha todos os campos para a criação da disciplina')
      return
    }
    setCarregando(true)
    await apiPost(`/api/disciplinas`, disciplinaCreation)
      .then((data) => {
        alert(data.message)
      })
      .catch((err) => console.log(err))
    setCarregando(false)
    navigateDisciplinas()
  }
  return (
    <section className='section-create-disciplina'>
      <button className='button-voltar' onClick={navigateDisciplinas}>
        <IoReturnUpBackOutline />
      </button>
      <form onSubmit={criarDisciplina} className='form-create-disciplina'>
        <div className='form-div-create-disciplina'>
          <label htmlFor=''>Nome:</label>
          <input
            type='text'
            placeholder='Insira o nome da disciplina'
            name='nome'
            onChange={handleChange}
          />
        </div>
        <div className='form-div-create-disciplina'>
          <label htmlFor=''>Ementa:</label>
          <input
            type='text'
            placeholder='Insira a descrição da disciplina'
            name='ementa'
            onChange={handleChange}
          />
        </div>
        <div className='form-div-create-disciplina'>
          <label htmlFor=''>Carga Horaria:</label>
          <input
            type='number'
            placeholder='Insira a carga horária da disciplina'
            name='carga_horaria'
            onChange={handleChange}
          />
        </div>
        {carregando ? (
          <Loading />
        ) : (
          <button type='submit' className='button-create-disciplina'>
            Criar
          </button>
        )}
      </form>
    </section>
  )
}
