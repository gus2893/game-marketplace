import React, { useEffect } from 'react';
import { useGetItemsQuery } from '../redux/api/apiSlice';
import { CardList } from '../Components';
import { Container, Typography } from '@mui/material';

export const Items = () => {
  const { data: items, isSuccess, refetch } = useGetItemsQuery();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h2"> Items For Sale</Typography>
      {items && isSuccess && <CardList isSuccess={isSuccess} items={items} />}
    </Container>
  );
};
