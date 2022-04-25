import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { IItem } from '../../interfaces';
import { timeDiffCalc } from '../../utils';
import { useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/reducers/userSlice';

type ItemCardProps = {
  item: IItem;
  now: number;
  onClick: (id: string) => void;
};
export const ItemPreview: React.FC<ItemCardProps> = ({
  item,
  now,
  onClick,
}) => {
  const { name, description, price, sale, item_id, owner } = item;
  const [time, setTime] = useState<string>('');
  const user = useAppSelector(selectUser);
  const date = Number(sale);

  const imgSrc = `https://picsum.photos/200/140?random=${Math.floor(
    Math.random() * 500,
  )}`;
  useEffect(() => {
    setTime(timeDiffCalc(date, now));
  }, [now, date]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: user?.id === owner ? 'aliceblue' : '',
      }}
    >
      <CardActionArea onClick={() => item_id && onClick(item_id)}>
        <CardMedia
          component="img"
          height="140"
          image={imgSrc}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-around' }}>
          <Typography variant="body2">${price}</Typography>
          <Typography variant="body2">{time}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
