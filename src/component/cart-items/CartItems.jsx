



import { Box } from '@mui/material'
import React from 'react'
import CartItem from '../cart-item/CartItem'

export default function CartItems({items}) {
  return (
   <Box sx={{display: 'flex', gap: 2, flexDirection: 'column'}}>
      {items && Array.isArray(items) && items.map(item => (
         <CartItem item={item} key={item?.id}/>
      ))}
   </Box>
  )
}
