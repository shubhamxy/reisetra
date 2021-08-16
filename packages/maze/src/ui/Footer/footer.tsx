import React, { Component } from 'react'
import Link from 'next/link'
import { footerLinks } from './data'
import { Icons, Image } from '../Image'
import {
    Container,
    Typography,
    createStyles,
    fade,
    makeStyles,
    IconButton,
    Theme,
    Box,
    useTheme,
} from '@material-ui/core'
import { config } from '../../libs'
import { Logo } from '../Logo'
import { NightsStay, WbSunny } from '@material-ui/icons'
const { version } = require('../../../package.json')

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            display: 'flex',
            width: '100%',
            backgroundColor: fade(theme.palette.background.paper, 0.4),
            backdropFilter: 'blur(50px)',
            position: 'relative',
            [theme.breakpoints.down('sm')]: {
                padding: '40px 0 0',
            },
            boxShadow: '0 -2px 8px rgb(0 0 0 / 15%)',
        },
        container: {
            display: 'flex',
            flexDirection: 'row',
            padding: '40px 30px 40px 30px',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                padding: '24px 24px 24px 24px',
            },
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
            width: '100%',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
            },
        },
        info: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
        },
        links: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        footerlinks: {
            display: 'flex',
            height: '100%',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            alignContent: 'center',
            textAlign: 'left',
        },
        footerNav: {
            paddingRight: 24,
            '&:nth-child(1)': {
                paddingLeft: 0,
            },
            '&:last-child': {
                paddingRight: 0,
            },
        },
        footerNavTitle: {
            fontSize: 18,
        },
        footerNavList: {},
        footerListItem: {
            cursor: 'pointer',
        },
        payments: {
            borderRadius: '4px',
            display: 'flex',
            padding: '20px 0px',
            marginLeft: '-8px',
        },
        socials: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        socialsicon: {
            borderRadius: 0,
            '&:hover': {
                borderRadius: 0,
            },
            '&:focus': {
                borderRadius: 0,
            },
        },
    })
)

function Footer() {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <footer className={classes.footer}>
            <Container className={classes.container}>
                <Box className={classes.content}>
                    <Box className={classes.info}>
                        <Box display="flex" flex={1}>
                            <Logo />
                        </Box>
                        <Box>
                            <Typography
                                color="textPrimary"
                                variant="caption"
                                title={`Copyright ${config.name} ${version}`}
                            >
                                &copy; 2021 {config.name}.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Box
                position="absolute"
                style={{ bottom: 0, right: 0, zIndex: 1000, padding: 12 }}
            >
                <IconButton
                    title="Enable / Disable dark mode"
                    id="dark_mode_button"
                    onClick={() => {
                        const event = new CustomEvent('toggle_dark_mode')
                        document.dispatchEvent(event)
                    }}
                    style={{
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    {theme.palette.type !== 'dark' ? (
                        <NightsStay style={{ height: 20, width: 20 }} />
                    ) : (
                        <WbSunny style={{ height: 20, width: 20 }} />
                    )}
                </IconButton>
            </Box>
        </footer>
    )
}

export default Footer
