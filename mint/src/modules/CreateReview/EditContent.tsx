import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  fade,
  TextareaAutosize,
  Button,
  TextField,
} from "@material-ui/core";
import { useFileUpload } from "../../libs/rock/file/useFileUpload";
import TextEditor, {
  getTotalCount,
  insertVideo,
  insertImage,
  insertEmbeds,
  isEmbedURL,
} from "../../ui/TextEditor";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 700,
    minHeight: 700,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    flex: 1,
  },
  textInput: {
    cursor: "text",
    padding: theme.spacing(0, 0, 0, 0),
  },
  header: {
    margin: 0,
    padding: theme.spacing(4.4, 6.4, 4.4, 6.4),
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: theme.spacing(0, 5.6, 0, 5.6),
    overflow: "auto",
  },
  actions: {
    margin: 0,
    padding: theme.spacing(3, 6.4, 4, 6.4),
    display: "flex",
    flexDirection: "column",
  },
  titleInput: {
    ...theme.typography.h3,
    width: "100%",
    display: "flex",
    marginBottom: "12px",
    fontSize: "30px",
    lineHeight: "41px",
    border: "none",
    color: "#131415",
    resize: "none",
    caretColor: theme.palette.primary.main,
    padding: 0,
    margin: 0,
  },
  contentInput: {
    position: "relative",
    ...theme.typography.body1,
    fontSize: "16px",
  },

  embedInputTitle: {
    ...theme.typography.h2,
    display: "flex",
    flex: 1,
    width: "100%",
    fontSize: "16px",
    lineHeight: "20px",
    border: "none",
    color: "#131415",
    resize: "none",
    margin: 0,
    padding: 0,
    "&::placeholder": {
      color: "#292c2e",
      // font-family: $regularFont,
      opacity: 0.5,
    },
  },
  embedInput: {
    ...theme.typography.subtitle2,
    display: "flex",
    flex: 1,
    width: "100%",
    fontSize: "16px",
    lineHeight: "20px",
    border: "none",
    color: "#131415",
    resize: "none",
    margin: 0,
    padding: 0,
    "&::placeholder": {
      color: "#292c2e",
      // font-family: $regularFont,
      opacity: 0.5,
    },
  },
  avatar: {
    width: "32px",
    height: "32px",
  },
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
    ...theme.typography.h4,
    fontWeight: 600,
    fontSize: "26px",
    lineHeight: "37px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "0 auto",
  },
  subtitle: {
    ...theme.typography.subtitle2,
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: fade("#131415", 0.5),
  },
  subtext: {
    fontFamily: "GalanoGrotesque-Regular, Arial",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "19px",
    color: "#ADADAD",
  },
  contentTitle: {
    padding: theme.spacing(0.6, 0, 0.6, 0),
    ...theme.typography.h1,
    fontWeight: 600,
    fontSize: "22px",
    lineHeight: "30px",
    color: "#131415",
  },
  contentMedia: {},
  contentDescriptionWrap: {
    padding: theme.spacing(1.2, 0, 1.2, 0),
  },
  contentDescription: {
    padding: theme.spacing(1.4, 0, 1.4, 0),
    ...theme.typography.subtitle2,
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "19px",
    letterSpacing: "-0.271429px",
    color: fade("#131415", 0.5),
  },
  actionsWrap: {
    borderTop: "1px solid #F0F3F6",
    margin: 0,
    position: "relative",
    padding: theme.spacing(1.6, 6.4, 1.6, 6.4),
  },
  headActionsWrap: {
    margin: 0,
    padding: 0,
  },
  tagBtn: {
    minWidth: "72px",
    height: "22px",
    background: "#16B7FF",
    marginRight: "8px",
    border: "unset",
  },
  likeBtn: {
    height: "32px",
    width: "32px",
    padding: 0,
    margin: 0,
  },
  moreBtn: {
    height: "32px",
    width: "32px",
    padding: 0,
    margin: 0,
  },
  replyBtn: {
    height: "32px",
    width: "32px",
    padding: 0,
    margin: 0,
  },
  avatarWrap: {

  },
  actionBtn: {
    marginRight: 0,
    padding: 0,
    margin: 0,
  },
  collapseContainer: {
    padding: 0,
    margin: 0,
  },
  repliesContentRoot: {
    padding: 0,
    margin: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  moreTags: {
    border: "1px solid #BDBDBD",
    minWidth: "23px",
    height: "23px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    cursor: "pointer",
  },
  moreTagsText: {
    color: "#BDBDBD",
    padding: theme.spacing(0.3, 0.5, 0.4, 0.4),
    fontSize: "12px",
  },
  closeBtn: {
    height: 24,
    width: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 18,
    lineHeight: 0,
    borderRadius: "50%",
    background: "#ffffff !important",
    border: "none",
    color: "#02783d",
    cursor: "pointer",
    margin: 0,
    padding: 0,
    position: "absolute",
    top: 20,
    right: 20,
  },
  addbtn: {
    backgroundColor: "#000",
    color: "#fff",
    minWidth: "120px",
    borderRadius: "25px",
    marginRight: "20px",
    "&:hover": {
      backgroundColor: fade("#000", 0.8),
    },
    ".Mui-disabled": {},
    "&:disabled": {
      color: "#fff",
      boxShadow: "none",
      backgroundColor: "rgba(5, 5, 5, 0.735)",
    },
  },
  cancellbtn: {
    backgroundColor: "#fff",
    color: "#000",
    minWidth: "120px",
    marginRight: "20px",
  },
  nextbtn: {

  },
  btnWrap: {

  },
  toolbarText: {
    fontSize: 15,
  },
  badgeContainer: {
    ...theme.typography.body1,
    top: "10%",
    width: 15,
    background: "#F6BB43",
    fontSize: 13,
    lineHeight: 0,
    padding: 0,
    margin: 0,
    color: "#fff",
    overflow: "hidden",
  },
}));

function Actions({
  editor,
  values,
  classes,
  handleTagsClick,
  toolbarText,
  handleNext,
}) {
  const imageUpload = useFileUpload({
    multiple: true,
    onSuccess: (files) => {
      // setFieldValue("images", [...files, ...values.images]);
      insertImage(editor, files);
    },
  });

  const videoUpload = useFileUpload({
    multiple: false,
    accept: ["video/*"],
    onSuccess: (files) => {
      // setFieldValue("docs", [...files, ...values.docs]);
      insertVideo(editor, files);
    },
  });

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLinkClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <Dialog
        open={open}
        keepMounted={false}
        fullWidth
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Box pt={2} pb={2} pl={1} pr={1}>
          <DialogContent>
            <Box pt={2} pb={2}>
              <TextField
                className={classes.embedInputTitle}
                value={title}
                placeholder={`Title`}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                id="name"
                type="text"
                variant="outlined"
              />
            </Box>
            <Box pt={2} pb={2}>
              <TextField
                variant="outlined"
                className={classes.embedInput}
                value={text}
                placeholder={`Add link url`}
                onChange={(e) => setText(e.target.value)}
                autoFocus
                id="name"
                type="text"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box display="flex">
              <Button
                className={classes.cancellbtn}
                variant="text"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                disabled={!text || !isEmbedURL(text)}
                className={classes.addbtn}
                variant="contained"
                onClick={(e) => {
                  if (insertEmbeds(editor, [{ mediaUrl: text, title }])) {
                    setText("");
                    handleClose();
                  } else {

                  }
                }}
              >
                Add
              </Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
      <Box display={"flex"} flex={1} width="100%">
        <Box
          flex={1}
          display={"flex"}
          justifyContent="flex-start"
          alignItems="center"
          border="2px solid #efefef"
          borderRadius="100px"
          height="50px"
          pl={2.2}
          pr={0.8}
        >
          <Box display={"flex"} flex={1}>
            <Typography className={classes.toolbarText} variant="body1">
              {toolbarText}
            </Typography>
          </Box>

          <Box>
            <Badge
              badgeContent={values.tags?.length || 0}
              classes={{ badge: classes.badgeContainer }}
            >
              <Button
                className="gradient-btn-tags"
                onClick={handleTagsClick}
                style={{ width: "36px", height: "36px" }}
              >
                <Image
                  src={"/images/icons/dashboard/tag.svg"}
                  quality={1}
                  height={18}
                  width={18}
                />
              </Button>
            </Badge>
            {/* This Badge is commented to hide the code button in add experiece modal */}
            {/* <Badge
							badgeContent={getTotalCount(values.content, "embed") || 0}
							classes={{badge: classes.badgeContainer}}
						>
							<GradiantButton
								className="gradient-btn-links"
								onClick={handleLinkClick}
								style={{width: "36px", height: "36px"}}
							>
								<Image
									src={"/images/icons/dashboard/links.svg"}
									quality={1}
									height={18}
									width={18}
								/>
							</GradiantButton>
						</Badge> */}
            <Badge
              badgeContent={getTotalCount(values.content, "image") || 0}
              classes={{ badge: classes.badgeContainer }}
            >
              <Button
                className="gradient-btn-media"
                onClick={imageUpload.open}
                {...imageUpload.getRootProps}
                style={{ width: "36px", height: "36px" }}
              >
                <input {...imageUpload.getInputProps()} />
                <Image
                  src={"/images/icons/dashboard/img.svg"}
                  quality={1}
                  height={18}
                  width={18}
                />
              </Button>
            </Badge>
            <Badge
              badgeContent={getTotalCount(values.content, "video") || 0}
              classes={{ badge: classes.badgeContainer }}
            >
              <Button
                className="gradient-btn-video"
                style={{ width: "36px", height: "36px", paddingLeft: "2px" }}
                onClick={videoUpload.open}
                {...videoUpload.getRootProps}
              >
                <input {...videoUpload.getInputProps()} />
                <Image
                  src={"/images/icons/dashboard/video.svg"}
                  quality={1}
                  height={18}
                  width={18}
                />
              </Button>
            </Badge>
          </Box>
        </Box>
        <Box
          ml={2}
          display={"flex"}
          justifyContent="flex-end"
          alignItems="center"
          className={classes.btnWrap}
        >
          <Button
            variant="contained"
            // disabled={!isValid}
            className={classes.nextbtn}
            onClick={handleNext}
            size="medium"
          >
            <Typography variant={"caption"}>Next</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default function CreateContent({
  values,
  setFieldValue,
  // handleChange,
  onCloseHandler,
  handleNext,
  isValid,
  setFieldError,
  isLoading,
  handleTagsClick,
  text = {
    header: {
      title: "Share your experience",
    },
    title: {
      id: "title",
      placeholder: "Title of your experience",
    },
    content: {
      id: "content",
      placeholder: "Start writing here",
    },
    toolbar: {
      text: "Add to your experience",
    },
  },
}) {
  const classes = useStyles();
  const editorRef = useRef(null);

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
          <Typography
            component="span"
            children={text.header.title}
            className={classes.title}
          />
        }
      />
      <CardContent className={classes.content}>
        <Box display="flex" width="100%" pt={2.4}>
          <TextField
            multiline
            variant="outlined"
            id={text.title.id}
            name={text.title.id}
            label="Title"
            onChange={(e) => {
              setFieldValue("title", e.target.value);
            }}
            value={values.title}
            className={classes.titleInput}
            rowsMax={10}
            aria-label={text.title.placeholder}
            placeholder={text.title.placeholder}
          />
        </Box>
        <Box display="flex" width="100%" height="100%">
          <TextEditor
            ref={editorRef}
            key={text.content.id}
            aria-label={text.content.placeholder}
            placeholder={text?.content?.placeholder || ''}
            className={classes.contentInput}
            onChange={(value) => {
              setFieldValue("content", value);
            }}
            value={values.content}
          />
        </Box>
      </CardContent>
      <CardActions className={classes.actions}>
        <Actions
          editor={editorRef.current}
          values={values}
          toolbarText={text.toolbar.text}
          setFieldValue={setFieldValue}
          classes={classes}
          isValid={isValid}
          handleNext={handleNext}
          handleTagsClick={handleTagsClick}
        />
      </CardActions>
    </Card>
  );
}
