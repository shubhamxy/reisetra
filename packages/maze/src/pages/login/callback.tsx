/* eslint-disable dot-notation */
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { config, login, storage, updateSnackBar, useAuthDispatch, useGlobalDispatch, useRefreshAuth } from '../../libs'
import { Box, LinearProgress, makeStyles } from '@material-ui/core'
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
const PERMITTED_DOMAINS = [config.authUrl];

function Auth0CallbackPage() {
    const classes = useStyles()
    function postCrossDomainMessage(data) {
        window.parent.postMessage(data, config.authUrl);
    }
    const fetchRefreshToken = useRefreshAuth()
    const dispatchGlobal = useGlobalDispatch()
    const { query, isReady, replace } = useRouter()
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
            if (response.data.role === 'ADMIN') {
                dispatch(
                    login({
                        access_token: response.data.access_token,
                        refresh_token: response.data.refresh_token,
                    })
                )
            } else {
                throw Error("Requires Admin role")
            }
        } catch (error) {
            delete query.token;
            replace({
                pathname: query['redirect_route'] as string || '/'
            })
        }
    }

    useEffect(() => {
        if (!isReady) return;
        if (query.token && typeof query.token === 'string') {
            refreshAuth(query.token as string)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, isReady])

    useEffect(() => {
        if (!isReady) return;
        async function handlePostMessage(event) {
            if (PERMITTED_DOMAINS.includes(event.origin)) {
                if (event.data && event.data.type) {
                    switch (event.data.type) {
                        case 'login': {
                            try {
                                const response = await fetchRefreshToken.mutateAsync({
                                    token: event.data.token,
                                })
                                if (response.data.role === 'ADMIN') {
                                    storage.put.access_token(
                                        response.data.access_token
                                    )
                                    storage.put.refresh_token(
                                        response.data.refresh_token
                                    )
                                    postCrossDomainMessage({
                                        ...event.data,
                                        type: 'redirect'
                                    })
                                } else {
                                    throw new Error("Requires Admin role")
                                }
                            } catch (error) {
                                postCrossDomainMessage({
                                    ...event.data,
                                    type: 'error',
                                    error: error.message
                                })
                            }
                            break
                        }
                        case 'error': {
                            dispatchGlobal(
                                updateSnackBar({
                                    message: event.data.error || 'Error Authorization.',
                                    type: 'error',
                                    open: true,
                                })
                            )
                            console.error('handlePostMessage', event)
                        }

                    }
                }

            }
        }
        window.addEventListener('message', handlePostMessage);
        return () => {
            window.removeEventListener("message", handlePostMessage);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReady])
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
