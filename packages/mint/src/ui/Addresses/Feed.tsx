import React from 'react'
import { Box, Typography, makeStyles, LinearProgress } from '@material-ui/core'
import { List } from '../List/List'
import { Card } from './Card'

export const useStyles = makeStyles<any>((theme) => ({
    root: { height: '100%', display: 'flex', flexDirection: 'column', flex: 1 },
    header: {},
    content: {},
    title: {},
    listRoot: {},
    list: {
        overflowX: 'hidden',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}))

export function Feed({ data, selected, setSelected }) {
    const classes = useStyles()
    return (
        <List
            classes={{ list: classes.list }}
            data={data}
            ListEmptyComponent={
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="320px"
                >
                    <Typography align="center" variant="subtitle2">
                        Please add an address.
                    </Typography>
                </Box>
            }
            renderItem={({ item, index }) => (
                <Card
                    key={index}
                    data={item}
                    selected={selected}
                    setSelected={setSelected}
                />
            )}
            variant="default"
            ListLoadingComponent={
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    pt={2}
                    pb={2}
                >
                    <LinearProgress
                        style={{ minWidth: 140 }}
                        variant="indeterminate"
                    />
                </Box>
            }
        />
    )
}
