import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, Container } from '@mui/material';
import { IItem } from '../../interfaces';
import { timeDiffCalc } from '../../utils';

type ItemDescriptionProps = {
  item: IItem;
};

export const ItemDescription: React.FC<ItemDescriptionProps> = ({ item }) => {
  const { name, description, price, sale, owner } = item;

  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container sx={{ marginTop: 5 }}>
      <Paper elevation={3} sx={{ padding: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} sx={{ textAlign: 'center' }}>
            <img
              src={`https://picsum.photos/500/200?random=${Math.floor(
                Math.random() * 5000,
              )}`}
              alt="random image"
              loading="lazy"
            />
          </Grid>
          <Grid item xs={6} md={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h3">{name}</Typography>
            <Typography variant="body1">by user #{owner}</Typography>
          </Grid>
          <Grid item xs={3} md={12}>
            <Typography variant="body2" paragraph>
              {description || 'No Description'}
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography>Price ${price}</Typography>
          </Grid>
          <Grid item xs={6} md={8}>
            <Typography>{timeDiffCalc(Number(sale), now)} remaining</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
