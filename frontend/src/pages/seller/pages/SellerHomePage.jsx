import { Grid } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { getSpecificProducts } from "../../../redux/userHandle";

import { useDispatch, useSelector } from 'react-redux';
import SalesCard from '../components/SalesCard';
import SalesChart from '../components/SalesChart';

const SellerHomePage = () => {
  const dispatch = useDispatch();
  const { currentUser, specificProductData } = useSelector(state => state.user);

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getSpecificProducts(currentUser._id, "getAddedToCartProducts"));
    }
  }, [dispatch, currentUser?._id]);

  // Calculate total quantity from cart products
  const totalCartQuantity = useMemo(() => {
    if (!Array.isArray(specificProductData)) return 0;
    
    return specificProductData.reduce((total, product) => {
      return total + (parseInt(product.quantity) || 0);
    }, 0);
  }, [specificProductData]);


  // const productsRows = useMemo(() => {
  //   if (!Array.isArray(specificProductData) || specificProductData.length === 0) {
  //     return [];
  //   }

  //   return specificProductData.map((product) => ({
  //     name: product.productName,
  //     quantity: product.quantity,
  //     category: product.category,
  //     subcategory: product.subcategory,
  //     id: product.productName,
  //     productID: product.productID,
  //   }));
  // }, [specificProductData]);

  return (
    <Grid container spacing={3} sx={{ padding: "9px" }}>
      <Grid item xs={12} sm={6} md={3}>
        <SalesCard 
          title="Added to Cart" 
          total={totalCartQuantity} 
          color="success" 
          icon={'ant-design:shopping-cart-outlined'} 
        />
      </Grid>

      {/* <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Weekly Sales" total={71} color='primary' icon={'ant-design:carry-out-filled'} />
      </Grid> */}


      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Ongoing Orders" total={17} color="warning" icon={'material-symbols:data-exploration'} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <SalesCard title="Cancelled Orders" total={13} color="error" icon={'material-symbols:free-cancellation-rounded'} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="line" />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesChart type="bar" />
      </Grid>
    </Grid>
  );
};

export default SellerHomePage;
