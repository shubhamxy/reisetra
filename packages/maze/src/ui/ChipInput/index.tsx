import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Downshift from 'downshift'
import { List, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    chipContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        padding: theme.spacing(2, 0, 2, 0),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    chip: {
        overflow: 'hidden',
        maxWidth: '100%',
        marginRight: 9,
        marginBottom: 9,
        '&:nth-child': {
            marginRight: 0,
            marginBottom: 0,
        },
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        flexWrap: 'wrap',
    },
}))

export default function TagsInput({ ...props }) {
    const classes = useStyles()
    const { value, onChange, placeholder, endAdornment, ...other } = props
    const [inputValue, setInputValue] = useState('')

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            const newSelectedItem = [...value]
            const duplicatedValues = newSelectedItem.indexOf(
                event.target.value.trim()
            )

            if (duplicatedValues !== -1) {
                setInputValue('')
                return
            }
            if (!event.target.value.replace(/\s/g, '').length) return

            newSelectedItem.push(event.target.value.trim())
            onChange(newSelectedItem)
            setInputValue('')
        }
        if (value.length && !inputValue.length && event.key === 'Backspace') {
            onChange(value.slice(0, value.length - 1))
        }
    }
    function handleChange(item) {
        let newSelectedItem = [...value]
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item]
        }
        setInputValue('')
        onChange(newSelectedItem)
    }

    const handleDelete = (item) => () => {
        const newSelectedItem = [...value]
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1)
        onChange(newSelectedItem)
    }

    function handleInputChange(event) {
        setInputValue(event.target.value)
    }
    return (
        <React.Fragment>
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={handleChange}
                selectedItem={value}
            >
                {({ getInputProps }) => {
                    const { onBlur, onChange, onFocus, ...inputProps } =
                        getInputProps({
                            onKeyDown: handleKeyDown,
                            placeholder,
                        })
                    return (
                        <div>
                            {/* @ts-ignore */}
                            <TextField
                                InputProps={{
                                    // onBlur,
                                    onChange: (event: any) => {
                                        handleInputChange(event)
                                        onChange(event)
                                    },
                                    onFocus,
                                    endAdornment,
                                }}
                                {...other}
                                {...inputProps}
                            />
                            <List
                                classes={{
                                    root: classes.chipContainer,
                                }}
                                disablePadding
                            >
                                {value.map((item) => (
                                    <Chip
                                        variant="outlined"
                                        color="primary"
                                        key={item}
                                        tabIndex={-1}
                                        label={
                                            <Typography
                                                component="p"
                                                className={classes.label}
                                                variant="subtitle2"
                                            >
                                                {item}
                                            </Typography>
                                        }
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                ))}
                            </List>
                        </div>
                    )
                }}
            </Downshift>
        </React.Fragment>
    )
}
TagsInput.defaultProps = {
    value: [],
}
TagsInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
}
