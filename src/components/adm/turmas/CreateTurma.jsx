import './CreateTurma.css'
import { IoBookOutline, IoReturnUpBackOutline } from 'react-icons/io5'
import { MdCreateNewFolder } from 'react-icons/md'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { apiPost } from '../../../api'

export default function CreateTurma({ onUpdate }) {
  const navigate = useNavigate()

  const [turmaCreation, setTurmaCreation] = useState({
    ano: '',
    serie: '',
    periodo: '',
  })

  function handleChange(evento) {
    setTurmaCreation((prev) => ({ ...prev, [evento.target.name]: evento.target.value }))
  }

  function navigateTurmas() {
    navigate('/admin/turmas')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (turmaCreation.ano === '' || turmaCreation.serie === '' || turmaCreation.periodo === '') {
      return alert('Por favor, preencha todos os campos')
    }
    await apiPost('/api/turmas', {
      ano: turmaCreation.ano,
      serie: turmaCreation.serie,
      periodo: turmaCreation.periodo,
    }).then((data) => {
      onUpdate(data.data[0])
    })
    navigate('/admin/turmas')
  }

  return (
    <section className='section-create-turma'>
      <button className='button-voltar' onClick={navigateTurmas}>
        <IoReturnUpBackOutline />
      </button>
      <form onSubmit={handleSubmit} className='form-create-turma'>
        <div className='form-div-label-input'>
          <label className='label-edit-turma' htmlFor={'ano'}>
            Ano:
          </label>
          <input
            className='input-edit-turma'
            type='number'
            placeholder='Ano de criação'
            id={'ano'}
            onChange={handleChange}
            name={'ano'}
          />
        </div>
        <div className='form-div-label-input'>
          <label className='label-edit-turma' htmlFor={'serie'}>
            Série:
          </label>
          <input
            className='input-edit-turma'
            type='text'
            placeholder='Série da turma'
            id={'serie'}
            onChange={handleChange}
            name={'serie'}
          />
        </div>
        <div className='form-div-label-input'>
          <label className='label-edit-turma' htmlFor={'periodo'}>
            Período:
          </label>
          <input
            className='input-edit-turma'
            type='text'
            placeholder='Período da turma'
            id={'periodo'}
            onChange={handleChange}
            name={'periodo'}
          />
        </div>
        <button type='submit' className='button-create-turma'>
          <MdCreateNewFolder />
        </button>
      </form>
    </section>
  )
}
