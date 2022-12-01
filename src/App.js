import { BrowserRouter, Routes, Route } from "react-router-dom";


  // import Show from './Villanos/Show';
  // import Edit from './Villanos/Edit';

import Examen from './Heroes/Show';
import ExamenEdit from './Heroes/Edit';
import Nav from './nav.js';
import Home from  './Home';

function app() {
  return (<div>


   <BrowserRouter>
       
            <Nav />
  <br /><br />            
      <Routes>
        
            <Route path="/" element={< Home/>} />
           
            {/* <Route path="Show" element={<Show />} />
            <Route path='/edit/:id' element={ <Edit /> } /> */}


            <Route path="Examen" element={<Examen />} />
            <Route path='/ExamenEdit/:id' element={ <ExamenEdit /> } />

        
      </Routes>
    </BrowserRouter>
  </div>
   
 
  );
}

export default app;

