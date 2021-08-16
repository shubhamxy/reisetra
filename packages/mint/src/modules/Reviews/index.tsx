import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  fade,
  Typography,
  Button,
  Grid,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  InputLabel,
  DialogActions,
} from "@material-ui/core";
import {
  useAuthState,
  useCreateReview,
  useDeleteReview,
  useOrders,
  useReviews,
  useUpdateReview,
} from "../../libs";
import GridList from "../../ui/List/GridList";
import { useRouter } from "next/router";
import { ShoppingCart } from "@material-ui/icons";
import ReviewCard from "./review";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProductImages from "../../ui/ProductImages";
import { Rating } from "@material-ui/lab";
import { useEffect } from "react";

const reviewSchema = Yup.object().shape({
  productId: Yup.string().required("Product is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().min(4).required("Description is required"),
  images: Yup.array().of(
    Yup.object().shape({
      fileType: Yup.string().required("fileType is required"),
      contentType: Yup.string().required("contentType is required"),
      url: Yup.string().required("url is required"),
    })
  ),
  tags: Yup.array(),
  rating: Yup.number().required("Rating is required"),
  published: Yup.boolean().required(),
});

type TStyles = {
  background: string;
  color: string;
}[];

const styles: TStyles = [
  {
    background: "#ffffff",
    color: "#0f0f0f",
  },
  {
    background: "#0f0f0f",
    color: "#ffffff",
  },
  { background: "#906039", color: "#ffffff" },
  {
    background: "#d3b7a1",
    color: "#ffffff",
  },
  {
    background: "#d88ea3",
    color: "#ffffff",
  },
  {
    background: "#286dc1",
    color: "#0f0f0f",
  },
  {
    background: "#74D125",
    color: "#0f0f0f",
  },
];
const useGridItemStyles = makeStyles<Theme, { styleIndex: number }>(
  (theme) => ({
    root: ({ styleIndex }) => ({
      display: "flex",
      flex: 1,
      position: "relative",
      flexDirection: "column",
      alignItems: "flex-start",
      cursor: "pointer",
      height: 400,
      mixBlendMode: "normal",
      borderRadius: 8,
      boxShadow: "0px 4px 12px rgba(15, 15, 15, 0.10)",
      color: fade(styles[styleIndex].color, 0.8),
      background: styles[styleIndex].background,
    }),
    card: {
      margin: 0,
      padding: "30px 30px 19px 24px",
      width: "100%",
      height: "100%",
    },

    title: ({ styleIndex }) => ({
      ...theme.typography.subtitle2,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    }),
    description: ({ styleIndex }) => ({
      ...theme.typography.caption,
      display: "-webkit-box",
      overflow: "hidden",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      wordBreak: "break-all",
    }),
    banner: {},
    cover: {},
    group: {},
    costContainer: {
      position: "absolute",
      bottom: "24px",
      left: "24px",
    },
    addToCartContainer: {
      position: "absolute",
      bottom: "24px",
      right: "24px",
    },
    button: {
      transition: "opacity ease-in 0.2s",
    },
    cost: {},
    seeAllText: ({ styleIndex }) => ({
      ...theme.typography.body2,
      fontSize: "12px",
      lineHeight: "14px",
    }),
    imageContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      width: "100%",
      height: "100%",
    },
    image: {
      backgroundColor: "#fff",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      backgroundSize: "contain",
      height: 0,
      width: "100%",
      paddingTop: "56.25%", // 16:9
      "&:hover": {
        transition:
          "background-image 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
    },
  })
);

export function GridItem({
  styleIndex = 0,
  title,
  description,
  price,
  images,
  onClick,
}: {
  styleIndex: number;
  title: string;
  description: string;
  price: string;
  images: { url: string }[];
  onClick: () => any;
}) {
  const classes = useGridItemStyles({ styleIndex });
  const [image, setImage] = useState(0);
  const [addToCartVisible, setAddToCartVisible] = useState(false);
  return (
    <Card className={classes.root} onClick={onClick}>
      <CardMedia
        className={classes.image}
        onMouseEnter={() => setImage(image + 1)}
        onMouseLeave={() => setImage(0)}
        image={images?.[image % images.length]?.url}
        title={title}
      />
      <CardContent
        className={classes.card}
        onMouseEnter={() => setAddToCartVisible(true)}
        onMouseLeave={() => setAddToCartVisible(false)}
      >
        <Typography className={classes.title} variant="h4" title={title}>
          {title}
        </Typography>
        <Typography className={classes.description} variant="subtitle2">
          {description}
        </Typography>
        <Box display="flex" flex={1}>
          <Box className={classes.costContainer}>
            <Typography
              className={classes.cost}
              children={`₹ ${price}`}
              variant="subtitle2"
            />
          </Box>
          <Box className={classes.addToCartContainer}>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              style={{ opacity: addToCartVisible ? 1 : 0 }}
              className={classes.button}
              startIcon={<ShoppingCart style={{ width: 14, height: 14 }} />}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export function Reviews({ id }: { id: string }) {
  const query = useReviews(id);
  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();
  const [selected, setSelected] = useState(null);
  const router = useRouter();
  const authState = useAuthState();
  const orders = useOrders();
  const { user } = authState;
  const [hasOrdered, setHasOrdered] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasOrdered =
      orders?.data?.pages?.some((page) => {
        const pageData = page?.data as any[];
        return !!pageData?.some((order) => {
          if (order.status === "SHIPPED") {
            return order.cart.items.some((item) => item["productId"] === id);
          }
          return false;
        });
      }) || false;
    setHasOrdered(hasOrdered);
  }, [orders]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };
  const initialValues = {
    productId: id,
    title: "",
    description: "",
    images: [],
    tags: [],
    rating: 5,
    published: true,
  };
  const {
    values,
    setFieldValue,
    isValid,
    touched,
    errors,
    handleChange,
    setValues,
    handleSubmit,
    validateForm,
    setTouched,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues,
    validateOnMount: true,
    enableReinitialize: true,
    validationSchema: reviewSchema,
    onSubmit: (data) => {
      if (selected) {
        updateReview.mutate(
          {
            id: selected,
            body: data,
          },
          {
            onSuccess: ({ data }) => {
              handleClose();
            },
          }
        );
      } else {
        createReview.mutate(data, {
          onSuccess: ({ data }) => {
            handleClose();
          },
        });
      }
    },
  });

  return (
    <>
      <Grid container xs={12}>
        <GridList
          query={query}
          emptyListCaption="No Reviews Yet"
          renderItem={({ item, index }) => (
            <ReviewCard
              editable={item.userId === authState?.["user"]?.["id"]}
              {...item}
              onEdit={() => {
                setSelected(item.id);
                setValues({ ...item });
                handleClickOpen();
              }}
              onDelete={() => {
                deleteReview.mutate(item.id, {
                  onSettled: () => {
                    setSelected(null);
                  },
                });
              }}
              selected
              key={item.id}
            />
          )}
          ListHeaderComponent={
            hasOrdered ? (
              <Grid
                container
                item
                xs={12}
                justify="flex-end"
                style={{ display: "flex" }}
              >
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={() => {
                      handleClickOpen();
                    }}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </Grid>
            ) : null
          }
        />
      </Grid>
      <Dialog open={open} onClose={handleClose} scroll="body" fullWidth>
        <DialogTitle>{selected ? "Edit" : "Add"} Review</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="title"
                name="title"
                label="Title"
                placeholder="Eg. Awesome build quality"
                fullWidth
                autoComplete="off"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title ? !!errors.title : false}
                helperText={touched.title ? errors.title : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={6}
                placeholder="Eg. Great deal at 44,900.00 thank you. This was the best deal just like the Black Friday sale or say the Boxing day sale"
                autoComplete="off"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description ? !!errors.description : false}
                helperText={touched.description ? errors.description : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                required
                error={touched.rating ? !!errors.rating : false}
                style={{ paddingLeft: 24, paddingBottom: 12 }}
                children="Rating"
                shrink={true}
                margin="dense"
              />
              <Rating
                size="large"
                id="rating"
                name="rating"
                value={values.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <ProductImages
                errors={errors}
                values={values}
                touched={touched}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                handleChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Box
            display="flex"
            flex={1}
            width={"100%"}
            justifyContent="flex-end"
            pt={1.6}
            pb={1.6}
          >
            <Button
              onClick={handleClose}
              color="primary"
              variant="text"
              size="medium"
              style={{ marginRight: 16 }}
            >
              Cancel
            </Button>

            <Button
              onClick={(e) => {
                if (!isValid) {
                }
                handleSubmit();
              }}
              size="medium"
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
