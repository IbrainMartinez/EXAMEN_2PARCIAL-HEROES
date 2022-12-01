import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebase';
import Swal from 'sweetalert2';
import '../index.css'
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

const Examen = () => {

  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [afiliacion, setafiliacion] = useState(null)
  const [descripcion, setdescripcion] = useState(null)
  const [archienemigo, setarchienemigo] = useState([])

  const [products, setProducts] = useState([])
  const [villanos, setVillanos] = useState([])
  const productsCollection = collection(db, "Heroes")
  const villanosCollection = collection(db, "heruesyvillanos")
  const navigate = useNavigate()

  const store = async (e) => {

    e.preventDefault()

    await addDoc(productsCollection, { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion, archienemigo: archienemigo })
    window.location.href = window.location.href;
    window.location.replace('');
  }

  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

    )
  }

  const getVillanos = async () => {
    const villanosData = await getDocs(villanosCollection)
    setVillanos(
      villanosData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Heroes", id)
    await deleteDoc(productDoc)
    getProducts()
  }

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Quieres eliminar este Registro?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'SI!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id)
        Swal.fire(
          'Eliminado!',
        )
      }
    })
  }

  useEffect(() => {
    getProducts()
    getVillanos()
  }, [])



  const cancerlar = async (edad) => {
    window.location.replace('');
  }



  return (
    <div class="container">
      <div class="row">

        <div class="col">
          <h1>Alta heroes</h1>

          <form onSubmit={store}>
            <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input
                value={nombrereal}
                onChange={(e) => setnombrereal(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Nombre de Heroe</label>
              <input
                value={nombredevillano}
                onChange={(e) => setnombredevillano(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input
                value={edad}
                onChange={(e) => setedad(e.target.value)}
                type="text"
                className='form-control'
                required
              />
            </div>
            {/* <div className='mb-3'>


              <label>Afiliacion</label>
              <select onChange={(e) => setafiliacion(e.target.value)} value={afiliacion} name='afiliacion' className='form-control' required>
                <option selected >Eliga afiliacion</option>
                <option value='Marvel'>Marvel</option>
                <option value='DC'>Dc</option>
              </select>
            </div> */}

            <div className='mb-3'>
              <label>Seleccione su sexo</label>
              <br />
              <label >Masculino</label>
              <input type="radio" value="Masculino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' />
              <br />
              <label >Femenino</label>
              <input type="radio" value="Femenino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' />
              <br />
              <label >No especificado</label>
              <input type="radio" value="NoEspecificado" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' />

            </div>

            <div className='mb-3'>
              <label>Seleccione su Origen</label>
              <br />
              <label >Humano</label>
              <input type="radio" value="Humano" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' />
              <br />
              <label >Extraterestre</label>
              <input type="radio" value="Extraterestre" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' />
              <br />
              <label >Experimento Cientifico</label>
              <input type="radio" value="ExperimentoCientifico" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' />
              <br />
              <label >Muntante</label>
              <input type="radio" value="Muntante" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' />

            </div>



            <div className='mb-3'>
              <label>Seleccione sus Caracteristicas</label>
              <br />
              <label >Volador</label>
              <input type="checkbox" value="Volador" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Velocidad</label>
              <input type="checkbox" value="Velocidad" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Fuerza</label>
              <input type="checkbox" value="Fuerza" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Mutante</label>
              <input type="checkbox" value="Mutante" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Visión</label>
              <input type="checkbox" value="Visión"onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Oído</label>
              <input type="checkbox" value="Oído" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Invulnerabilidad</label>
              <input type="checkbox" value="Invulnerabilidad" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' /> 
              <br />
              <label >Telepatia</label>
              <input type="checkbox" value="Telepatia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <br />
              <label >Telequinesis</label>
              <input type="checkbox" value="Telequinesis" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <br />
              <label >Lanza Rayos</label>
              <input type="checkbox" value="LanzaRayos" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <br />
              <label >Artes Marciales</label>
              <input type="checkbox" value="ArtesMarciales" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <br />
              <label >Inteligencia</label>
              <input type="checkbox" value="Inteligencia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />
              <br />
              <label >Acrobacia</label>
              <input type="checkbox" value="Acrobacia" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />  
              <br />
              <label >Armadura</label>
              <input type="checkbox" value="Armadura" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />    
              <br />
              <label >Tecnología</label>
              <input type="checkbox" value="Tecnología" onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' />    


            </div>


            <button type='submit' className='btn btn-success espacioBtn'>Enviar</button>
            <a  className='btn btn-danger espacioBtn' href="javascript:location.reload()">CANCELAR</a>
          </form>
        </div>
        <div class="col">
          <br /><br />
          <table className='table table-ligth disenioTabla'>
            <thead>
              <tr>
                <th>Nombre Real</th>
                <th>Nombre Heroe</th>
                <th>Edad</th>
                <th>Sexo</th>
                <th>Origen</th>
                <th>Caracteristicas</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody className='table-active'>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.nombrereal}</td>
                  <td>{product.nombredevillano}</td>
                  <td>{product.edad}</td>
                  <td>{product.afiliacion}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.archienemigo}</td>
                  <td><Link to={`/ExamenEdit/${product.id}`} className="btn btn-warning">Editar</Link></td>
                  <td>
                    <button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Eliminar</button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Examen