import './EditDisciplina.css'

import { useNavigate, useParams } from 'react-router-dom'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import { apiDelete, apiGet, apiPut } from '../../../api'
import Loading from '../../Loading'

export default function EditDisciplina() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [carregando, setCarregando] = useState(true)
  const [disciplina, setDisciplina] = useState({
    nome: '',
    ementa: '',
    carga_horaria: '',
  })

  async function deletardisciplina(e) {
    e.preventDefault()
    setCarregando(true)
    const data = await apiDelete(`/api/disciplinas/${id}`)
    if (data.message) {
      alert(data.message)
      setCarregando(false)
      navigateDisciplinas()
    } else {
      alert(
        'Ocorreu algum erro ao deletar a disciplina, verifique se ela não está presente em nenhuma turma'
      )
      setCarregando(false)
    }
  }
  async function salvar(e) {
    e.preventDefault()
    setCarregando(true)
    delete disciplina.created_at
    console.log(disciplina)
    apiPut(`/api/disciplinas/${id}`, { ...disciplina })
      .then((data) => {
        alert(data.message)
        setCarregando(false)
      })
      .catch((err) => console.log(err))
  }
  function handleChange(e) {
    const { name, value, type } = e.target
    setDisciplina((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }
  function navigateDisciplinas() {
    navigate(`/admin/disciplinas`)
  }
  useEffect(() => {
    apiGet(`/api/disciplinas/${id}`)
      .then((data) => {
        setDisciplina(data)
        setCarregando(false)
      })
      .catch((err) => console.log(err))
  }, [])
  return (
    <section className='section-edit-disciplina'>
      <button className='button-voltar' onClick={navigateDisciplinas}>
        <IoReturnUpBackOutline />
      </button>
      {carregando ? (
        <Loading />
      ) : (
        <form onSubmit={salvar} className='form-edit-disciplina'>
          <div className='form-div-edit-disciplina'>
            <label htmlFor=''>Nome: </label>
            <input
              type='text'
              placeholder='Nome da disciplina'
              name='nome'
              value={disciplina.nome}
              onChange={handleChange}
            />
          </div>

          <div className='form-div-edit-disciplina'>
            <label htmlFor=''>Ementa: </label>
            <input
              type='text'
              placeholder='Nome da disciplina'
              name='ementa'
              value={disciplina.ementa}
              onChange={handleChange}
            />
          </div>
          <div className='form-div-edit-disciplina'>
            <label htmlFor=''>Carga horária: </label>
            <input
              type='text'
              placeholder='Nome da disciplina'
              name='carga_horaria'
              value={disciplina.carga_horaria}
              onChange={handleChange}
            />
          </div>
          <div className='form-div-buttons-edit-disciplina'>
            <button onClick={deletardisciplina} className='button-apagar-disciplina'>
              Apagar disciplina
            </button>
            <button type='submit' className='button-salvar-edit-disciplina'>
              Salvar
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
