import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  fade,
  Grid,
  InputBase,
  Button,
  Chip,
  List,
  ButtonGroup,
} from "@material-ui/core";
import { useDebouncedCallback } from "use-debounce";
import clsx from "clsx";
export const tags = [];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: 1,
  },
  header: {
    margin: 0,
    padding: theme.spacing(4.4, 6.4, 4.4, 0),
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: theme.spacing(0, 11.4, 0, 11.4),
  },
  actions: {
    margin: 0,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(0, 6.4, 4, 6.4),
  },
  avatar: {
    width: "32px",
    height: "32px",
  },
  avatarWrap: {},
  subtitle: {},
  headActionsWrap: {},
  headercontent: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "8px",
    marginRight: "16px",
    flex: 1,
  },
  title: {
    ...theme.typography.body1,
    fontWeight: 600,
    fontSize: "26px",
    lineHeight: "37px",
    textAlign: "center",
    letterSpacing: "-0.416667px",
    maxWidth: "500px",
    paddingLeft: 16,
  },
  searchContainer: {},
  search: {
    height: "50px",
    position: "relative",
    paddingLeft: 20,
    display: "flex",
    borderRadius: 24,
    backgroundColor: fade("#D8D8D8", 0.3),
    "&:hover": {
      backgroundColor: fade("#D8D8D8", 0.25),
    },
  },
  inputInput: {
    padding: theme.spacing(2, 3, 2, 1),
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {},
  },
  inputRoot: {
    width: "100%",
  },
  taglist: {
    display: "flex",
    flexWrap: "wrap",
    paddingTop: theme.spacing(1.6),
  },
  closeBtn: {},
  prevBtn: {},
  nextBtn: {},
  saveasdraft: {},
  btnWrap: {},
  backBtn: {},
  tagListContainer: {
    padding: 20,
  },
  tagList: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  tagListItem: {
    borderRadius: "48px",
    textAlign: "center",
    textTransform: "capitalize",
    justifyContent: "center",
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
  tagListItemSelected: {
    backgroundColor: theme.palette.text.primary,
    opacity: 0.7,
    boxShadow: `0px 0px 0px 4px#d0f20f33`,
  },
}));

function Actions({ isValid, classes, handleNext, handleGoBack, t }) {
  return (
    <Box
      display={"flex"}
      flex={1}
      width="100%"
      justifyContent="flex-end"
      alignItems="center"
      className={classes.btnWrap}
    >
      <ButtonGroup>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          className={classes.prevBtn}
          onClick={handleGoBack}
        >
         {t.actions.prevBtnText}
        </Button>
        <Button
          variant="contained"
          size="large"
          color="primary"
          disabled={!isValid}
          className={classes.nextBtn}
          onClick={handleNext}
        >
         {t.actions.nextBtnText}
        </Button>
      </ButtonGroup>
    </Box>
  );
}

export default function CreateExperience({
  values,
  setFieldValue,
  onCloseHandler,
  handleNext,
  handleSaveAsDraft,
  handleGoBack,
  isValid,
  isLoading,
  t = {
    actions: {
      saveBtnText: "Save as draft",
      nextBtnText: "Publish",
      prevBtnText: "Go Back",
    },
  },
}) {
  const classes = useStyles();
  const [tagList, setTagList] = useState(tags);
  const debounced = useDebouncedCallback((value) => {
    let filteredData = tags;
    if (value.length > 0) {
      filteredData = tags.filter((item) => {
        return Object.keys(item).some((key) =>
          item[key]
            ? String(item[key])
                .toLowerCase()
                .includes(String(value)?.toLowerCase())
            : false
        );
      });
    }
    setTagList(filteredData);
  }, 500);

  return (
    <Card classes={{ root: classes.root }}>
      <CardHeader
        classes={{
          root: classes.header,
          avatar: classes.avatarWrap,
          content: classes.headercontent,
          title: classes.titleWrap,
          subheader: classes.subtitle,
          action: classes.headActionsWrap,
        }}
        title={
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Button className={classes.backBtn} onClick={handleGoBack}>
              <Image src={"/images/arrow-back.svg"} height={16} width={40} />
            </Button>
            <Typography
              component="span"
              children={"Add relevant tags"}
              className={classes.title}
            />
          </Box>
        }
      />
      <CardContent className={classes.content}>
        <Box display="flex" width="100%" m={0}>
          <Grid item xs className={classes.searchContainer}>
            <Box className={classes.search}>
              <Image
                src={"/images/icons/search-gray.svg"}
                width={16}
                height={16}
              />
              <InputBase
                onChange={(e) => {
                  debounced(e.target.value);
                }}
                defaultValue={""}
                placeholder="Search for tags"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </Box>
            <Box display="flex" mt={"16px"} mb={"16px"} ml={"10px"}>
              <Typography variant={"body1"}>
                {values?.tags?.length || 0}
              </Typography>
              <Typography
                variant={"caption"}
                style={{ paddingLeft: "4px", fontSize: 16, lineHeight: 1.4 }}
              >
                selected
              </Typography>
            </Box>
          </Grid>
        </Box>
        <Box
          display="flex"
          width="100%"
          m={0}
          flexDirection="column"
          position="relative"
          mb={"16px"}
        >
          <List
            classes={{
              root: classes.tagList,
            }}
            disablePadding
          >
            {tagList.map((item, index) => {
              const value = values["tags"] as string[];
              const isSelected = values.tags.includes(item.text);
              return (
                <Chip
                  onClick={(e) => {
                    if (isSelected) {
                      setFieldValue("tags", [
                        ...value.filter((i) => i !== item.text),
                      ]);
                      return;
                    }
                    setFieldValue(
                      "tags",
                      Array.isArray(value)
                        ? [...value, item.text]
                        : ([item.text] as string[])
                    );
                  }}
                  key={index}
                  className={clsx(
                    classes.tagListItem,
                    isSelected ? classes.tagListItemSelected : ""
                  )}
                  label={
                    <Typography
                      style={{ fontSize: 14, lineHeight: 1 }}
                      variant="subtitle2"
                    >
                      {item.text}
                    </Typography>
                  }
                />
              );
            })}
          </List>
          <Box display="flex" mt={1.6} justifyContent="center">
            <Typography
              variant={"caption"}
              style={{ paddingLeft: "4px", fontSize: 16, lineHeight: 1.4 }}
            >
              {isLoading ? <CircularProgress size="20px" /> : ""}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" width="100%" m={0}></Box>
      </CardContent>
      <CardActions className={classes.actions}>
        <Actions
          t={t}
          classes={classes}
          isValid={isValid}
          // @ts-ignore
          handleSaveAsDraft={handleSaveAsDraft}
          handleNext={handleNext}
          handleGoBack={handleGoBack}
        />
      </CardActions>
    </Card>
  );
}
