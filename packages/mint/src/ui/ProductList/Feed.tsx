import React from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core'
import { List } from '../List/List'
import { ProductCard } from './Card'
import { OrderTimeline } from '../Orders/Timeline'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {},
    title: {},
    subtext: {},
    list: {
        overflowX: 'hidden',
        overflowY: 'auto',
        listStyle: 'none',
        textDecoration: 'none',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}))

export function ProductList({ data }) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState(false)

    if (!data || !data.cart || !data.cart.items) {
        return null
    }

    return (
        <Paper className={classes.root}>
            <Box overflow="auto" className="scrollbar">
                <List
                    variant="default"
                    classes={{ list: classes.list }}
                    ItemSeparatorComponentProps={{
                        height: 2,
                    }}
                    ItemSeparatorComponent={<Divider />}
                    ListFooterComponent={
                        <Accordion
                            expanded={expanded}
                            onChange={(e, value) => setExpanded(value)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>
                                    Track Shipment
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <OrderTimeline status={data?.status} />
                            </AccordionDetails>
                        </Accordion>
                    }
                    data={data?.cart?.items || []}
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
                    renderItem={({ item, index }) =>
                        item.product ? (
                            <ProductCard key={index} data={item} />
                        ) : null
                    }
                />
            </Box>
        </Paper>
    )
}
