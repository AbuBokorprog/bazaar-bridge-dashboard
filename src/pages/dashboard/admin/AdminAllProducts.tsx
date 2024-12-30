import {
  Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  Grid,
  InputAdornment,
  // Menu,
  // MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  // FaEdit,
  // FaEye,
  FaPlusCircle,
  FaSearch,
  FaStore,
  // FaTrash,
} from 'react-icons/fa';
import { useGetAllProductsQuery } from '../../../redux/features/api/products/products.api';
// import { Product } from '../../../types/product.type';
import DashboardProductCard from '../../../components/ui/dashboard/DashboardProductCard';
import Loader from '../../../components/ui/Loader';
import Title from '../../../components/helmet/Title';

const AdminAllProducts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading } = useGetAllProductsQuery({});

  const filteredProducts = data?.data?.data?.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
      <Title title="All Products" content="This is all products page." />
      {isLoading && <Loader />}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold">
              All Products ({data?.data?.length})
            </h2>
            <FaStore className="text-2xl text-primary-500" />
          </div>
          <div className="flex gap-4">
            <TextField
              size="small"
              placeholder="Search products..."
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
        </div>

        {/* all products */}
        <Grid container spacing={4}>
          {filteredProducts?.map((product: any) => (
            <Grid item sm={6} md={4} lg={3} key={product.id}>
              <DashboardProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No products found
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FaPlusCircle />}
              href="/dashboard/vendor/add-product"
              className="mt-4"
            >
              Add Your First Product
            </Button>
          </div>
        )}

        {/* Product Actions Menu */}
        {/* <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditProduct}>
            <FaEdit className="mr-2" /> Edit Product
          </MenuItem>
          <MenuItem onClick={() => console.log('View product details')}>
            <FaEye className="mr-2" /> View Details
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} className="text-red-500">
            <FaTrash className="mr-2" /> Delete Product
          </MenuItem>
        </Menu> */}

        {/* Delete Confirmation Dialog */}
        {/* <Dialog
          open={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedProduct?.name}? This
              action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDeleteConfirm} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog> */}
      </div>
    </div>
  );
};

export default AdminAllProducts;
