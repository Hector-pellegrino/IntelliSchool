import React, { useState, useRef, useEffect, useContext } from 'react'
import { UserContext } from '../context/UserContext' // ajuste o caminho se necessário
import { apiPost } from '../api' // ajuste o caminho para onde fica seu api.js
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import './ChatIA.css'

export default function ChatIA() {
  const { currentUser } = useContext(UserContext)
  const [messages, setMessages] = useState([]) // { id, role: 'user'|'bot', text }
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, sending])

  async function handleSend(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text) return

    if (!currentUser || !currentUser.id) {
      alert('Você precisa estar logado para usar o chat.')
      return
    }

    const userMsg = { id: Date.now() + '-u', role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSending(true)

    try {
      // Chama seu apiPost que já usa API_URL + Basic Auth etc
      // Endpoint '/chat' (fica API_URL + '/chat' conforme seu api.js)
      const data = await apiPost('/api/chat', {
        user_id: currentUser.id,
        message: text,
      })

      // Pode retornar string ou JSON { resposta: "..." }
      let resposta
      if (typeof data === 'string') {
        resposta = data
      } else if (data && typeof data === 'object') {
        // tenta vários campos comuns
        resposta = data.resposta ?? data.response ?? data.message ?? JSON.stringify(data)
      } else {
        resposta = 'Sem resposta do servidor.'
      }

      const botMsg = { id: Date.now() + '-b', role: 'bot', text: resposta }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error('Erro no chat:', err)
      const messageText = err?.message ?? 'Erro ao conectar com o servidor.'
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + '-err', role: 'bot', text: `Erro: ${messageText}` },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='chat-container'>
      <div className='chat-header'>Chat com Intelli-School</div>

      <div className='chat-list' ref={listRef}>
        {messages.map((mensagem) => (
          <div key={mensagem.id} className={`chat-item ${mensagem.role}`}>
            <div className='bubble'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{mensagem.text}</ReactMarkdown>
            </div>
          </div>
        ))}

        {sending && (
          <div className='chat-item bot'>
            <div className='bubble loading'>Gerando resposta...</div>
          </div>
        )}
      </div>

      <form className='chat-input-area' onSubmit={handleSend}>
        <input
          type='text'
          placeholder={currentUser ? 'Como posso ajudar voce hoje?' : 'Faça login para usar o chat'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={!currentUser || sending}
        />
        <button type='submit' disabled={!input.trim() || !currentUser || sending}>
          Enviar
        </button>
      </form>
    </div>
  )
}
