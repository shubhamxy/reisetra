import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles<any>((theme) => ({
    root: {
        width: '100%',
    },
    cover: {},
    img: {
        objectFit: 'cover',
    },
    content: {},
    contentText: {
        ...theme.typography.body2,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    subText: {
        ...theme.typography.caption,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
        opacity: 0.8,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))
