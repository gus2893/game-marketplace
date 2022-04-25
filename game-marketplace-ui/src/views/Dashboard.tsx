import React, { useEffect } from 'react';
import { useGetItemByUserIdQuery } from '../redux/api/apiSlice';
import { useAppSelector } from '../redux/hooks';
import { CardList } from '../Components';
import { selectUser } from '../redux/reducers/userSlice';
import { Typography, Container } from '@mui/material';

export const Dashboard = () => {
  const user = useAppSelector(selectUser);
  const {
    data: items,
    isSuccess,
    refetch,
  } = useGetItemByUserIdQuery(user?.id || '');

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  return (
    <Container sx={{ textAlign: 'center' }}>
      <Typography variant="h2"> Your Items</Typography>
      {items && isSuccess && <CardList isSuccess={isSuccess} items={items} />}
    </Container>
  );
};
