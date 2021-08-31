import { Box, LinearProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { AppHeader } from '../../ui/Header'
import { Footer } from '../../ui/Footer'
import { HeroCard } from '../../ui/HeroCard'

const useStyles = makeStyles((theme) => ({
    content: {
        marginBottom: 48,
        display: 'flex',
        flexDirection: 'column',
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    right: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))

function Page() {
    const classes = useStyles()
    const pageMeta = {
        title: '',
        description: '',
        url: '/',
    }

    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            top={
                <HeroCard
                    data={{
                        title: pageMeta.title,
                        subtitle: pageMeta.description,
                    }}
                    actions={
                        <Box pt={2.4}>
                            <LinearProgress
                                style={{ minWidth: 140 }}
                                variant="indeterminate"
                            />
                        </Box>
                    }
                />
            }
            header={<AppHeader />}
            footer={<Footer />}
        />
    )
}

export default Page
