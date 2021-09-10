import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'visible',
            display: 'flex',
            borderRadius: 4,
            alignItems: 'center',
            boxShadow: '0 1px 4px 0 rgb(0 0 0 / 10%)',
            background: '#d8dbdf',
            transition:
                'background 1s cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
        content: {
            width: '100%',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                maxWidth: 400,
            },
            height: '500px',
            zIndex: 10,
            padding: 0,
            paddingBottom: '0 !important',
        },
        titleContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 60,
            paddingRight: 60,
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 25%, rgba(0, 0, 0, 0) 100%)'
        },
        title: {
            width: '100%',
            ...theme.typography.h3,
            fontSize: 22,
            textAlign: 'left',
            opacity: 0.6
        },
        subtitle: {
            width: '100%',
            ...theme.typography.caption,
            fontSize: 14,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'left',
            opacity: 0.6
        },
        description: {
            marginLeft: 10,
            width: '100%',
            ...theme.typography.body1,
            textAlign: 'left',
            opacity: 0.4
        },
        actionsContainer: {
            width: '100%',
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            // background: "#0f0f0f4f",
            // backdropFilter: "blur(2px)",
            zIndex: 4,
            top: 0,
            bottom: 0,
            position: 'absolute',
        },
        image: {
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
        illustration1: {
            maxWidth: 200,
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
        illustration2: {
            maxWidth: 200,
            zIndex: 1,
            transition: 'all ease-in 2s',
        },
        seeAll: {
            padding: '24px',
            paddingTop: '8px',
            paddingBottom: '8px',
            background: '#0f0f0f33',
            backdropFilter: 'blur(2px)',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'all ease-in 0.2s',
            '&:disabled': {
                opacity: 0.4,
            },
            '&:focus': {
                background: '#0f0f0f33',
                boxShadow: `0px 0px 0px 2px #665df533`,
            },
            '&:hover': {
                boxShadow: `0px 0px 0px 2px #665df533`,
                backgroundColor: 'unset',
            },
        },
        categoriesContainer: {
            position: 'absolute',
            top: '68%',
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
    })
)
