import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import { Box, List, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 8,
  },
  chip: {
    overflow: 'hidden',
    maxWidth: '100%'
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    flexWrap: 'wrap',
  },
}));

export default function TagsInput({ ...props }) {
  const classes = useStyles();
  const { value, onChange, placeholder, ...other } = props;
  const [inputValue, setInputValue] = useState("");
  const [key, setKey] = useState("");
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      const newSelectedItem = [...value];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue("");
        return;
      }
      if (!event.target.value.replace(/\s/g, "").length) return;
      if (!key) {
        setKey(event.target.value.trim());
      } else {
        newSelectedItem.push({
          label: key,
          value: event.target.value.trim(),
        });
        setKey("");
        onChange(newSelectedItem);
      }
      setInputValue("");
    }
    if (value.length && !inputValue.length && event.key === "Backspace") {
      onChange(value.slice(0, value.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...value];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");
    onChange(newSelectedItem);
  }

  const handleDelete = (item) => () => {
    const newSelectedItem = [...value];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    onChange(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  return (
    <React.Fragment>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={Object.keys(value)}
      >
        {({ getInputProps, getRootProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <Box {...getRootProps()}>
              {/* @ts-ignore */}
              <TextField
                InputProps={{
                  // onBlur,
                  onChange: (event: any) => {
                    handleInputChange(event);
                    onChange(event);
                  },
                  onFocus,
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
                      <Typography component="p" className={classes.label} variant="subtitle2">
                        {item.label}: {item.value}
                      </Typography>
                    }
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                ))}
                {key && (
                  <Chip
                    variant="outlined"
                    color="primary"
                    key={key}
                    tabIndex={-1}
                    label={
                      <Typography component="p" className={classes.label} variant="subtitle2">
                        {key}
                      </Typography>
                    }
                    className={classes.chip}
                  />
                )}
              </List>
            </Box>
          );
        }}
      </Downshift>
    </React.Fragment>
  );
}
TagsInput.defaultProps = {
  value: [],
};
TagsInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
};
