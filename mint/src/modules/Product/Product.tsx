import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  ButtonGroup,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Divider,
  TextField,
  Link as MaterialLink,
} from "@material-ui/core";
import {
  useAddCartItem,
  useAuthState,
  useDeleteCartItem,
  useProduct,
} from "../../libs";
import { ImagePreview } from "../../ui/MediaPreview";
import { Rating } from "@material-ui/lab";
import { ShowCase } from "../ShowCase";
import { useRouter } from "next/router";
import ReviewCard from "../Reviews/review";
import { Reviews } from "../Reviews";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    textAlign: "center",
    minHeight: "64px",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 24px 12px 24px",
    margin: 0,
    lineHeight: 1,
    borderRadius: 4,
    width: "100%",
  },
  circle: {
    marginBbottom: "0px",
    marginRight: "16px",
    width: "24px",
    marginTop: "6px",
    height: "24px",
    border: "2px solid #6ad1e0",
    borderRadius: "32px",
    marginBottom: "8px",
  },
  footer: {
    display: "flex",
    minHeight: "60px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "100%",
    textAlign: "left",
    paddingTop: 24,
    background: "#9caf98",
    minHeight: "200px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  images: {},
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    margin: "0",
    width: "100%",
    height: "100%",
    padding: theme.spacing(2, 4, 2, 4),
  },
  description: {
    padding: theme.spacing(0, 4.0, 4.5, 4.0),
  },
  sizeSelectContainer: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
  titleContainer: {
    display: "flex",
    alignItems: "center",
  },
  ratingsContainer: {
    display: "flex",
    alignItems: "center",
  },
  priceContainer: {
    display: "flex",
    alignItems: "center",
  },
  categoryContainer: {
    display: "flex",
    alignItems: "center",
  },
  shippingContainer: {
    display: "flex",
    alignItems: "center",
  },
  colorContainer: {
    display: "flex",
    alignItems: "center",
  },
  sizeAndQtyContainer: {
    display: "flex",
    alignItems: "center",
  },

  details: {},

  recommendations: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: "0",
    width: "100%",
    height: "100%",
    padding: theme.spacing(2.1, 4.0, 4.5, 4.0),
    background: "#449ae0",
    minHeight: "200px",
  },

  divider: {
    marginTop: 12,
    marginBottom: 12,
    position: "relative",
    width: "100%",
    textAlign: "center",
    "&:before": {
      background:
        "linear-gradient(to right, #4f44e0 0%, transparent 40%, transparent 60%, #4f44e0 100%)",
      content: "''",
      display: "block",
      height: 1,
      position: "absolute",
      top: 8,
      width: "100%",
    },
  },
  illustration: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  authProviders: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useTableStyles = makeStyles({
  table: {},
});

function createData(label: string, value: number | string) {
  return { label, value };
}

export default function DetailsTable({ rows, label }) {
  const classes = useTableStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Product Details table">
        <Typography
          variant="caption"
          component="caption"
          style={{ fontSize: 16 }}
        >
          {label}
        </Typography>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.label}>
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="right">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function useHelper() {
  return {};
}
export function Product({ id }) {
  const classes = useStyles();
  const router = useRouter();
  const { data: result, isLoading } = useProduct(id);
  const addCartItem = useAddCartItem();
  const removeCartItem = useDeleteCartItem();
  const { user } = useAuthState();
  const [tabIndex, setTabIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { data } = result || {};
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const theme = useTheme();
  const {
    mrp,
    tax,
    price,
    published,
    sizes,
    dimensions,
    details,
    colors,
    brand,
    title,
    description,
    inventory: { stockQuantity, sku } = { stockQuantity: 0, sku: 0 },
    images,
  } = data || ({} as any);

  useEffect(() => {
    if (data) {
      setSelectedSize(data["sizes"][0]);
      setSelectedColor(data["colors"][0]);
    }
  }, [data]);

  function handleAddToCart() {
    if(!user) {
      router.push(`/login?ref=${encodeURIComponent(router.asPath)}`)
      return;
    }
    addCartItem.mutate(
      {
        body: {
          quantity: qty,
          size: selectedSize,
          color: selectedColor,
        },
        productId: id,
        cartId: user.cart.id,
      },
      {}
    );
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/checkout");
  }
  console.log({d: String(data?.["description"]).split("\n")})
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      direction="column"
      spacing={2}
    >
      <Grid item className={classes.header}>
        <Box className={classes.circle} />
        <Typography variant="caption">
          <MaterialLink
            style={{ color: theme.colors.link.main }}
            underline="none"
            href="/"
          >
            Home
          </MaterialLink>{" "}
          /{" "}
          <MaterialLink
            style={{ color: theme.colors.link.main }}
            underline="none"
            href={`/products?category=${data?.["categories"][0]?.value}`}
          >
            {data?.["categories"] ? data?.["categories"][0]?.label: ""}
          </MaterialLink>{" "}
          /{" "}
          <MaterialLink
            style={{ color: theme.colors.link.main }}
            underline="none"
            href={`/product/${data?.["id"]}`}
          >
            {data?.["title"]}
          </MaterialLink>
        </Typography>
      </Grid>
      <Grid item container xs sm className={classes.content}>
        <Grid item className={classes.images} xs={6}>
          <ImagePreview data={data?.["images"]} />
        </Grid>
        <Grid item xs container className={classes.info} spacing={2}>
          <Grid item xs>
            <Typography variant="h3">{data?.["title"]}</Typography>
          </Grid>
          <Grid item xs container>
            <Grid item xs>
              <Rating value={data?.["rating"] || 5} readOnly />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1">
                {`(${data?.["numberOfRatings"] || "1"} rating${
                  data?.["numberOfRatings"] > 0 ? "s" : ""
                })`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography variant="h5">₹ {data?.["price"]}</Typography>
          </Grid>
          <Divider />
          <Grid item xs container style={{ paddingTop: 24, paddingBottom: 24 }}>
            <Grid item xs={12} className={classes.categoryContainer}>
              <Grid item xs>
                <Typography variant="caption">{"Category"}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption">{data?.["categories"]?.map(item => item.label).join(", ")}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.shippingContainer}>
              <Grid item xs>
                <Typography variant="caption">{"Shipping"}</Typography>
              </Grid>
              <Grid item xs>
                <Typography variant="caption">{"Free Shipping"}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12} container className={classes.colorContainer}>
              <Grid item xs>
                <Typography variant="caption">{"Color"}</Typography>
              </Grid>
              <Grid item xs container spacing={1}>
                {data?.["colors"].map((color) => {
                  return (
                    <Grid
                      item
                      xs
                      onClick={() => {
                        setSelectedColor(color);
                      }}
                    >
                      <Typography
                        variant="caption"
                        style={{ textTransform: "capitalize" }}
                      >
                        {color}
                      </Typography>
                      <Typography
                        style={{
                          border:
                            selectedColor === color
                              ? "2px solid #6ad1e0"
                              : `2px solid #cccccc`,
                          background:
                            color === "multicolor"
                              ? "linear-gradient(180deg, #f00, #0f0, #00f)"
                              : color,
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          cursor: "pointer",
                        }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs container style={{ paddingTop: 24, paddingBottom: 24 }}>
            <Grid item xs>
              <FormControl
                variant="outlined"
                className={classes.sizeSelectContainer}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Size
                </InputLabel>
                <Select
                  variant="outlined"
                  style={{ height: 40, overflow: "hidden" }}
                  fullWidth
                  labelId="size"
                  id="demo-simple-select-outlined"
                  value={selectedSize}
                  onChange={(e) => {
                    setSelectedSize(e.target.value as string);
                  }}
                  label="Size"
                >
                  {data?.["sizes"]?.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs container alignItems="center" spacing={2}>
              <Grid item xs>
                <TextField
                  variant="outlined"
                  label="Qty"
                  value={qty}
                  onChange={(e) => {
                    setQty(
                      Math.min(
                        Math.max(parseInt(e.target.value), 1),
                        data?.["inventory"]["stockQuantity"] || 99
                      )
                    );
                  }}
                  type="number"
                />
              </Grid>
              <Grid item>
                <ButtonGroup style={{ height: 40 }} disableRipple>
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      setQty(Math.max(qty - 1, 1));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {
                      setQty(
                        Math.min(
                          qty + 1,
                          data?.["inventory"]["stockQuantity"] || 99
                        )
                      );
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            item
            xs
            container
            style={{ paddingTop: 24, paddingBottom: 24 }}
            spacing={2}
          >
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleBuyNow}
              >
                {"Buy Now"}
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleAddToCart}
              >
                {"Add to Cart"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs container>
        <Grid item xs={12} justify={"center"}>
          <Tabs
            value={tabIndex}
            centered
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, value) => {
              setTabIndex(value);
            }}
          >
            <Tab label="Description" value={0} />
            <Tab label="Reviews" value={1} />
          </Tabs>
        </Grid>
        <Grid item xs={12} style={{ minHeight: 420 }}>
          <TabPanel value={tabIndex} index={0}>
            {String(data?.["description"]).split("\n").map((item, index) => {
              return <Typography component="p" key={index} variant="body1">{item}</Typography>
            })}
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <Reviews id={id} />
          </TabPanel>
        </Grid>
      </Grid>
      <Divider />
      <Grid item xs container style={{ paddingTop: 46, paddingBottom: 46 }}>
        <Grid item xs={4} style={{ paddingRight: 46 }}>
          <DetailsTable
            label={"Dimensions"}
            rows={[
              createData("Width", data?.["dimensions"][0]),
              createData("Height", data?.["dimensions"][1]),
              createData("Depth", data?.["dimensions"][2]),
            ]}
          />
        </Grid>
        <Grid item xs={8}>
          <DetailsTable label={"Details"} rows={data?.["details"]} />
        </Grid>
      </Grid>
      <Divider />
      <Grid item xs container style={{ paddingTop: 46, paddingBottom: 46 }}>
        <Grid item xs={12}>
          <Typography variant="h4">{"Recommended"}</Typography>
        </Grid>
        <Grid item xs={12}>
          <ShowCase />
        </Grid>
      </Grid>
    </Grid>
  );
}
