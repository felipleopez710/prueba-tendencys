import React, { useState, useEffect } from 'react'
import { orderApi } from './api/orderApi';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { OrdersTable } from './components/OrdersTable/OrdersTable';
import { NewOrderForm } from './components/NewOrderForm/NewOrderForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '1020px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const App = () => {

  const [orders, setOrders] = useState(null);
  const [createdOrders, setCreatedOrders] = useState(null)

  const [openForm, setOpenForm] = React.useState(false);
  const handleOpenForm = () => {
      setOpenForm(true);
  }
  const handleCloseForm = () => setOpenForm(false);

  useEffect(() => {
    
    let createdOrdersKey = localStorage.getItem('createdOrders');
    let lastIdKey = localStorage.getItem('lastOrderId')
    
    if(createdOrdersKey !== null){
      setCreatedOrders(JSON.parse(createdOrdersKey))
    }else{
      localStorage.setItem('createdOrders', '[]')
      setCreatedOrders([])
    }

    if(lastIdKey === null){
      localStorage.setItem('lastOrderId', '9000')
    }

    orderApi.get('/v2/orders')
    .then(resp => {
      setOrders(resp)
    })

  }, []);
  
  return (
    <Container maxWidth="md">
      <div className="mt-5 ">
        <div className='d-flex justify-content-between align-items-center'>
          <h1>Órdenes de compra</h1>
          <button className='btn btn-primary px-4' onClick={handleOpenForm}>Agregar Orden</button>
        </div>

        
        {orders !== null ? 
          <OrdersTable orders={orders.data.orders} createdOrders={createdOrders} />
          :
          <div className='mt-5 d-flex justify-content-center'>
            <CircularProgress />
          </div>
        }


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openForm}
          onClose={handleCloseForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
          }}
        >
          <Fade in={openForm}>
            <Box sx={style}>
              <NewOrderForm setOpenForm={setOpenForm} setCreatedOrders={setCreatedOrders} />
            </Box>
          </Fade>
        </Modal>
        
      </div>
    </Container>
  );
}

