import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import { db } from "../Firebase/firebase"
import { getDoc, updateDoc, doc, deleteDoc, collection, getDocs } from "firebase/firestore"
import withReactContent from 'sweetalert2-react-content';
import '../index.css'
const MySwal = withReactContent(Swal)

const ExamenEdit = () => {

  const [nombrereal, setnombrereal] = useState('')
  const [nombredevillano, setnombredevillano] = useState('')
  const [edad, setedad] = useState('')
  const [afiliacion, setafiliacion] = useState(null)
  const [descripcion, setdescripcion] = useState(null)
  const [archienemigo, setarchienemigo] = useState(null)
  const [products, setProducts] = useState([])
  const productsCollection = collection(db, "Heroes")
  const villanosCollection = collection(db, "heruesyvillanos")
  const [villanos, setVillanos] = useState([])

  const navigate = useNavigate()
  const { id } = useParams()

  const getVillanos = async () => {
    const villanosData = await getDocs(villanosCollection)
    setVillanos(
      villanosData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "Heroes", id)
    const data = { nombrereal: nombrereal, nombredevillano: nombredevillano, edad: edad, afiliacion: afiliacion, descripcion: descripcion, archienemigo: archienemigo }
    await updateDoc(product, data)
    navigate('/Examen')
  }

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "Heroes", id))
    if (product.exists()) {


      setnombrereal(product.data().nombrereal)
      setnombredevillano(product.data().nombredevillano)
      setedad(product.data().edad)
      setafiliacion(product.data().afiliacion)
      setdescripcion(product.data().descripcion)
      setarchienemigo(product.data().archienemigo)

    } else {
      console.log('no existe')
    }
  }

  useEffect(() => {
    getProductById(id)
    getVillanos()

  }, [])
  


  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  }
  const deleteProduct = async (id) => {
    const productDoc = doc(db, "Heroes", id)
    await deleteDoc(productDoc)
    getProducts()
  }
  //5 - Funcion de confirmacion para Sweet Alert 2
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

  }, [])




  return (

    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Editar Heroes</h1>
          <form onSubmit={update}>
            <div className='mb-3'>
              <label className='form-label'>Nombre real</label>
              <input
                value={nombrereal}
                onChange={(e) => setnombrereal(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Nombre del villano</label>
              <input
                value={nombredevillano}
                onChange={(e) => setnombredevillano(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Edad</label>
              <input
                value={edad}
                onChange={(e) => setedad(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>

            <div className='mb-3'>
              <label>Seleccione su sexo</label>
              <br />
              <label >Masculino</label>
              <input type="radio" value="Masculino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' className="EspacioInput" />
              <br />
              <label >Femenino</label>
              <input type="radio" value="Femenino" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' className="EspacioInput" />
              <br />
              <label >No especificado</label>
              <input type="radio" value="NoEspecificado" onChange={(e) => setafiliacion(e.target.value)} name='afiliacion' className="EspacioInput" />

            </div>

            <div className='mb-3'>
              <label>Seleccione su Origen</label>
              <br />
              <label >Humano</label>
              <input type="radio" value="Humano" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Extraterestre</label>
              <input type="radio" value="Extraterestre" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Experimento Cientifico</label>
              <input type="radio" value="ExperimentoCientifico" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Muntante</label>
              <input type="radio" value="Muntante" onChange={(e) => setdescripcion(e.target.value)} name='descripcion' className="EspacioInput" />

            </div>


            <div className='mb-3'>
              <label>Seleccione sus Caracteristicas</label>
              <br />
              <label >Volador</label>
              <input type="checkbox" value='Volador' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion'className="EspacioInput" />
              <br />
              <label >Velocidad</label>
              <input type="checkbox" value='Velocidad' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Fuerza</label>
              <input type="checkbox" value='Fuerza' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Mutante</label>
              <input type="checkbox" value='Mutante' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Visión</label>
              <input type="checkbox" value='Visión' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Oído</label>
              <input type="checkbox" value='Oído' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Invulnerabilidad</label>
              <input type="checkbox" value='Invulnerabilidad' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Telepatia</label>
              <input type="checkbox" value='Telepatia' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Telequinesis</label>
              <input type="checkbox" value='Telequinesis' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Lanza Rayos</label>
              <input type="checkbox" value='LanzaRayos' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Artes Marciales</label>
              <input type="checkbox" value='ArtesMarciales' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Inteligencia</label>
              <input type="checkbox" value='Inteligencia' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Acrobacia</label>
              <input type="checkbox" value='Acrobacia' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Armadura</label>
              <input type="checkbox" value='Armadura' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />
              <br />
              <label >Tecnología</label>
              <input type="checkbox" value='Tecnología' onChange={(e) => setarchienemigo(e.target.value)} name='descripcion' className="EspacioInput" />


            </div>

            <br />
            <button type='submit' className='btn btn-success espacioBtn'>Actualizar</button>

            <br />
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
                  <td><button onClick={() => { confirmDelete(product.id) }} className="btn btn-danger">Eliminar</button></td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default ExamenEdit