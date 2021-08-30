import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, fade, Typography, Button } from '@material-ui/core'
import { List } from './List'
import { useInView } from 'react-intersection-observer'
import { getTotalCount, getTotalDataCount } from '../../libs/rock/utils/data'

const useStyles = makeStyles((theme) => ({
    list: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '10px',
        width: '100%',
        padding: theme.spacing(3, 2.4, 3, 2.4),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr 1fr',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '1fr',
            alignItems: 'center',
        },
    },
    listItem: {
        justifyContent: 'center',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px',
        flex: 1,
        height: '122px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        objectFit: 'cover',
        height: '122px',
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '4px',
        overflow: 'hidden',
        padding: theme.spacing(0.4, 0.4, 1, 0.4),
    },
    emptyContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        borderRadius: '4px',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(0.4, 0.4, 1, 0.4),
    },
    emptyText: {
        fontSize: 14,
        fontWeight: 500,
    },
    title: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: '19px',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        minHeight: '38px',
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',
        wordBreak: 'break-all',
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 500,
    },
    viewMoreWrap: {
        display: 'flex',
        padding: theme.spacing(2, 2, 2, 2),
        alignItems: 'flex-end',
        flex: 1,
    },
    viewMoreText: {
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '19px',
    },
}))

function Footer({
    classes,
    hasNextPage,
    fetchNextPage,
    totalCount,
    totalDataCount,
    isLoading,
}) {
    const { ref, inView } = useInView()
    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, hasNextPage])

    return totalDataCount > 0 && totalCount > 0 ? (
        <Box className={classes.viewMoreWrap}>
            <Box display={'flex'} flex={1}>
                {hasNextPage && (
                    <Button
                        className={classes.addConnectionBtn}
                        onClick={fetchNextPage}
                    >
                        <Typography
                            children={'View more'}
                            align="center"
                            className={classes.viewMoreText}
                            variant="caption"
                        />
                    </Button>
                )}
            </Box>
            <Box display={'flex'}>
                <Typography
                    children={`${totalDataCount} of ${totalCount}`}
                    align="center"
                    className={classes.viewMoreText}
                    variant="caption"
                />
            </Box>
        </Box>
    ) : null
}

export default function GridList({
    emptyListCaption = 'No results',
    query,
    renderItem,
    ...rest
}) {
    const { data, hasNextPage, isLoading, fetchNextPage } = query
    const classes = useStyles()
    return (
        <Container
            disableGutters
            style={{ flex: 1, width: '100%', height: '100%', display: 'flex' }}
        >
            <List
                variant={'infinite'}
                data={data}
                classes={{ list: classes.list, listItem: classes.listItem }}
                isLoading={isLoading}
                ListEmptyComponent={
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        minHeight="240px"
                        flex={1}
                    >
                        <Typography variant="caption">
                            {emptyListCaption}
                        </Typography>
                    </Box>
                }
                ListFooterComponent={
                    <Footer
                        classes={classes}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        totalDataCount={getTotalDataCount(data)}
                        totalCount={getTotalCount(data)}
                        isLoading={isLoading}
                    />
                }
                renderItem={renderItem}
                {...rest}
            />
        </Container>
    )
}
