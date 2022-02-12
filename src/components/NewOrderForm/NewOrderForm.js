import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import './NewOrderForm.css'

const testProducts = [
    {
        id: '8001',
        name: 'Producto de Prueba',
        sku: 'P0001',
        quantity: '1',
        price: '15.00'
    },
    {
        id: '8002',
        name: 'Producto falso',
        sku: 'P0002',
        quantity: '1',
        price: '15.00'
    },
    {
        id: '8003',
        name: 'Producto Imaginario',
        sku: 'P0003',
        quantity: '1',
        price: '15.00'
    },
    {
        id: '8004',
        name: 'Ptoducto hipotético',
        sku: 'P0004',
        quantity: '1',
        price: '15.00'
    },
]

export const NewOrderForm = ({setOpenForm, setCreatedOrders}) => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [products, setProducts] = useState([])
    const [orderAmout, setOrderAmout] = useState(0)
    const [lastOrderId, setLastOrderId] = useState(localStorage.getItem('lastOrderId'))

    const addProductToOrder = (product) => {
        if (!products.find(p => p.name === product.name)){
            setProducts([...products, product])
            setOrderAmout(orderAmout + parseInt(product.price))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const orderToBeAdded = {
            id: (parseInt(lastOrderId) + 1).toString(),
            number: (parseInt(lastOrderId) + 1).toString(),
            billingAddress: {
                firstName: name,
                lastName: lastName
            },
            items: products,
            totals: {
                subtotal: orderAmout.toString(),
                tax: '50.00',
                total: (orderAmout+50).toString(),
            },
            payment:{
                status: 'unpaid'
            },
        }

        localStorage.setItem('lastOrderId', (parseInt(lastOrderId) + 1).toString())
        const oldOrders = JSON.parse(localStorage.getItem('createdOrders'))

        const newOrderList = [orderToBeAdded, ...oldOrders]
        setCreatedOrders(newOrderList)
        console.log(newOrderList)

        
        localStorage.setItem('createdOrders', JSON.stringify(newOrderList))
        setOpenForm(false)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='form-title'>Añadir nueva orden</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='row mt-4'>
                    <div className='section-title'>Datos de quien ordena</div>
                </div>
                <div className='row'>
                    <div className='col-sm my-2'>
                        <TextField 
                            fullWidth 
                            id="buyer-name" 
                            name='buyer-name'
                            label="Nombre" 
                            variant="outlined" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='col-sm my-2'>
                        <TextField 
                            fullWidth 
                            id="buyer-lastName"
                            name='buyer-lastName' 
                            label="Apellido" 
                            variant="outlined" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='section-title'>Escoge tus productos</div>
                </div>
                
                <div className='row'>
                    {testProducts.map((product) => (
                        <div className='col-sm-6' key={product.id}>
                            <div 
                                className={products.find(p => p.name === product.name) ? 'product-box-active row px-2 py-2' : 'product-box row px-2 py-2'} 
                                onClick={() => addProductToOrder(product)}
                            >
                                <div className='col-10 p-1'>
                                    <h6 className='product-name'>{product.name}</h6>
                                    <div className='product-price'>${product.price}</div>
                                </div>
                                <div className='col-2 d-flex align-items-center justify-content-end'>
                                    <CheckCircleOutlineIcon 
                                        className={products.find(p => p.name === product.name) ? 'checkmark-active' : 'checkmark'}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <div className='d-flex justify-content-center my-4'>Total de orden: ${orderAmout}</div>
                </div>
                <div className='d-flex justify-content-end'>
                    <button type="submit" className='btn btn-primary'>Agregar Orden</button>
                </div>
            </form>
        </div>
  )
}
