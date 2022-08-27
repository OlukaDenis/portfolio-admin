import moment from 'moment';
import {
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../../store/actions/products.action';
import LoadingProgress from '../LoadingProgress';

const LatestProducts = (...props) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.productReducer);
  const { products, loadingProducts } = productState;

  useEffect(() => {
    dispatch(getProducts(true));
  }, [dispatch]);

  return (
    <Card {...props} sx={{ minHeight: 200 }}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Latest Products"
      />
      <Divider />

      { loadingProducts && <LoadingProgress />}
      { products.length > 0
      && (
      <List>
        {products.reverse().map((product, i) => (
          <ListItem
            divider={i < products.length - 1}
            key={product.id}
          >
            <ListItemAvatar>
              <img
                alt={product.itemName}
                src={product.logo}
                style={{
                  height: 48,
                  width: 48,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={product.itemName}
              secondary={`Updated ${moment(product.updatedAt).fromNow()}`}
            />
            {/* <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton> */}
          </ListItem>
        ))}
      </List>
      )}
      <Divider />
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box> */}
    </Card>
  );
};

export default LatestProducts;
