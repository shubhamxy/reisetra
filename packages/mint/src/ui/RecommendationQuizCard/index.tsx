import * as React from 'react'
import { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    createStyles,
    makeStyles,
    Typography,
    Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
            background: 'linear-gradient(0deg, #F0F0F0, #F0F0F0), #0B0C0C',
            backgroundImage: `url("/images/profile-completion-card.svg"),linear-gradient(0deg, #F0F0F0, #F0F0F0)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'right top',
            boxShadow: ' 2px 2px 7px rgba(15, 15, 15, 0.15)',
            borderRadius: 8,
            height: 155,
        },
        content: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2, 3),
            '&:last-child': {
                paddingBottom: 16,
            },
        },
        description: {
            maxWidth: 341,
            marginTop: 8,
            color: '#7F7F80',
            lineHeight: '16px',
        },
        actionsContainer: {},
    })
)
export default React.memo(function HeroCard({}) {
    const classes = useStyles()
    const [showModal, setShowModal] = useState(false)
    const [activeQuizIndex, setActiveQuizIndex] = useState(0)
    const quizStep = () => {
        setActiveQuizIndex(activeQuizIndex + 1)
    }

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography variant={'h5'}>
                    Get better recommendations
                </Typography>
                <Typography
                    className={classes.description}
                    variant={'subtitle2'}
                >
                    Answer a few questions and we’ll help you find the products
                    which best suits your preferences
                </Typography>
                <Box display={'flex'} mt={'auto'}>
                    <Button
                        onClick={() => setShowModal(true)}
                        color={'primary'}
                        variant={'contained'}
                    >
                        <Typography variant={'subtitle2'}>
                            Begin quiz
                        </Typography>
                    </Button>{' '}
                    <Button
                        onClick={() => {}}
                        style={{ marginLeft: 30 }}
                        variant={'text'}
                    >
                        <Typography variant={'subtitle2'}>Dismiss</Typography>
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
})
