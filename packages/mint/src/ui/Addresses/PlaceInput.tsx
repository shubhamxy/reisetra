import React, { useEffect, useMemo, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'
import { config } from '../../libs'
import { useDebounce } from 'use-debounce'

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return
    }

    const script = document.createElement('script')
    script.setAttribute('async', '')
    script.setAttribute('id', id)
    script.src = src
    position.appendChild(script)
}

const autocompleteService = { current: null }

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}))

interface PlaceType {
    description: string
    structured_formatting: {
        main_text: string
        secondary_text: string
        main_text_matched_substrings: [
            {
                offset: number
                length: number
            }
        ]
    }
}

export function PlaceInput({ value, inputValue, ...props }) {
    const classes = useStyles()
    const [options, setOptions] = useState<PlaceType[]>([])
    const loaded = React.useRef(false)
    const [debouncedInputValue] = useDebounce(inputValue, 1000)

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${config.googleMapsApiKey}&libraries=places`,
                document.querySelector('head'),
                'google-maps'
            )
        }

        loaded.current = true
    }

    const fetch = useMemo(
        () =>
            throttle(
                (
                    request: { input: string },
                    callback: (results?: PlaceType[]) => void
                ) => {
                    ;(autocompleteService.current as any).getPlacePredictions(
                        request,
                        callback
                    )
                },
                200
            ),
        []
    )

    useEffect(() => {
        let active = true

        if (
            !autocompleteService.current &&
            (window as any).google &&
            (window as any).google.maps
        ) {
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService()
        }
        if (!autocompleteService.current) {
            return undefined
        }

        if (debouncedInputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetch({ input: inputValue }, (results?: PlaceType[]) => {
            if (active) {
                let newOptions = [] as PlaceType[]

                if (value) {
                    newOptions = [value]
                }

                if (results) {
                    newOptions = [...newOptions, ...results]
                }

                setOptions(newOptions)
            }
        })

        return () => {
            active = false
        }
    }, [value, debouncedInputValue, fetch])

    return (
        <Autocomplete
            {...props}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event: any, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options)
                props.onChange(event, newValue)
            }}
            onInputChange={(event, newInputValue) => {
                props.onInputChange(event, newInputValue)
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={props.label}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    placeholder={props.placeholder}
                    fullWidth
                />
            )}
            renderOption={(option) => {
                if (!option || !option?.structured_formatting || !parse) {
                    return
                }
                const matches =
                    option?.structured_formatting?.main_text_matched_substrings
                const parts = parse(
                    option?.structured_formatting?.main_text,
                    matches?.map((match: any) => [
                        match?.offset,
                        match?.offset + match?.length,
                    ])
                )

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{
                                        fontWeight: part.highlight ? 700 : 400,
                                    }}
                                >
                                    {part.text}
                                </span>
                            ))}
                            <Typography variant="body2" color="textSecondary">
                                {option?.structured_formatting?.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }}
        />
    )
}
