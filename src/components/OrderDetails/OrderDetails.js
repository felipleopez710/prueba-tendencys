import React from 'react';
import './OrderDetails.css'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#282828',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

export const OrderDetails = ({activeOrder}) => {
  return (
      <div className='details-container'>
            {activeOrder !== null ?
                <>
                    <h2 className='mb-4'>Orden #{activeOrder.number}</h2>
                    <h6 className='mb-4'>Productos adquiridos:</h6>
                    <TableContainer component={Paper} sx={{ minWidth: 500 }}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>Nombre del producto</StyledTableCell>
                                    <StyledTableCell align="center">SKU</StyledTableCell>
                                    <StyledTableCell align="center">Cantidad</StyledTableCell>
                                    <StyledTableCell align="right">Precio</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeOrder.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row" align='center'>
                                            {item.name}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {item.sku !== null ?
                                                item.sku
                                                :
                                                "No definido"
                                            }
                                        </TableCell>
                                        <TableCell align='center'>
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {`$${item.price}`}
                                        </TableCell>
                                    </TableRow>
                                ))}   
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div className='d-flex justify-content-end px-3 mt-4'>
                        <div className='total'>Subtotal</div>
                        <div className='quantity'>${activeOrder.totals.subtotal}</div>
                    </div>
                    <div className='d-flex justify-content-end px-3 mt-2'>
                        <div className='total'>Impuestos</div>
                        <div className='quantity'>${activeOrder.totals.tax}</div>
                    </div>
                    <div className='d-flex justify-content-end px-3 mt-2'>
                        <div className='total'>Total</div>
                        <div className='quantity'>${activeOrder.totals.total}</div>
                    </div>
                </>
                :
                <div>Loading...</div>
            }
            
      </div>
  );
};
