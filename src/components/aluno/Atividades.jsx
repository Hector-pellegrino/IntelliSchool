import './Atividades.css'
import { useState } from 'react'
import ButtonAtividades from './ButtonAtividades'
import LiAtividades from './LiAtividades'

function Atividades() {
  const [atividades, setAtividades] = useState([
    {
      id: 1,
      titulo: 'Matemática',
      descricao: 'Quanto é 7x7?.',
      status: 'Pendente',
      aberto: false,
      resposta: '',
    },
    {
      id: 2,
      titulo: 'Português',
      descricao: "O que é uma onimatopeia?'.",
      status: 'Pendente',
      aberto: false,
      resposta: '',
    },
    {
      id: 3,
      titulo: 'Ciências',
      descricao: 'O que é fotossíntese?.',
      status: 'Pendente',
      aberto: false,
      resposta: '',
    },
  ])
  const [viewAtividades, setViewAtividades] = useState([...atividades])
  
  // Alternar abrir/fechar atividade
  const toggleAtividade = (id) => {
    setAtividades(atividades.map((atv) => (atv.id === id ? { ...atv, aberto: !atv.aberto } : atv)))
    setViewAtividades(
      viewAtividades.map((atv) => (atv.id === id ? { ...atv, aberto: !atv.aberto } : atv))
    )
  }

  // Atualizar resposta escrita
  const atualizarResposta = (id, valor) => {
    setAtividades(atividades.map((atv) => (atv.id === id ? { ...atv, resposta: valor } : atv)))
    setViewAtividades(viewAtividades.map((atv) => (atv.id === id ? { ...atv, resposta: valor } : atv)))
  }

  // Entregar atividade
  const entregarAtividade = (id) => {
    setAtividades(
      atividades.map((atv) =>
        atv.id === id && atv.resposta.trim() !== '' ? { ...atv, status: 'Em Análise' } : atv
      )
    )
    setViewAtividades(
      viewAtividades.map((atv) =>
        atv.id === id && atv.resposta.trim() !== '' ? { ...atv, status: 'Em Análise' } : atv
      )
    )
  }

  // Validar entrega
  const validarEntrega = (id) => {
    setAtividades(
      atividades.map((atv) =>
        atv.id === id && atv.status === 'Em Análise' ? { ...atv, status: 'Entregue' } : atv
      )
    )
    setViewAtividades(
      viewAtividades.map((atv) =>
        atv.id === id && atv.status === 'Em Análise' ? { ...atv, status: 'Entregue' } : atv
      )
    )
  }

  function changeToPendentes() {
    setViewAtividades(atividades.filter((atividade) => atividade.status === 'Pendente'))
  }
  function changeToCompletas() {
    setViewAtividades(atividades.filter((atividade) => atividade.status === 'Entregue'))
  }
  function changeToAnalise() {
    setViewAtividades(atividades.filter((atividade) => atividade.status === 'Em Análise'))
  }
  function changeToTodas() {
    setViewAtividades([...atividades])
  }

  return (
    <div className='atividades-page'>
      <h2>📚 Minhas Atividades</h2>
      <div className='buttonsAtividades'>
        <ButtonAtividades handleChange={changeToTodas} text='Todas'/>
        <ButtonAtividades handleChange={changeToPendentes} text='Pendentes'/>
        <ButtonAtividades handleChange={changeToAnalise} text='Em análise'/>
        <ButtonAtividades handleChange={changeToCompletas} text='Entregues'/>
      </div>

      <ul className='atividades-lista'>
        <LiAtividades atividades={viewAtividades} toogleAtv={toggleAtividade} atualizarResposta={atualizarResposta} entregarAtividade={entregarAtividade} validarEntrega={validarEntrega}/>
      </ul>
    </div>
  )
}

export default Atividades
