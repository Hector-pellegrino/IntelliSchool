import { Link } from 'react-router-dom'
import './LiSideBar.css'
export default function LiSideBar({ url, text, icon }) {
  return (
    <li className='liSideBar'>
      <Link to={url}><span>{icon}</span>{text}</Link>
    </li>
  )
}
