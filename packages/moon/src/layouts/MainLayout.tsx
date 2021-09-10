import { Container, Grid, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import clsx from 'clsx'
import { ClassNameMap } from '@material-ui/styles'
const useStyles = makeStyles<Theme, { hasHeader: boolean; hasFooter: boolean }>(
    (theme) => ({
        wrapper: ({ hasHeader, hasFooter }) => ({
            '@supports (backdrop-filter: none)': {
                ...(hasHeader && hasFooter
                    ? {
                          backgroundImage: `linear-gradient(to right, #d88ea3 0%, #453dbb 33%, #453dbb 66%, #d88ea3), linear-gradient(to right, #d88ea3ce 0%, #453dbbd0 33%, #453dbbd0 66%, #d88ea3ce)`,
                          backgroundPosition: 'top, bottom',
                          backgroundSize: '100% 1px, 100% 1px',
                          backgroundRepeat: 'no-repeat',
                      }
                    : {}),
            },
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            background: theme.palette.background.default,
            minHeight: '100vh',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }),
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 24,
            flex: 1,
            [theme.breakpoints.down('sm')]: {
                padding: 12,
            },
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: 8,
            paddingBottom: 24,
        },
        hero: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            paddingBottom: 24,
        },
        // middle part
        content: {},
        bottom: {
            display: 'flex',
            flexDirection: 'column',
        },
        left: {
            position: 'sticky',
            height: '100%',
            top: 64,
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
        },
        main: {
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexWrap: 'wrap',
            padding: 16,
            [theme.breakpoints.down('sm')]: {
                padding: 8,
            },
        },
        right: {
            position: 'sticky',
            height: '100%',
            top: 64,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingTop: 24,
            paddingLeft: 24,
            [theme.breakpoints.down('md')]: {
                flexBasis: '33%',
                maxWidth: '33%',
            },
        },
    })
)

interface ILayout {
    children?: React.ReactChild
    header?: React.ReactChild
    footer?: React.ReactChild
    left?: React.ReactChild
    right?: React.ReactChild
    hero?: React.ReactChild
    top?: React.ReactChild
    bottom?: React.ReactChild
    containerProps?: any
    classes?: Partial<
        ClassNameMap<
            | 'container'
            | 'bottom'
            | 'content'
            | 'left'
            | 'right'
            | 'top'
            | 'hero'
            | 'wrapper'
            | 'main'
        >
    >
}

export function MainLayout({
    children,
    header,
    footer,
    left,
    right,
    bottom,
    top,
    hero,
    classes: cls,
    containerProps = {},
}: ILayout) {
    const classes = useStyles({ hasHeader: !!header, hasFooter: !!footer })
    return (
        <Grid
            className={clsx(cls?.wrapper, classes.wrapper)}
            container
            component="main"
        >
            {header || null}
            {hero && (
                <Grid
                    className={clsx(cls?.hero, classes.hero)}
                    component="section"
                    xs={12}
                    item
                >
                    {hero}
                </Grid>
            )}
            <Container
                className={clsx(cls?.container, classes.container)}
                {...containerProps}
            >
                {top && (
                    <Grid
                        className={clsx(cls?.top, classes.top)}
                        component="section"
                        xs={12}
                        item
                    >
                        {top}
                    </Grid>
                )}

                <Grid container className={clsx(cls?.content, classes.content)}>
                    {left && (
                        <Grid
                            className={clsx(cls?.left, classes.left)}
                            component="aside"
                            item
                            xs={3}
                        >
                            {left}
                        </Grid>
                    )}

                    {children && (
                        <Grid
                            className={clsx(cls?.main, classes.main)}
                            item
                            xs
                            component="section"
                        >
                            {children}
                        </Grid>
                    )}

                    {right && (
                        <Grid
                            className={clsx(cls?.right, classes.right)}
                            component="aside"
                            item
                            xs={3}
                        >
                            {right}
                        </Grid>
                    )}
                </Grid>

                {bottom && (
                    <Grid
                        item
                        xs={12}
                        className={clsx(cls?.bottom, classes.bottom)}
                        component="section"
                    >
                        {bottom}
                    </Grid>
                )}
            </Container>

            {footer || null}
        </Grid>
    )
}
