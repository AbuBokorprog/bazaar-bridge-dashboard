import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { FaStore } from 'react-icons/fa';
import { useGetAllCouponsQuery } from '../../../redux/features/api/coupon/coupon.api';
import CouponCard from '../../../components/ui/dashboard/CouponCard';
import { TCoupon } from '../../../types/coupon.type';
import Loader from '../../../components/ui/Loader';
import Title from '../../../components/helmet/Title';

const AdminAllCoupon: React.FC = () => {
  const { data, isLoading } = useGetAllCouponsQuery({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="All Coupon" content="This is all coupon page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Coupon ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
        </div>

        <Grid container spacing={3}>
          {data?.data?.map((coupon: TCoupon, index: number) => (
            <Grid item sm={6} md={4} lg={3} key={index}>
              <CouponCard coupon={coupon} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default AdminAllCoupon;
