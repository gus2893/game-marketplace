import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@mui/material';
import { ItemPreview } from '../ItemPreview';
import { IItem } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

type CardListProps = {
  isSuccess: boolean;
  items: IItem[];
};

export const CardList: React.FC<CardListProps> = ({ isSuccess, items }) => {
  const [now, setNow] = useState<number>(Date.now());

  const navigation = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (id: string | undefined) => {
    navigation(`/items/${id}`);
  };

  const renderItems = () =>
    isSuccess &&
    items?.map((item) => (
      <Grid item xs={2} sm={4} md={4} key={`item-${item.item_id}-${item.name}`}>
        <ItemPreview item={item} now={now} onClick={navigate} />
      </Grid>
    ));

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {renderItems()}
      </Grid>
    </Container>
  );
};
