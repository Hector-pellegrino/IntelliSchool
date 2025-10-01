import Input from '../components/form/Input'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useState, useContext, useEffect } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const { users, setCurrentUser, currentUser } = useContext(UserContext)
  const [login, setLogin] = useState({})

  function handleChange(evento) {
    setLogin({ ...login, [evento.target.name]: evento.target.value })
  }

  function buttonSubmit(evento) {
    evento.preventDefault()
    const foundUser = users.find((user) => user.email === login.email && user.senha === login.senha)
    if (foundUser) {
      const loggedUser = { ...foundUser, isLoggedIn: true }
      setCurrentUser(loggedUser)
      sessionStorage.setItem('user', JSON.stringify(loggedUser))
      navigate('/home')
    } else {
      alert('Email ou senha inválidos')
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
          <button id='buttonLogin'>Entrar</button>
        </form>
      </section>
    </section>
  )
}
