import './Input.css'

export default function Input({ type, placeholder, id, handleOnChange, name }) {
  return (
    <div>
      <label  htmlFor={name}>{name}:</label>
      <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange} />
    </div>
  )
}
