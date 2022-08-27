/* import/no-named-as-default */

import {
  Box,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  Grid,
} from '@mui/material';

import { currencyFormatter } from '../../../utils';

const PrintProducts = ({ products }) => (
  <div>
    <Box>
      <Typography>Products</Typography>
      <Divider />

      {
          products.map((product) => (
            <div key={product.id}>
              <Grid item xs={12}>
                <Box sx={{ paddingLeft: 1, paddingTop: 5 }}>
                  <Typography variant="body1" sx={{ paddingTop: 1, paddingBottom: 1 }}>
                    Distributor:
                    {' '}
                    <strong>{`${product.distributor.firstName} ${product.distributor.lastName} - (${product.distributor.phone})`}</strong>
                  </Typography>
                  <Divider />
                </Box>
              </Grid>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Image
                    </TableCell>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Quantity
                    </TableCell>
                    <TableCell>
                      Price
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {
                  product.productList.map((item) => (
                    <TableRow
                      hover
                      key={item.id}
                    >
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          alt="produt image"
                          src={item.productImage}
                        />
                      </TableCell>
                      <TableCell>
                        {item.productName}
                        {' '}
                        { item.hasDiscount && <Chip label="Has discount" size="small" variant="outlined" />}
                      </TableCell>
                      <TableCell>
                        {item.quantity}
                      </TableCell>
                      <TableCell>
                        {currencyFormatter(item.amount)}
                      </TableCell>

                    </TableRow>
                  ))
                  }

                </TableBody>
              </Table>
            </div>

          ))
        }
    </Box>
  </div>
);

export default PrintProducts;
