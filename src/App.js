import React, { useState, useEffect } from 'react'
import { orderApi } from './api/orderApi';
import CircularProgress from '@mui/material/CircularProgress';

import { OrdersTable } from './components/OrdersTable/OrdersTable';

export const App = () => {

  const [orders, setOrders] = useState(null);

  useEffect(() => {
    orderApi.get('/v2/orders')
    .then(resp => {
      //console.log(resp)
      setOrders(resp)
    })
  }, []);
  
  return (
    <div className="mt-5 ">
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Órdenes de compra</h1>
        <button className='btn btn-primary px-4'>Agregar Orden</button>
      </div>
      {orders !== null ? 
        <OrdersTable orders={orders.data.orders} />
        :
        <div className='mt-5 d-flex justify-content-center'>
          <CircularProgress />
        </div>
      }
      
    </div>
  );
}

