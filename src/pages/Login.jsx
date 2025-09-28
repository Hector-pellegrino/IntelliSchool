import Input from '../components/form/Input'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { useState } from 'react'

export default function Login() {

  const navigate = useNavigate() 
  const { user, setUser } = useContext(UserContext)
  const [login, setLogin] = useState({})

  function handleChange(evento) {
    setLogin({...login, [evento.target.name]: evento.target.value})
  }

  function buttonSubmit(evento) {
    evento.preventDefault()

    if(user.email === login.email && user.senha === login.senha) {
      setUser({...user, isLoggedIn: true})
    }
    navigate('/home',)
  }

  return (
    <section id='body'>
      <h1>
        <span>Faça login, <br /></span>o conhecimento <br /> te espera
      </h1>
      <section>
        <form onSubmit={buttonSubmit}>
            <Input
            type= 'email'
            id='email'
            name='email'
            placeholder='Insira o seu e-mail '
            handleOnChange={handleChange}
            />
            <Input
            type= 'password'
            id='senha'
            name='senha'
            placeholder='Insira a sua senha '
            handleOnChange={handleChange}
            />
          <button>entrar</button>
        </form>
      </section>
    </section>
  )
}
