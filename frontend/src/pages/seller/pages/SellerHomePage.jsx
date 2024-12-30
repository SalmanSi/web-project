import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { getSpecificProducts } from "../../../redux/userHandle";

import { useDispatch, useSelector } from 'react-redux';
import SalesCard from '../components/SalesCard';

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const { 
    currentUser, 
    specificProductData: cartProducts,
    // orderedProducts 
  } = useSelector(state => state.user);

  const total_orders = cartProducts.length;


  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getSpecificProducts(currentUser._id, "getAddedToCartProducts"));
      dispatch(getSpecificProducts(currentUser._id, "getOrderedProductsBySeller"));
    }
  }, [dispatch, currentUser?._id]);

  // Calculate total quantity from cart products
  const totalCartQuantity = useMemo(() => {
    if (!Array.isArray(cartProducts)) return 0;
    
    return cartProducts.reduce((total, product) => {
      return total + (parseInt(product.quantity) || 0);
    }, 0);
  }, [cartProducts]);

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Total Products to ship" 
          total={totalCartQuantity} 
          color="success" 
          icon={'ant-design:shopping-cart-outlined'} 
        />
      </Grid>


      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Ongoing Orders" 
          total={total_orders}
          color="warning" 
          icon={'material-symbols:data-exploration'} 
        />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Cancelled Orders" total={0} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
