import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './index.css'
import { Outlet, Link } from "react-router-dom";

function nav() {
  return (<div>
    <Navbar className="backgroud" bg="ligth" expand="lg">
  
          <Link className="text-dark text-decoration-none espacio" to='/'>Inicio</Link>    
          <Link className="text-dark text-decoration-none espacio" to='Examen'>SuperHeroes</Link>
      

      {/* <Navbar.Brand className="text-light " href="./index_villano.js" >
          <Link className="text-light text-decoration-none " to='Show'>Villanos</Link>
     </Navbar.Brand> */}

      
     
  </Navbar>
  <Outlet />
 </div> );
}

export default nav;

