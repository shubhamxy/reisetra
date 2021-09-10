import { Box, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { MainLayout } from '../layouts/MainLayout'

import { useRouter } from 'next/router'

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

const CMSPage = () => {
    const classes = useStyles()
    const router = useRouter()
    useEffect(() => {
        router.replace('/products')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
            }}
        >
            <Box display="flex" flexDirection="column"></Box>
        </MainLayout>
    )
}

export default CMSPage
