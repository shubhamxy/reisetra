import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Box,
  Chip,
  TextField,
  List,
  Slider,
  ListItem,
} from "@material-ui/core";
import { FilterT } from "../../pages/products";
import clsx from "clsx";
import { Rating } from "@material-ui/lab";
const intlFormat = (num) => {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
};

const formatHumanFriendly = (num) => {
  if (num >= 1000000) return `${intlFormat(num / 1000000)}M`;
  if (num >= 1000) return `${intlFormat(num / 1000)}k`;
  return intlFormat(num);
};
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "transparent",
      // backdropFilter: "blur(50px)",
      boxShadow: "0px 4px 50px rgba(15, 15, 15, 0.05)",
      width: "100%",
      color: theme.palette.common.white,
      paddingRight: 6,
    },
    icon: {
      color: theme.palette.common.white,
      cursor: "pointer",
    },
    heading: {
      fontSize: theme.typography.pxToRem(12),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(12),
    },
    badge: {
      top: "-10px !important",
    },
    percentage: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      fontSize: 21,
      lineHeight: 21,
      fontWeight: 700,
      right: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    list: {
      marginTop: 6,
      borderRadius: 6,
      padding: 0,
    },
    listItem: {
      marginTop: 5,
      paddingLeft: 0,
      paddingRight: 0,
      alignItems: "flex-start",
    },
    taglist: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },
    taglistitem: {
      borderRadius: "48px",
      justifyContent: "center",
      textAlign: "center",
      textTransform: "capitalize",
      alignItems: "center",
      boxShadow: "0px -28px 100px rgba(15, 15, 15, 0.1)",
      marginRight: "8px",
      marginBottom: "8px",
      background: theme.palette.text.primary,
      color: theme.palette.background.paper,
      "&:hover": {
        backgroundColor: fade(theme.palette.text.primary, 0.8),
      },
      "&:focus": {
        backgroundColor: theme.palette.text.primary,
        boxShadow: `0px 0px 0px 4px#d0f20f33`,
      },
      "&.Mui-disabled": {
        backgroundColor: theme.palette.text.primary,
        opacity: 0.7,
        boxShadow: `0px 0px 0px 4px#d0f20f33`,
      },
    },
    taglistitemSelected: {
      backgroundColor: fade(theme.palette.text.primary, 0.8),
      boxShadow: `0px 0px 0px 4px#d0f20f33`,
    },
    listPrimaryText: {},
    ratingsList: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
    },
    ratingsListItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      cursor: "pointer",
    },
    action: {
      top: "35%",
      padding: "1px 6px 1px 6px",
      borderRadius: 9,
      fontSize: 12,
      backgroundColor: fade("#011632", 0.05),
    },
    rangeRoot: {
      width: "100%",
      padding: 20,
    },
    valueLabel: {},
  })
);

export function Filters({
  data,
  values,
  setFieldValue,
}: {
  data: {
    [key: string]: FilterT;
  };
  values: {
    [key: string]: string | string[] | number[];
  };
  setFieldValue: (key: string, value: string | string[] | number[]) => void;
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<number>(0);

  const handleChange = (panel: number) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : -1);
  };
  function valuetext(value: number) {
    return `₹${formatHumanFriendly(value)}`;
  }
  const content = (item, filter) => {
    switch (item.type) {
      case "range": {
        return (
          <div className={classes.rangeRoot}>
            <Slider
              color="secondary"
              value={values[filter] as number[]}
              onChange={(e, value) => {
                setFieldValue(filter, value as number[]);
              }}
              max={100000}
              step={1000}
              valueLabelFormat={valuetext}
              classes={{ valueLabel: classes.valueLabel }}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection="column"
            >
              <Box flex={1} width={"100%"} pt={2.4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Min"
                  value={values[filter][0]}
                  onChange={(e) => {
                    setFieldValue(filter, [
                      +e.target.value,
                      values[filter][1],
                    ] as number[]);
                  }}
                  onBlur={() => {}}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: values[filter][1],
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Box>
              <Box flex={1} width={"100%"} pt={2.4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Max"
                  value={values[filter][1]}
                  onChange={(e) => {
                    setFieldValue(filter, [
                      values[filter][0],
                      +e.target.value,
                    ] as number[]);
                  }}
                  onBlur={() => {}}
                  inputProps={{
                    step: 10,
                    min: values[filter][0],
                    max: 100,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Box>
            </Box>
          </div>
        );
      }
      case "rating": {
        return (
          <List
            classes={{
              root: classes.ratingsList,
            }}
            disablePadding
          >
            {item.data.map((item) => {
              const value = values[filter] as string;
              const isSelected = value === item.value;
              return (
                <ListItem
                  key={item.value}
                  disableGutters
                  title={`${item.value} stars and up`}
                  onClick={(e) => {
                    if (isSelected) {
                      setFieldValue(filter, undefined);
                    } else {
                      setFieldValue(filter, item.value);
                    }
                  }}
                  className={classes.ratingsListItem}
                >
                  <Box display="flex" alignItems="center">
                    <Rating
                      readOnly
                      value={item.value}
                      key={item.value}
                      size="medium"
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography
                      variant={"caption"}
                      style={isSelected ? { lineHeight: 1, fontWeight: "bold" } : {lineHeight: 1}}
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        );
      }
      case "multiselect":
        return (
          <List
            classes={{
              root: classes.taglist,
            }}
            disablePadding
          >
            {item.data.map((item: { label: string }, index) => {
              const value = values[filter] as string[];
              const isSelected = value.includes(item.label);
              return (
                <Chip
                  key={item.label}
                  onClick={(e) => {
                    if (isSelected) {
                      setFieldValue(filter, [
                        ...value.filter((i) => i !== item.label),
                      ]);
                    } else {
                      setFieldValue(
                        filter,
                        // @ts-ignore
                        Array.isArray(values[filter]) &&
                          values[filter].length > 0
                          ? // @ts-ignore
                            [...values[filter], item.label]
                          : [item.label]
                      );
                    }
                  }}
                  className={clsx(
                    classes.taglistitem,
                    isSelected ? classes.taglistitemSelected : ""
                  )}
                  label={
                    <Typography
                      style={{ fontSize: 14, lineHeight: 1 }}
                      variant="subtitle2"
                    >
                      {item.label}
                    </Typography>
                  }
                />
              );
            })}
          </List>
        );
      default:
        return (
          <List
            classes={{
              root: classes.taglist,
            }}
            disablePadding
          >
            {item.data.map((item) => {
              const value = values[filter] as string[];
              const isSelected = value.includes(item.label);
              return (
                <Chip
                  key={item.label}
                  onClick={(e) => {
                    if (isSelected) {
                      setFieldValue(filter, undefined);
                    } else {
                      setFieldValue(filter, item.label);
                    }
                  }}
                  clickable
                  className={classes.taglistitem}
                  // disabled={values[filter] === item.label}
                  label={
                    <Typography
                      style={{ fontSize: 14,lineHeight: 1 }}
                      variant="subtitle2"
                    >
                      {item.label}
                    </Typography>
                  }
                />
              );
            })}
          </List>
        );
    }
  };

  return Object.entries(data).map(([filter, item], index) => (
    <Accordion
      key={index}
      classes={{ root: classes.root }}
      expanded={expanded === index}
      onChange={handleChange(index)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
      >
        <Box display={"flex"} flexDirection="column" alignItems={"flex-start"}>
          <Box pt={0.6}>
            <Typography variant={"h6"}>
              {item.title}
            </Typography>
          </Box>
          {item.subtitle && expanded === index && (
            <Typography
              variant={"caption"}
              style={{ opacity: 0.9 }}
            >
              {item.subtitle}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box display={"flex"} flexDirection={"column"} flex={1}>
          {content(item, filter)}
        </Box>
      </AccordionDetails>
    </Accordion>
  ));
}
