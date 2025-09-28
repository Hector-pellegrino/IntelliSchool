import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

export default function Home() {
  const { user } = useContext(UserContext)
  return <div>email: {user.email}</div>
}
