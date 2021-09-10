import { Container, Grid } from '@material-ui/core'
import * as React from 'react'
import clsx from 'clsx'
import { ClassNameMap } from '@material-ui/styles'
import { useStyles } from './useStyles'

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
