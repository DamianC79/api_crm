import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Formulario from "../components/Formulario"

const EditarCliente = () => {
  const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
      const obtenerClientesAPI = async () => {
        try {
            const url = `${import.meta.env.VITE_API_URL}/${id}`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            setCliente(resultado)
        } catch (error) {
            console.log(error)
        }
        setCargando(!cargando)
      }
      obtenerClientesAPI()
    }, [])
    
  return (
    <div>
      <>
        <h1 className='font-black text-4xl text-blue-700'>Editar Cliente</h1>
        <p className='mt-3'>Edita los datos de tu cliente</p>

        {cliente?.nombre ? (
          <Formulario
            cliente={cliente}
            cargando={cargando}
          />
        ) : <p>Cliente ID no válido</p>}
      </>
    </div>
  )
}

export default EditarCliente