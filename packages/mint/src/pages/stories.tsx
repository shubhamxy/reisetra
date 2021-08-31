import { makeStyles } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../layouts'
import { AppHeader, GridList, HeroCard } from '../ui'
import { Footer } from '../ui/Footer'
import { config, useStories } from '../libs'
import { useRouter } from 'next/router'
import { StoriesGridItem } from '../modules'

const useStyles = makeStyles((theme) => ({
    content: {
        padding: 24,
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

const StoriesPage = () => {
    const pageMeta = {
        title: 'Stories',
        description: '',
        url: `${config.clientUrl}/stories`,
    }
    const classes = useStyles()
    const router = useRouter()
    const query = useStories(router.query, true)

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
                        backgroundImage: '/images/hero.jpeg',
                    }}
                />
            }
            header={<AppHeader />}
            footer={<Footer />}
        >
            <GridList
                query={query}
                renderItem={({ item, index }) => (
                    <StoriesGridItem
                        {...item}
                        showDescription
                        onClick={() => {
                            router.push(`/story/${item.slug}`)
                        }}
                        key={item.id}
                        styleIndex={index}
                    />
                )}
            />
        </MainLayout>
    )
}

export default StoriesPage
