import { makeStyles, Theme } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core'
import { styles } from './index'

export const useGridItemStyles = makeStyles<Theme, { styleIndex: number }>(
    (theme) => ({
        root: ({ styleIndex }) => ({
            display: 'flex',
            flex: 1,
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'flex-start',
            cursor: 'pointer',
            height: 400,
            mixBlendMode: 'normal',
            borderRadius: 8,
            boxShadow: '0px 4px 12px rgba(15, 15, 15, 0.10)',
            color: alpha(styles[styleIndex].color, 0.8),
            background: styles[styleIndex].background,
        }),
        card: {
            margin: 0,
            padding: '30px 30px 19px 24px',
            width: '100%',
            height: '100%',
        },

        title: ({ styleIndex }) => ({
            ...theme.typography.subtitle2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-all',
        }),
        description: ({ styleIndex }) => ({
            ...theme.typography.caption,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            wordBreak: 'break-all',
        }),
        banner: {},
        cover: {},
        group: {},
        costContainer: {
            position: 'absolute',
            bottom: '24px',
            left: '24px',
        },
        addToCartContainer: {
            position: 'absolute',
            bottom: '24px',
            right: '24px',
        },
        button: {
            transition: 'opacity ease-in 0.2s',
        },
        cost: {},
        seeAllText: ({ styleIndex }) => ({
            ...theme.typography.body2,
            fontSize: '12px',
            lineHeight: '14px',
        }),
        imageContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
        },
        image: {
            backgroundColor: '#fff',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            backgroundSize: 'contain',
            height: 0,
            width: '100%',
            paddingTop: '56.25%',
            '&:hover': {
                transition:
                    'background-image 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    })
)
