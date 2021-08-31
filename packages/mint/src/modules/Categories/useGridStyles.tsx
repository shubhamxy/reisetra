import { makeStyles, Theme } from '@material-ui/core/styles'

export const useGridStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        width: '100%',
        height: '100%',
        rowGap: 8,
        columnGap: 8,
        overflow: 'hidden',
        padding: theme.spacing(2.2, 2.2, 2.2, 2.2),
        gridTemplateColumns: 'repeat(3, 1fr)',
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr',
            alignItems: 'center',
        },
    },
}))
type TStyles = {
    background: string
    color: string
}[]
export const colors: TStyles = [
    {
        background: '#0f0f0f',
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
    root: ({ styles, colorIndex }) => ({
        display: 'flex',
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '30px 16px 30px 16px',
        cursor: 'pointer',
        height: 372,
        maxWidth: 320,
        mixBlendMode: 'normal',
        color: styles && styles[0] ? styles[0] : colors[colorIndex].color,
        background:
            styles && styles[1] ? styles[1] : colors[colorIndex].background,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '0 auto',
        },
        borderRadius: 4,
        border: `1px solid ${theme.palette.text.primary}33`,
        '&:hover': {
            transition:
                'background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            boxShadow: '0px 4px 12px rgba(15, 15, 15, 0.2)',
        },
    }),
    card: {
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        marginTop: 24,
        background: '#0f0f0f10',
        backdropFilter: 'blur(4px)',
        borderRadius: '6px',
        padding: '14px',
        paddingTop: '2px',
        paddingBottom: '2px',
    },
    title: {
        ...theme.typography.caption,
        display: '-webkit-box',
        overflow: 'hidden',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
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
    group: {},
    illustration: {},
    titleContainer: {
        padding: '14px',
        paddingTop: '2px',
        paddingBottom: '2px',
        background: '#0f0f0f10',
        backdropFilter: 'blur(4px)',
        borderRadius: '6px',
    },
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
        transition: 'all ease-in 2s',
    },
}))
