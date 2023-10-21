import { makeStyles, Theme } from '@material-ui/core'

export const useStyles = makeStyles<
    Theme,
    { hasHeader: boolean; hasFooter: boolean }
>((theme) => ({
    wrapper: ({ hasHeader, hasFooter }) => ({
        '@supports (backdrop-filter: none)': {
            ...(hasHeader && hasFooter
                ? {
                    // backgroundImage: `linear-gradient(to right, #000000 0%, #ffffff 33%, #ffffff 66%, #000000), linear-gradient(to right, #000000 0%, #ffffff 33%, #ffffff 66%, #000000)`,
                      backgroundPosition: 'top, bottom',
                      backgroundSize: '100% 1px, 100% 1px',
                      backgroundRepeat: 'no-repeat',
                  }
                : {}),
        },
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        background: theme.palette.background.default,
        minHeight: '100vh',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }),
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 24,
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            padding: 12,
        },
    },
    top: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 8,
        paddingBottom: 24,
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 24,
    },
    // middle part
    content: {},
    bottom: {
        display: 'flex',
        flexDirection: 'column',
    },
    left: {
        position: 'sticky',
        height: '100%',
        top: 64,
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexWrap: 'wrap',
        padding: 16,
        [theme.breakpoints.down('sm')]: {
            padding: 8,
        },
    },
    right: {
        position: 'sticky',
        height: '100%',
        top: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingTop: 24,
        paddingLeft: 24,
        [theme.breakpoints.down('md')]: {
            flexBasis: '33%',
            maxWidth: '33%',
        },
    },
}))
