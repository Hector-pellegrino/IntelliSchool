import Input from '../components/form/Input'
import Loading from '../components/Loading'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useState, useContext } from 'react'
import { apiPost } from '../api'

export default function Login() {
  const navigate = useNavigate()
  const { setCurrentUser, setCurrentMessage } = useContext(UserContext)
  const [login, setLogin] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  function handleChange(evento) {
    setLogin({ ...login, [evento.target.name]: evento.target.value })
  }

  async function buttonSubmit(evento) {
    evento.preventDefault()
    setIsLoading(true)
    const data = await apiPost('/api/auth/login', login)
    if (data.message === 'Login realizado com sucesso') {
      setCurrentUser(data.user)
      setCurrentMessage(data.message)
      sessionStorage.setItem('user', JSON.stringify(data.user))
      sessionStorage.setItem('message', JSON.stringify(data.message)) 
      navigate('/home')
    } else {
      setIsLoading(false)
      alert(`${data.detail}`)
    }
  }

  return (
    <section id='body'>
      <h1>
        <span>
          Faça login, <br />
        </span>
        o conhecimento <br /> te espera
      </h1>
      <section>
        <form className='form-login' onSubmit={buttonSubmit}>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder='Insira o seu e-mail '
            label='email:'
            handleOnChange={handleChange}
          />
          <Input
            type='password'
            id='senha'
            name='senha'
            placeholder='Insira a sua senha '
            label='senha:'
            handleOnChange={handleChange}
          />
          {isLoading ? <Loading/> : <button id='buttonLogin'>Entrar</button>}
          
        </form>
      </section>
    </section>
  )
}
