/* eslint-disable react/no-unescaped-entities */
import { Box, Container, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../layouts'
import { AppHeader, HeroCard } from '../ui'
import { Footer } from '../ui/Footer'
import { Markdown } from '../modules'
import { ShippingMd } from '../content'
import { config } from '../libs'

const t = {
    title: 'Shipping',
    subtitle: config.company,
    backgroundImage: '',
}

const useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        background: theme.palette.background.default,
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

const ShippingPage = () => {
    const classes = useStyles()
    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            containerProps={{}}
            top={
                <HeroCard
                    data={{
                        title: t.title,
                        subtitle: t.subtitle,
                        backgroundImage: t.backgroundImage,
                    }}
                />
            }
            header={<AppHeader />}
            footer={<Footer />}
        >
            <Paper className={classes.content} variant="outlined">
                <Container>
                    <Box pt={3.2} pb={3.2}>
                        <Markdown>{ShippingMd}</Markdown>
                    </Box>
                </Container>
            </Paper>
        </MainLayout>
    )
}

export default ShippingPage
