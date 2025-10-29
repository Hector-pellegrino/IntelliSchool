import './ButtonAtividades.css'
export default function ButtonAtividades({handleChange, text}) {
  return (
    <button className={`changeAtividades`} onClick={handleChange}>
      {text}
    </button>
  )
}
