import './Atividades.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../../context/UserContext'
import ButtonAtividades from './ButtonAtividades'
import LiAtividades from './LiAtividades'
import { apiGet } from '../../../api'

function Atividades() {
  const { currentUser } = useContext(UserContext)
  const [atividades, setAtividades] = useState([])
  const [viewAtividades, setViewAtividades] = useState([...atividades])
  useEffect(() => {
    async function fetchAtividades() {
      try {
        const data = await apiGet(`/api/submissoes/aluno/${currentUser.id}`)
        const dataFiltrado = await data.filter((data) => data.visivel === true)
        setAtividades(dataFiltrado)
        setViewAtividades(dataFiltrado)
      } catch (error) {}
    }
    fetchAtividades()
  }, [])

  function changeToPendentes() {
    setViewAtividades(atividades.filter((atividade) => atividade.enviada === false))
  }
  function changeToCompletas() {
    setViewAtividades(atividades.filter((atividade) => atividade.enviada === true))
  }
  function changeToTodas() {
    setViewAtividades([...atividades])
  }

  return (
    <div className='atividades-page'>
      <h2>📚 Minhas Atividades</h2>
      <div className='buttonsAtividades'>
        <ButtonAtividades handleChange={changeToTodas} text='Todas' />
        <ButtonAtividades handleChange={changeToPendentes} text='Pendentes' />
        <ButtonAtividades handleChange={changeToCompletas} text='Entregues' />
      </div>

      <ul className='atividades-lista'>
        <LiAtividades atividades={viewAtividades} />
      </ul>
    </div>
  )
}

export default Atividades
