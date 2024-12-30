import { Verified } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { TShop } from '../../types/shop.type';

// Separate ShopCard component for better organization
interface ShopCardProps {
  shop: TShop;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop }) => {
  const totalRating = shop?.reviews?.reduce(
    (sum, item) => sum + item.rating,
    0
  );

  const reviewCount = shop?.reviews?.length || 0;
  const avgRating = reviewCount > 0 ? totalRating / reviewCount : 0;

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <Box className="relative">
        <CardMedia
          component="img"
          height="200"
          image={shop.shopCover}
          alt={shop.shopName}
          className="h-48 object-cover"
        />

        {shop.isActive === 'APPROVED' && (
          <Tooltip title="Verified Seller">
            <Chip
              icon={<Verified className="text-primary-500" />}
              label="Verified"
              size="small"
              className="absolute top-2 left-2 bg-white"
            />
          </Tooltip>
        )}
      </Box>
      <CardContent>
        <div className="flex items-center mb-3">
          <Avatar src={shop.vendor.profilePhoto} className="mr-2" />
          <div>
            <Link to={`/shop-details/${shop.id}`}>
              <Typography variant="h6" className="font-bold">
                {shop.shopName}
              </Typography>
            </Link>
            <Typography variant="body2" color="text.secondary">
              by {shop.vendor.name}
            </Typography>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <Rating value={avgRating} readOnly precision={0.5} size="small" />
          <Typography variant="body2" color="text.secondary" className="ml-2">
            ({shop.reviews?.length} reviews)
          </Typography>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-2">
          <Chip
            label={shop.category.name}
            size="small"
            className="bg-primary-50 text-primary-600"
          />
        </div>

        <div className="flex justify-between items-center mt-3">
          <Chip
            size="small"
            label={`${shop.products?.length}+ Products`}
            className="bg-gray-100"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
