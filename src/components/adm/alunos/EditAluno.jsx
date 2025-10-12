import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet } from '../../../api'
import Loading from '../../Loading'

export default function EditAluno() {
  const { id } = useParams()
  const [aluno, setAluno] = useState('Carreganado...')

  useEffect(() => {
    apiGet(`/api/usuarios/${id}`)
      .then((data) => setAluno(data))
      .catch((err) => console.log(err))
  }, [])
  return <div>{aluno.nome ? aluno.nome : (<Loading/>)}</div>
}
