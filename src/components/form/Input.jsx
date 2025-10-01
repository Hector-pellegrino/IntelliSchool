import './Input.css'

export default function Input({ type, placeholder, id, handleOnChange, name, label, defaultValue }) {
  return (
    <div className='input'>
      <label  htmlFor={name}>{label}</label>
      <input type={type} name={name} placeholder={placeholder} onChange={handleOnChange} defaultValue={ defaultValue ? defaultValue : null}/>
    </div>
  )
}
