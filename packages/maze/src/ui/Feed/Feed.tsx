import React from 'react'
import {
    Paper,
    Box,
    Typography,
    makeStyles,
    LinearProgress,
    Divider,
} from '@material-ui/core'
import { List } from '../List/List'
import { Footer } from '../List'
import { useProducts } from '../../libs'
import { ProductCard } from './Card'
import { getTotalCount, getTotalDataCount } from '../../libs/rock/utils/data'

export const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '16px',
        overflow: 'hidden',
    },
    header: {},
    title: {},
    list: {
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: 400,
        listStyle: 'none',
        textDecoration: 'none',
    },
}))

export function ProductsFeed({ title = 'Popular' }) {
    const classes = useStyles()
    const { data, hasNextPage, isLoading, fetchNextPage } = useProducts()
    return (
        <Paper className={classes.root}>
            <Box p={2} className={classes.header}>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
            </Box>
            <Box overflow="auto" maxHeight={'600px'} className="scrollbar">
                <List
                    classes={{ list: classes.list }}
                    ItemSeparatorComponentProps={{
                        height: 2,
                    }}
                    ItemSeparatorComponent={<Divider />}
                    data={data}
                    ListEmptyComponent={
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="320px"
                        >
                            <Typography variant="subtitle2">
                                No Products
                            </Typography>
                        </Box>
                    }
                    renderItem={({ item, index }) => (
                        <ProductCard key={index} data={item} />
                    )}
                    variant="infinite"
                    ListFooterComponent={
                        <Footer
                            hasNextPage={hasNextPage}
                            fetchNextPage={fetchNextPage}
                            totalDataCount={getTotalDataCount(data)}
                            totalCount={getTotalCount(data)}
                            // isLoading={isLoading}
                        />
                    }
                    isLoading={isLoading}
                    ListLoadingComponent={
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            pt={2}
                            pb={2}
                        >
                            <LinearProgress style={{ minWidth: 120 }} />
                        </Box>
                    }
                />
            </Box>
        </Paper>
    )
}
