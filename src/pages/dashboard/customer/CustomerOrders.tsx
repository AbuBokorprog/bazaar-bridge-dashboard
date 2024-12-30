import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  TextField,
  InputAdornment,
  TablePagination,
} from '@mui/material';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useGetAllMyOrdersQuery } from '../../../redux/features/api/orders/orders.api';
import { TOrder, TProductOrder } from '../../../types/order.type';
import Loader from '../../../components/ui/Loader';
import { Link } from 'react-router-dom';
import Title from '../../../components/helmet/Title';

const CustomerOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useGetAllMyOrdersQuery({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const orderStatusColors = {
    PENDING: 'warning',
    PROCESSING: 'info',
    SHIPPED: 'primary',
    DELIVERED: 'success',
    CANCELLED: 'error',
  } as const;

  const paymentStatusColors = {
    PAID: 'success',
    UNPAID: 'error',
    FAILED: 'warning',
    REFUNDED: 'primary',
  } as const;

  const getStatusColor = (status: keyof typeof orderStatusColors) => {
    return orderStatusColors[status] || 'default';
  };

  const getPaymentStatusColor = (status: keyof typeof paymentStatusColors) => {
    return paymentStatusColors[status];
  };

  const filteredOrders = data?.data?.filter(
    (order: TOrder) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="All Orders" content="This is all orders page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">My Orders</h2>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FaSearch className="text-gray-400" />
                </InputAdornment>
              ),
            }}
            className="w-64"
          />
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }} className="shadow-md">
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell className="font-semibold">Order ID</TableCell>
                  <TableCell className="font-semibold">Date</TableCell>
                  <TableCell className="font-semibold">Items</TableCell>
                  <TableCell className="font-semibold">Total</TableCell>
                  <TableCell className="font-semibold">Status</TableCell>
                  <TableCell className="font-semibold">
                    Payment Status
                  </TableCell>
                  <TableCell className="font-semibold">Payment Type</TableCell>
                  <TableCell className="font-semibold">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders?.map((order: TOrder) => (
                  <TableRow
                    key={order?.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell>{order?.id}</TableCell>
                    <TableCell>
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.products.map(
                          (item: TProductOrder, index: number) => (
                            <div key={index} className="text-sm">
                              {item.quantity}x {item?.product?.name}
                            </div>
                          )
                        )}
                      </div>
                    </TableCell>
                    <TableCell>${order?.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip
                        label={order?.status}
                        color={getStatusColor(order?.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {order?.payment?.status ? (
                        <Chip
                          label={order?.payment?.status}
                          color={getPaymentStatusColor(order?.payment?.status)}
                          size="small"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {order.paymentType ? (
                        <span className="text-sm">{order?.paymentType}</span>
                      ) : (
                        <span className="text-sm text-gray-400">N/A</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/dashboard/my-orders/${order.id}`}>
                        <Button
                          startIcon={<FaEye />}
                          variant="outlined"
                          size="small"
                        >
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredOrders?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        {filteredOrders?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No orders found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
