import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Button, Typography } from '@material-ui/core'
import { useInView } from 'react-intersection-observer'

export function AsyncListInput({ query, ...params }) {
    const [open, setOpen] = useState(false)
    const { ref, inView } = useInView({
        threshold: 0,
        initialInView: true,
        delay: 0,
    })
    useEffect(() => {
        if (inView && query.hasNextPage) {
            query.fetchNextPage()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, query.hasNextPage])

    let data = []
    query?.data?.pages?.forEach((page) => {
        data = data.concat(page.data)
    })

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true)
            }}
            onClose={() => {
                setOpen(false)
            }}
            getOptionSelected={(option, value) =>
                option['name'] === value['name']
            }
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
            }
            options={data}
            renderOption={(item, index) => {
                if (data?.[data.length - 1]?.id === item?.id) {
                    return (
                        <Typography key={item.id} ref={ref}>
                            {item.name}
                        </Typography>
                    )
                }
                return <Typography key={item.id}>{item.name}</Typography>
            }}
            loading={query.isLoading}
            {...params}
            renderInput={(props) => (
                <TextField
                    {...props}
                    label={params.label}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder={params.placeholder}
                    InputProps={{
                        ...props.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {query.isLoading ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={20}
                                    />
                                ) : null}
                                {props.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    )
}
