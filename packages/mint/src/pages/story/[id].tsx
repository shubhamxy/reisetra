import { makeStyles } from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../../layouts'
import { AppHeader } from '../../ui'
import { Footer } from '../../ui/Footer'
import { Story } from '../../modules'

import { useRouter } from 'next/router'
import { useStory } from '../../libs'

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

const StoryPage = () => {
    const classes = useStyles()
    const router = useRouter()
    const { id } = router.query
    const { data } = useStory(id as string)
    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
            header={<AppHeader />}
            footer={<Footer />}
        >
            <Story data={data?.data} />
        </MainLayout>
    )
}

export default StoryPage
