import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { AppHeader } from '../../ui/Header'
import { Support } from '../../modules/Support'
import { makeStyles } from '@material-ui/core'
import { Footer } from '../../ui/Footer'
import { config } from '../../libs'
import HeroCard from '../../ui/HeroCard'

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

const SupportPage = () => {
    const classes = useStyles()
    const t = {
        title: 'Support',
        description: 'Submit your query and we will get back at you.',
        url: `${config.clientUrl}/404`,
        backgroundImage: '',
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
                        title: t.title,
                        subtitle: t.description,
                        backgroundImage: t.backgroundImage,
                    }}
                />
            }
            header={<AppHeader />}
            footer={<Footer />}
        >
            <Support />
        </MainLayout>
    )
}

export default SupportPage
