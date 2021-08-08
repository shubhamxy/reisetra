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
import { Reviews } from "../Reviews";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {},
  top: {
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
    position: "relative",
    flexDirection: "row",
  },
  link: {
    whiteSpace: "nowrap",
    textAlign: "center",
    cursor: "pointer",
    color: theme.palette.primary.main,
    maxWidth: 300,
    overflow: "hidden",
    textOverflow: "ellipsis",
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
  bottom: {
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    width: "100%",
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
    padding: theme.spacing(2, 4, 2, 4),
    position: "relative",
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
      // style={{ height: "100%" }}
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
          component="caption"
          style={{ fontSize: 20, textAlign: "right" }}
        >
          {label}
        </Typography>
        <TableBody>
          {rows?.map?.((row) => (
            <TableRow key={row.label}>
              <TableCell align="left" component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell width="60%" align="right">
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export function Product({ data, isLoading }) {
  const classes = useStyles();
  const router = useRouter();
  const addCartItem = useAddCartItem();
  const removeCartItem = useDeleteCartItem();
  const { user } = useAuthState();
  const [tabIndex, setTabIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const theme = useTheme();
  const {
    mrp = 0,
    tax = 0,
    price = 0,
    sizes = [],
    dimensions = [],
    details,
    faqs,
    colors = [],
    brand = "",
    title = "",
    description = "",
    inventory = { stockQuantity: 0, sku: 0 },
    images = [],
    id,
    categories,
    rating,
    ratingsCount,
  } = data || ({} as any);

  useEffect(() => {
    if (sizes && colors) {
      setSelectedSize(sizes[0]);
      setSelectedColor(colors[0]);
    }
  }, [sizes, colors]);

  function handleAddToCart() {
    if (!user) {
      router.push(`/login?ref=${encodeURIComponent(router.asPath)}`);
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
    if (!user) {
      router.push(`/login?ref=${encodeURIComponent(router.asPath)}`);
      return;
    }
    handleAddToCart();
    router.push("/checkout");
  }
  const Top = (
    <Grid item className={classes.top}>
      <Box className={classes.circle} />
      <Box display="flex">
        <Box display="flex">
          <Link href="/">
            <Typography variant="caption" className={classes.link}>
              Home
            </Typography>
          </Link>
        </Box>
        <Box display="flex" pl={1} pr={1}>
          <Typography variant="caption">/</Typography>
        </Box>
        <Box display="flex">
          <Link href={`/products?category=${categories?.[0]?.value || ""}`}>
            <Typography variant="caption" className={classes.link}>
              {categories ? categories[0]?.label : ""}
            </Typography>
          </Link>
        </Box>
        <Box display="flex" pl={1} pr={1}>
          <Typography variant="caption">/</Typography>
        </Box>
        <Box display="flex">
          <Link href={`/product/${id}`}>
            <Typography variant="caption" className={classes.link}>
              {title ? String(title).trim() : ""}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
  const ProductInfo = (
    <Grid item container xs sm className={classes.content}>
      <Grid item container className={classes.images} xs={12} md={6}>
        <ImagePreview data={images} />
      </Grid>
      <Grid item container className={classes.info} xs={12} md={6} spacing={2}>
        <Grid item xs container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h4">{title}</Typography>
            <Box style={{ cursor: "pointer" }}>
              <Typography
                onClick={() => {
                  router.push({
                    pathname: "/products",
                    query: {
                      brands: [brand],
                    },
                  });
                }}
                variant="subtitle2"
              >
                {brand}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justify="flex-start"
            alignContent="center"
            style={{ display: "flex" }}
          >
            <Rating value={rating || 5} disabled={!ratingsCount} readOnly />
            <Typography
              variant="caption"
              style={{ fontSize: 14, lineHeight: 1, marginLeft: 8 }}
            >
              {ratingsCount
                ? `(${ratingsCount} rating${ratingsCount > 1 ? "s" : ""})`
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={12} container direction="column">
            <Grid item xs={12}>
              <Typography
                variant="caption"
                style={{ fontSize: 14, textDecoration: "line-through" }}
              >
                ₹ {mrp}
              </Typography>
              <Typography
                children={`(${(((+mrp - +price) / +mrp) * 100) | 0}% off)`}
                variant="caption"
                style={{ fontSize: 14, marginLeft: 4 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">₹ {price}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid
          item
          xs
          container
          spacing={2}
          style={{ paddingTop: 24, paddingBottom: 24 }}
        >
          <Grid item xs={12} className={classes.categoryContainer}>
            <Grid item xs={12}>
              <Typography variant="caption">{"Category"}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                {categories?.map((item) => item.label).join(", ")}
              </Typography>
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
              {colors.map((color) => {
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
        <Grid item xs container>
          <Grid
            item
            xs={12}
            md={6}
            style={{ paddingTop: 24, paddingBottom: 24 }}
          >
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
                {sizes?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{ paddingTop: 24, paddingBottom: 24 }}
            spacing={2}
            container
            alignItems="center"
          >
            <Grid item xs>
              <TextField
                variant="outlined"
                label="Qty"
                value={qty}
                onChange={(e) => {
                  setQty(
                    Math.min(
                      Math.max(parseInt(e.target.value), 1),
                      inventory["stockQuantity"] || 0
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
                    setQty(Math.min(qty + 1, inventory["stockQuantity"] || 99));
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
          xs={12}
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
  );
  const ProductDescription = (
    <Grid item xs container>
      <Grid item xs={12}>
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
        <TabPanel key={id} value={tabIndex} index={0}>
          {String(description)
            .split("\n")
            .map((item, index) => {
              return (
                <Typography component="p" key={index} variant="body1">
                  {item || ""}
                </Typography>
              );
            })}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <Reviews key={id} id={id} />
        </TabPanel>
      </Grid>
    </Grid>
  );
  const ProductDetails = (
    <Grid
      item
      xs
      container
      spacing={4}
      style={{ width: "100%", paddingTop: 46, paddingBottom: 46 }}
    >
      {dimensions && (
        <Grid item xs={12} md={4}>
          <DetailsTable
            label={"Dimensions"}
            rows={[
              createData("Width", dimensions[0]),
              createData("Height", dimensions[1]),
              createData("Depth", dimensions[2]),
            ]}
          />
        </Grid>
      )}
      {details && (
        <Grid item xs={12} md={8}>
          <DetailsTable label={"Details"} rows={details} />
        </Grid>
      )}
      {faqs && Object.keys(faqs).length > 0 && (
        <Grid item xs={12} md={12}>
          <DetailsTable label={"FAQs"} rows={faqs} />
        </Grid>
      )}
    </Grid>
  );

  const Bottom = (
    <Grid item xs container className={classes.bottom}>
      <Grid item xs={12}>
        <Typography variant="h4">{"Recommended"}</Typography>
      </Grid>
      <Grid item xs={12}>
        <ShowCase filters={{}} />
      </Grid>
    </Grid>
  );
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      direction="column"
      spacing={2}
    >
      {Top}
      {ProductInfo}
      <Grid item>
        <Divider />
      </Grid>

      {ProductDescription}
      <Grid item>
        <Divider />
      </Grid>
      {ProductDetails}
      <Grid item>
        <Divider />
      </Grid>
      {Bottom}
    </Grid>
  );
}
