import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { formatDistance, subDays } from 'date-fns'
import { Rating } from '@material-ui/lab';
import { ImagePreview } from '../../ui/MediaPreview'
import { Box } from '@material-ui/core';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 320,
      alignSelf: 'flex-start',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

export default function ReviewCard({title, images, rating, description, createdAt, user}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar src={user?.avatar} aria-label="recipe" className={classes.avatar}>
            {(user?.name ? user?.name : 'A')[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={user?.name || ''}
        subheader={formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
      />
      <CardContent>
        <Rating value={rating || 5} readOnly />
        <Typography variant="body2" color="textSecondary" component="p">
          {title}
        </Typography>
        <Typography paragraph>{description}</Typography>
      </CardContent>
      <Box>
        <ImagePreview listTileCount={2} variant="list" objectFit="cover" cellWidth={"100px"} data={images} />
      </Box>
    </Card>
  );
}
