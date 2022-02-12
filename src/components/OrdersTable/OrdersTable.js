import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { OrderDetails } from '../OrderDetails/OrderDetails';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#282828',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

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

export const OrdersTable = ({orders, createdOrders}) => {

    const [activeOrder, setactiveOrder] = useState(null);

    const [openDetails, setOpenDetails] = React.useState(false);
    const handleOpenDetails = (order) => {
        setactiveOrder(order)
        setOpenDetails(true);
    }
    const handleCloseDetails = () => setOpenDetails(false);

    return (
        <div className='my-5 d-flex justify-content-center'>
            <TableContainer component={Paper} sx={{ minWidth: 500 }}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Número de Orden</StyledTableCell>
                            <StyledTableCell align="center">Ordenado por</StyledTableCell>
                            <StyledTableCell align="center">Monto Total</StyledTableCell>
                            <StyledTableCell align="center">Estado del Pago</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createdOrders.map((order) => (
                            <TableRow role="button" key={order.id} onClick={() => handleOpenDetails(order)}>
                                <TableCell component="th" scope="row" align='center'>
                                    #{order.number}
                                </TableCell>
                                <TableCell align='center'>
                                    {`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}
                                </TableCell>
                                <TableCell align='center'>
                                    ${order.totals.total}
                                </TableCell>
                                <TableCell align='center'>
                                    {order.payment.status === "paid" ?
                                        <Chip label="Pagado" color="success" variant="outlined" />
                                        :
                                        <Chip label="Pendiente" color="error" variant="outlined" />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                        {orders.map((order) => (
                            <TableRow role="button" key={order.id} onClick={() => handleOpenDetails(order)}>
                                <TableCell component="th" scope="row" align='center'>
                                    #{order.number}
                                </TableCell>
                                <TableCell align='center'>
                                    {`${order.billingAddress.firstName} ${order.billingAddress.lastName}`}
                                </TableCell>
                                <TableCell align='center'>
                                    {`$${order.totals.total}`}
                                </TableCell>
                                <TableCell align='center'>
                                    {order.payment.status === "paid" ?
                                        <Chip label="Pagado" color="success" variant="outlined" />
                                        :
                                        <Chip label="Pendiente" color="error" variant="outlined" />
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDetails}
                onClose={handleCloseDetails}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={openDetails}>
                    <Box sx={style}>
                        <OrderDetails activeOrder={activeOrder} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};
