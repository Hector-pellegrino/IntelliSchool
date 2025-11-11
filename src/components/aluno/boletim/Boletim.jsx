import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../../context/UserContext'
import { apiGet } from '../../../api'
import './Boletim.css'

export default function Boletim() {
  const { currentUser } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(true)
  const [boletim, setBoletim] = useState()
  useEffect(() => {
    async function fetchBoletim() {
      setIsLoading(true)
      try {
        const data = await apiGet(`/api/boletim/${currentUser.id}`)
        setBoletim(data)
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }
    fetchBoletim()
  }, [])
  const handleGerarPDF = async () => {
    setIsLoading(true)
    try {
      const blob = await apiGet(`/api/boletim/pdf/${currentUser.id}`, { responseType: 'blob' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `boletim_${boletim?.nome_aluno || currentUser.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      let msg = JSON.parse(error?.message)
      alert(msg.detail)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      {isLoading ? (
        <p>Carregando boletim...</p>
      ) : (
        <>
          <button className='buttonGerarBoletim' onClick={handleGerarPDF}>
            Clique aqui para fazer o download do Boletim
          </button>
        </>
      )}
    </div>
  )
}
