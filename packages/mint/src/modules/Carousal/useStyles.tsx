import { makeStyles, Theme } from '@material-ui/core/styles'

type TStyles = {
    background: string
    color: string
}[]

export const colors: TStyles = [
    {
        background: '#0f0f0c',
        color: '#ffffff',
    },
    {
        background: '#906039',
        color: '#ffffff',
    },
    {
        background: '#d3b7a1',
        color: '#ffffff',
    },
    {
        background: '#d88ea3',
        color: '#ffffff',
    },
    {
        background: '#286dc1',
        color: '#ffffff',
    },
    {
        background: '#74D125',
        color: '#ffffff',
    },
]
export const useGridItemStyles = makeStyles<Theme, any>((theme) => ({
    root: ({ colorIndex, styles }) => ({
        display: 'flex',
        flex: 1,
        position: 'relative',
        height: 180,
        mixBlendMode: 'normal',
        color: styles && styles[0] ? styles[0] : colors[colorIndex].color,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0 auto',
        },
        borderRadius: 4,
        border: `1px solid ${theme.palette.text.primary}33`,
        background:
            styles && styles[1] ? styles[1] : colors[colorIndex].background,
        transition: 'all ease-in 0.4s',
        '&:hover': {
            boxShadow: '0px 4px 12px rgba(15, 15, 15, 0.7)',
        },
    }),
    selected: {
        boxShadow: '0px 4px 12px rgba(15, 15, 15, 0.7)',
    },
    content: {
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '30px 16px 30px 16px',
        cursor: 'pointer',
        width: '100%',
        height: '100%',
        background:
            'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 35%, rgba(0, 0, 0, 0) 100%)',
        zIndex: 10,
    },
    titleContainer: {
        padding: '12px',
        paddingTop: '6px',
        paddingBottom: '2px',
        background: '#0f0f0f03',
        backdropFilter: 'blur(8px)',
        borderRadius: '4px',
        width: 'auto',
    },
    title: {
        ...theme.typography.caption,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
        opacity: 0.6,
        textTransform: 'uppercase',
    },
    card: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 24,
        background: '#0f0f0f10',
        backdropFilter: 'blur(2px)',
        borderRadius: '6px',
        padding: '14px',
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    descriptionContainer: {},
    description: {
        ...theme.typography.body2,
        fontSize: '18px',
        lineHeight: '32px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    banner: {},
    cover: {},
    group: {},
    seeAll: {
        position: 'absolute',
        bottom: '24px',
        left: '16px',
        padding: '14px',
        paddingTop: '2px',
        paddingBottom: '2px',
        background: '#0f0f0f10',
        backdropFilter: 'blur(4px)',
        borderRadius: '6px',
    },
    image: {
        transition: 'all ease-in 0.4s',
    },
}))
