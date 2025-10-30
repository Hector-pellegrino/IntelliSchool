import './Search.css'
import { FaSearch } from 'react-icons/fa'

export default function Search({ type, name, placeholder, onChange, onSearch }) {
  return (
    <div className='grid-search'>
      <input type={type} name={name} placeholder={placeholder} onChange={onChange} />
      <label htmlFor={name} onClick={onSearch}>
        <FaSearch />
      </label>
    </div>
  )
}
