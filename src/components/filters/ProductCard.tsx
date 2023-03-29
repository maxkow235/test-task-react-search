import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Rating,
  Box,
} from '@mui/material';
import { Product } from '../product/models';

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card style={{ width: '100%' }} raised>
      <CardMedia
        sx={{ height: 140 }}
        image={product.picture}
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h4' component='div'>
          {product.name}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant='h5' color='text.primary'>
          {product.price} $
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Color:{product.color}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            backgroundColor: product.color,
            border: 1,
            borderColor: 'black.500',
            borderRadius: '50%',
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
