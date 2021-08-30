import { Box, CircularProgress, Container } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { getTotalCount, getTotalDataCount, useFiles } from '../../libs'
import { Footer, List } from '../../ui/List'
import FileCard from './files'

export function Files() {
    const { query } = useRouter()
    const files = useFiles(query)
    return (
        <Container maxWidth="md">
            <List
                classes={{}}
                variant="infinite"
                data={files.data}
                renderItem={({ item }) => (
                    <FileCard {...item} selected key={item.url} />
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
                        <CircularProgress size={24} />
                    </Box>
                }
                ListFooterComponent={
                    <Footer
                        hasNextPage={files?.hasNextPage}
                        fetchNextPage={files?.fetchNextPage}
                        totalDataCount={getTotalDataCount(files?.data)}
                        totalCount={getTotalCount(files?.data)}
                        // isLoading={files.isLoading}
                    />
                }
            />
        </Container>
    )
}
