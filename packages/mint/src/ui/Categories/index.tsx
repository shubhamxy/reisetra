import { Box, Chip, List, Paper, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import * as React from 'react'
import { ROUTES, useCategories } from '../../libs'
import { useStyles } from './useStyles'

export function RecommendedCategories() {
    const classes = useStyles()
    const { data } = useCategories()
    const router = useRouter()

    return (
        <Paper className={classes.root}>
            <Box
                display={'flex'}
                flexDirection="column"
                alignItems={'flex-start'}
                pb={2.6}
            >
                <Box pt={0.6} pb={0.6}>
                    <Typography variant={'h5'} style={{ color: '#fff' }}>
                        Popular Categories
                    </Typography>
                </Box>

                <Typography
                    variant={'subtitle2'}
                    style={{ color: '#ffffff', maxWidth: '90%', opacity: 0.6 }}
                >
                    Some recommended categories we think you may like
                </Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
                <List
                    classes={{
                        root: classes.taglist,
                    }}
                    disablePadding
                >
                    {data?.data?.map((item, index) => (
                        <Chip
                            onClick={(e) => {
                                router.push({
                                    pathname: ROUTES.products,
                                    query: {
                                        category: item.label,
                                    },
                                })
                            }}
                            key={index}
                            className={classes.taglistitem}
                            label={
                                <Typography
                                    style={{ fontSize: 14, color: '#2E2F2F' }}
                                    variant="subtitle2"
                                >
                                    {item.label}
                                </Typography>
                            }
                        />
                    ))}
                </List>
            </Box>
        </Paper>
    )
}
