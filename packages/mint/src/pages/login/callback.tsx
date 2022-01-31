import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { login, useAuthDispatch, useRefreshAuth, config } from '../../libs'
import { Box, makeStyles, LinearProgress } from '@material-ui/core'
import { MainLayout } from '../../layouts/MainLayout'
import { AppHeader } from '../../ui/Header'
import { Footer } from '../../ui/Footer'
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

function Auth0CallbackPage() {
    const classes = useStyles()
    const fetchRefreshToken = useRefreshAuth()
    const { query } = useRouter()
    const dispatch = useAuthDispatch()
    const pageMeta = {
        title: '',
        description: '',
        url: `${config.clientUrl}/`,
    }

    async function refreshAuth(token: string) {
        try {
            const response = await fetchRefreshToken.mutateAsync({
                token,
            })

            dispatch(
                login({
                    access_token: response.data.access_token,
                    refresh_token: response.data.refresh_token,
                })
            )
        } catch (error) {}
    }

    useEffect(() => {
        if (query.token && typeof query.token === 'string') {
            refreshAuth(query.token as string)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
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

export default Auth0CallbackPage
