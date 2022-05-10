import { Box, Container, LinearProgress } from '@material-ui/core'
import React from 'react'
import { getTotalCount, getTotalDataCount, useOrders } from '../../libs'
import { List, ListFooter } from '../../ui/List'
import { EmptyListComponent } from '../../ui/List/EmptyListComponent'
import OrderCard from './order'

export function Orders() {
    const orders = useOrders()
    return (
        <Container maxWidth="md">
            <List
                classes={{}}
                variant="infinite"
                data={orders.data}
                renderItem={({ item }) => (
                    <OrderCard {...item} selected key={item.id} />
                )}
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
                ListFooterComponent={
                    <ListFooter
                        hasNextPage={orders?.hasNextPage}
                        fetchNextPage={orders?.fetchNextPage}
                        totalDataCount={getTotalDataCount(orders?.data)}
                        totalCount={getTotalCount(orders?.data)}
                    />
                }
                ListEmptyComponent={
                    <EmptyListComponent
                        title={"No orders."}
                    />
                }
            />
        </Container>
    )
}
