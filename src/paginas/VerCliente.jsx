import { useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import Spinner from '../components/Spinner';

const VerCliente = () => {
    const { id } = useParams()

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
      const obtenerClientesAPI = async () => {
        try {
            const url = `http://localhost:4000/clientes/${id}`
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

     cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
        <div>
                <>
                    <h1 className='font-black text-4xl text-blue-700'>Ver Cliente: {cliente.nombre}</h1>
                    <p className='mt-3 text-2xl'>Información del cliente</p>
            
                    <p className='text-4xl text-gray-700 mt-10'>
                        <span className='text-gray-800 uppercase font-bold'>Cliente: </span>
                    {cliente.nombre}
                    </p>
                    <p className='text-2xl text-gray-700'>
                        <span className='text-gray-800 uppercase font-bold mt-4'>Email: </span>
                    {cliente.email}
                    </p>
                    {cliente.telefono && (
                        <p className='text-2xl text-gray-700'>
                            <span className='text-gray-800 uppercase font-bold mt-4'>TEL: </span>
                            {cliente.telefono}
                        </p>
                    )}
                    <p className='text-2xl text-gray-700'>
                        <span className='text-gray-800 uppercase font-bold mt-4'>Empresa: </span>
                        {cliente.empresa}
                    </p>
                    {cliente.notas && (
                        <p className='text-2xl text-gray-700'>
                            <span className='text-gray-800 uppercase font-bold mt-4'>Notas: </span>
                            {cliente.notas}
                        </p>
                    )}
                </>
        </div>
    )
  )
}

export default VerCliente