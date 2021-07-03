import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { ImagePreview } from "../../ui/MediaPreview";

const products = [
  { name: "Product 1", desc: "A nice thing", price: "$9.99" },
  { name: "Product 2", desc: "Another thing", price: "$3.45" },
  { name: "Product 3", desc: "Something else", price: "$6.51" },
  { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
  { name: "Shipping", desc: "", price: "Free" },
];
const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Summary({ values, touched, errors, handleBlur, handleChange }) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Product Summary
      </Typography>
      <List disablePadding>
        <Grid item>
          <ImagePreview variant="grid" data={values.images}
          />
        </Grid>
        {Object.keys(values).map((key) =>
          typeof values[key] === "string" ? (
            <ListItem className={classes.listItem} key={key}>
              <ListItemText primary={String(key).toLocaleUpperCase()} secondary={values[key]} />
            </ListItem>
          ) : Array.isArray(values[key]) && typeof values[key][0] === 'string' ? (
            <ListItem className={classes.listItem} key={key}>
            <ListItemText primary={String(key).toLocaleUpperCase()} secondary={values[key].join(", ")} />
          </ListItem>
          ): null
        )}
      </List>
    </React.Fragment>
  );
}
