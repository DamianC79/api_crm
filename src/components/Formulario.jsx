import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alertas from './Alertas'
import Spinner from './Spinner'

const Formulario = ({cliente, cargando}) => {

    const navigate = useNavigate()

    const nuevosClienteSchema = Yup.object().shape({
        nombre:Yup.string()
                  .min(3,'El nombre es muy corto')
                  .max(30,'El nombre es muy largo')
                  .required('Este campo es obligatorio'),
        empresa:Yup.string()
                   .required('Este campo es obligatorio'),
        email:Yup.string()
                 .email('Debe ser un email válido')
                 .required('Este campo es obligatorio'),
        telefono:Yup.number()
                    .positive('Número no válido')
                    .integer('Numero no válido')
                    .typeError('Debe ser un número válido')
    })

    const handleSubmit = async ( valores ) => {
        try {
            let respuesta
            if(cliente.id){
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`

                respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else{
                const url = import.meta.env.VITE_API_URL

                respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }
            
                            await respuesta.json()
                            navigate('/clientes')
        } catch (error) {
            
        }
    }

  return (
      cargando ? <Spinner/> : (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:3/4 mx-auto'>
        <h1 className='text-gray-700 font-bold  text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>
    
        <Formik
            initialValues={{
                nombre:cliente?.nombre ?? "",
                empresa:cliente?.empresa ?? "",
                email:cliente?.email ?? "",
                telefono:cliente?.telefono ?? "",
                notas:cliente?.notas ?? ""
            }}

            enableReinitialize={true}

            onSubmit={ async (values, {resetForm}) => {
               await handleSubmit(values)

               resetForm()
            }}

            validationSchema={nuevosClienteSchema}
        >
            { ({errors, touched})=> {
                return (
                <Form>
                    <div className='mb-4'>
                        <label    
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre: </label>
                        <Field
                            id='nombre'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Nombre del Cliente'
                            name='nombre'
                        />

                        { errors.nombre && touched.nombre ? <Alertas>{errors.nombre}</Alertas> : null }

                    </div>
                    <div className='mb-4'>
                        <label    
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Empresa: </label>
                        <Field
                            id='empresa'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Empresa del Cliente'
                            name='empresa'
                        />
                    </div>
                    { errors.empresa && touched.empresa ? <Alertas>{errors.empresa}</Alertas> : null }
                    <div className='mb-4'>
                        <label    
                            className='text-gray-800'
                            htmlFor='email'
                        >E-mail: </label>
                        <Field
                            id='email'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='E-mail del Cliente'
                            name='email'
                        />
                    </div>
                    { errors.email && touched.email ? <Alertas>{errors.email}</Alertas> : null }
                    <div className='mb-4'>
                        <label    
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Teléfono del Cliente: </label>
                        <Field
                            id='telefono'
                            type='tel'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Número de contaco del Cliente'
                            name='telefono'
                        />
                    </div>
                    { errors.telefono && touched.telefono ? <Alertas>{errors.telefono}</Alertas> : null }
                    <div className='mb-4'>
                        <label    
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas del Cliente: </label>
                        <Field
                            as='textarea'
                            id='notas'
                            type='text'
                            className='mt-2 block w-full p-3 bg-gray-50'
                            placeholder='Notas del Cliente'
                            name='notas'
                        />
                    </div>
                    <input
                        type='submit'
                        value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                        className='mt-5 w-full bg-blue-700 p-3 text-white uppercase font-bold text-lg'
                    />
                </Form>
            )}}
        </Formik>
    </div>
      )
  )
}

Formulario.defaultProps = {
    cliente:{},
    cargando: false
}

export default Formulario