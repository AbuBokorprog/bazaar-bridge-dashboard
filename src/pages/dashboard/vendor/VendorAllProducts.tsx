import React, { useEffect, useState } from 'react';
import {
  Typography,
  Button,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FaSearch, FaPlusCircle, FaFilter } from 'react-icons/fa';
import { useGetAllProductsByVendorQuery } from '../../../redux/features/api/products/products.api';
import { Product } from '../../../types/product.type';
import DashboardProductCard from '../../../components/ui/dashboard/DashboardProductCard';
import Loader from '../../../components/ui/Loader';
import { useGetAllCategoriesQuery } from '../../../redux/features/api/categories/catgeories.api';
import Title from '../../../components/helmet/Title';

const VendorAllProducts: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockStatusFilter, setStatusFilter] = useState('all');
  const { data, isLoading } = useGetAllProductsByVendorQuery({});

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const filteredProducts = data?.data?.filter((product: any) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus =
      stockStatusFilter === 'all' || product.stockStatus === stockStatusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const { data: categories } = useGetAllCategoriesQuery({});
  const categoryOptions = categories?.data?.map((c: any) => ({
    label: c?.name,
    value: c?.id,
  }));

  return (
    <>
      <Title title="All Products" content="This is all products page." />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1 px-8 py-6 ml-0 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold">
                  All Products ({data?.data?.length})
                </h2>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<FaPlusCircle />}
                  href="/dashboard/vendor/add-product"
                >
                  Add New Product
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
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
              />
              <FormControl size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={handleCategoryChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FaFilter className="text-gray-400" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categoryOptions?.map((cat: any, index: number) => (
                    <MenuItem key={index} value={cat?.value?.toLowerCase()}>
                      {cat?.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={stockStatusFilter}
                  label="Status"
                  onChange={handleStatusChange}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="IN_STOCK">In Stock</MenuItem>
                  <MenuItem value="LOW_STOCK">Low Stock</MenuItem>
                  <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* all products */}
            <Grid container spacing={4}>
              {filteredProducts?.map((product: Product) => (
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
                <Typography color="textSecondary">
                  {searchTerm ||
                  categoryFilter !== 'all' ||
                  stockStatusFilter !== 'all'
                    ? 'Try adjusting your filters'
                    : "You haven't added any products yet"}
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
          </div>
        </div>
      )}
    </>
  );
};

export default VendorAllProducts;
