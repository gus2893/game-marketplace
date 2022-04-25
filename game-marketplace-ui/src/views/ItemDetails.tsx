import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Grid, Container, Button } from '@mui/material';
import {
  useLazyGetItemByIdQuery,
  useTransferItemMutation,
  useEditItemMutation,
} from '../redux/api/apiSlice';
import { ItemDescription } from '../Components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectUser, updateUser } from '../redux/reducers/userSlice';
import { IItemTransfer } from '../interfaces';

export const ItemDetails = () => {
  const { itemId } = useParams();
  const user = useAppSelector(selectUser);
  const [getItem, { isSuccess, isError, data }] = useLazyGetItemByIdQuery();
  const [transferItem, transferResults] = useTransferItemMutation();
  const [editItem, editItemResults] = useEditItemMutation();
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (itemId) getItem(itemId);
  }, [itemId, getItem]);

  useEffect(() => {
    if (transferResults.isSuccess && transferResults.data.user) {
      console.log(transferResults.data);
      dispatch(updateUser(transferResults.data.user));
      navigation('/');
    }
    if (editItemResults.isSuccess) navigation('/');
  }, [transferResults, editItemResults, dispatch, navigation]);

  const buyItem = () => {
    if (user && data) {
      const itemToTransfer: IItemTransfer = { id: user.id, body: data };

      transferItem(itemToTransfer);
    }
  };

  const removeListing = () => {
    if (user && data) {
      editItem({ ...data, sale: '0', price: 0 });
    }
  };

  if (!itemId || isError)
    return (
      <Typography variant="h2" align="center">
        Item not found
      </Typography>
    );

  const renderButtons = () =>
    user && user.id === data?.owner ? (
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={removeListing}
      >
        Remove
      </Button>
    ) : (
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={buyItem}
      >
        Buy
      </Button>
    );

  return (
    <Grid container justifyContent="center">
      {isSuccess && data && <ItemDescription item={data} />}
      <Container sx={{ textAlign: 'center', marginTop: 10 }}>
        {renderButtons()}
      </Container>
    </Grid>
  );
};
