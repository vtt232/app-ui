import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../styles/App.css';

export function Header () {
      return (
      <div className="page-header mb-3">
          <h1>This is header</h1>
          <NavLink className="link ms-3" style={({isActive})=>({color: isActive ? 'blue' : 'gray'})}  to="/home">Home Page</NavLink>
          <NavLink className="link ms-3" style={({isActive})=>({color: isActive ? 'blue' : 'gray'})}   to="/admin">Admin Page</NavLink>  
        </div>
      )
  }
