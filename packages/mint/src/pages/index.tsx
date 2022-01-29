import { Box, makeStyles, Paper, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { AppHeader } from '../ui/Header'
import { Footer } from '../ui/Footer'
import RecommendedCategories from '../ui/RecommendedCategories'
import Categories from '../modules/Categories'
import HeroCard from '../ui/HeroCard'
import { SectionCard } from '../ui/SectionCard'
import { ShowCase } from '../modules/ShowCase'
import { ProductsFeed } from '../ui/Feed/Feed'
import { Products } from '../modules/Products'
import { Catelogs } from '../modules/Catelogs'
import HelpDesk from '../ui/HelpDesk'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: 24,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
    },
    content: {
        display: 'flex',
        width: '100%',
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
    titleContainer: {
        padding: '32px 24px 24px 24px',
    },
}))

const IndexPage = () => {
    const classes = useStyles()
    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            top={
                <HeroCard
                    data={{
                        objectFit: 'contain',
                        title: 'Indian Handcrafts',
                        subtitle:
                            'Unique products designed by independent artists.',
                        backgroundImage: '/images/hero2.jpeg',
                    }}
                />
            }
            header={<AppHeader />}
            right={
                <Box style={{ minHeight: '400px' }} position="relative">
                    <RecommendedCategories />
                    <ProductsFeed />
                </Box>
            }
            footer={<Footer />}
        >
            <Paper className={classes.container}>
                <Grid container item xs={12} className={classes.content}>
                    <Grid item xs={12}>
                        <Box className={classes.titleContainer}>
                            <Typography variant="h5">
                                {'Recommended'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ShowCase filters={{ sort: 'bestselling', size: 3 }} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.content}>
                    <Box
                        pl={2.4}
                        pr={2.4}
                        pt={2.4}
                        pb={2.4}
                        position="relative"
                        width="100%"
                    >
                        <SectionCard />
                    </Box>
                </Grid>

                <Grid container item xs={12} className={classes.content}>
                    <Grid item xs={12}>
                        <Box className={classes.titleContainer}>
                            <Typography variant="h5">
                                {'New Arrivals'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Products filters={{ sort: 'new', size: 3 }} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.content}>
                    <Grid item xs={12}>
                        <Box className={classes.titleContainer}>
                            <Typography variant="h5">
                                {'Collections'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Catelogs filters={{}} />
                    </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.content}>
                    <Grid item xs={12}>
                        <Box className={classes.titleContainer}>
                            <Typography variant="h5">
                                {'Recommended Categories'}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Categories filters={{}} />
                    </Grid>
                </Grid>
                <HelpDesk />
            </Paper>
        </MainLayout>
    )
}

export default IndexPage
