import { createStyles, makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            boxShadow: '0 1px 4px 0 rgb(0 0 0 / 10%)',
            background: '#d8dbdf',
        },
        content: {
            display: 'flex',
            textAlign: 'left',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            [theme.breakpoints.down('sm')]: {
                maxWidth: 400,
            },
            height: 320,
            zIndex: 10,
        },
        title: {
            width: '100%',
            color: '#303336',
            ...theme.typography.h3,
            fontSize: 22,
            textAlign: 'left',
        },
        subtitle: {
            width: '100%',
            color: '#535b62',
            ...theme.typography.caption,
            fontSize: 14,
            textAlign: 'left',
        },
        description: {
            width: '100%',
            color: '#535b62',
            ...theme.typography.body1,
            textAlign: 'center',
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
    })
)
