import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import {
    Badge,
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    fade,
    Grid,
    Button,
    TextField,
    ButtonGroup,
} from '@material-ui/core'
import { useFileUpload } from '../../libs/rock/file/useFileUpload'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import { LocalOffer, FileCopy } from '@material-ui/icons'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flex: 1,
        padding: theme.spacing(4, 2, 4, 2),
    },
    textInput: {
        cursor: 'text',
        padding: theme.spacing(15, 15, 15, 0),
    },
    header: {
        margin: 0,
        padding: theme.spacing(4, 4, 4, 4),
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    content: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    actions: {
        margin: 0,
        padding: theme.spacing(3, 6.4, 4, 6.4),
        display: 'flex',
        flexDirection: 'column',
    },
    titleInput: {
        ...theme.typography.h3,
        width: '100%',
        display: 'flex',
        marginBottom: '12px',
        fontSize: '30px',
        lineHeight: '41px',
        border: 'none',
        resize: 'none',
        caretColor: theme.palette.primary.main,
        padding: 0,
        margin: 0,
    },
    contentInput: {
        position: 'relative',
        ...theme.typography.body1,
        fontSize: '16px',
        overflow: 'auto',
    },

    embedInputTitle: {
        ...theme.typography.h2,
        display: 'flex',
        flex: 1,
        width: '100%',
        fontSize: '16px',
        lineHeight: '20px',
        border: 'none',
        resize: 'none',
        margin: 0,
        padding: 0,
        '&::placeholder': {
            opacity: 0.5,
        },
    },
    embedInput: {
        ...theme.typography.subtitle2,
        display: 'flex',
        flex: 1,
        width: '100%',
        fontSize: '16px',
        lineHeight: '20px',
        border: 'none',
        resize: 'none',
        margin: 0,
        padding: 0,
        '&::placeholder': {
            // font-family: $regularFont,
            opacity: 0.5,
        },
    },
    avatar: {
        width: '32px',
        height: '32px',
    },
    headercontent: {
        padding: 0,
        margin: 0,
        width: '100%',
    },
    titleWrap: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '8px',
        marginRight: '16px',
        flex: 1,
    },
    title: {
        ...theme.typography.h4,
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '37px',
        textAlign: 'center',
        maxWidth: '500px',
        margin: '0 auto',
    },
    subtitle: {
        ...theme.typography.subtitle2,
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '12px',
        lineHeight: '16px',
    },
    subtext: {
        fontFamily: 'GalanoGrotesque-Regular, Arial',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '19px',
    },
    contentTitle: {
        padding: theme.spacing(0.6, 0, 0.6, 0),
        ...theme.typography.h1,
        fontWeight: 600,
        fontSize: '22px',
        lineHeight: '30px',
    },
    contentMedia: {},
    contentDescriptionWrap: {
        padding: theme.spacing(1.2, 0, 1.2, 0),
    },
    contentDescription: {
        padding: theme.spacing(1.4, 0, 1.4, 0),
        ...theme.typography.subtitle2,
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '19px',
        letterSpacing: '-0.271429px',
    },
    actionsWrap: {
        borderTop: '1px solid #F0F3F6',
        margin: 0,
        position: 'relative',
        padding: theme.spacing(1.6, 6.4, 1.6, 6.4),
    },
    headActionsWrap: {
        margin: 0,
        padding: 0,
    },
    tagBtn: {
        minWidth: '72px',
        height: '22px',
        background: '#16B7FF',
        marginRight: '8px',
        border: 'unset',
    },
    likeBtn: {
        height: '32px',
        width: '32px',
        padding: 0,
        margin: 0,
    },
    moreBtn: {
        height: '32px',
        width: '32px',
        padding: 0,
        margin: 0,
    },
    replyBtn: {
        height: '32px',
        width: '32px',
        padding: 0,
        margin: 0,
    },
    avatarWrap: {},
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
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    moreTags: {
        border: '1px solid #BDBDBD',
        minWidth: '23px',
        height: '23px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
    },
    moreTagsText: {
        color: '#BDBDBD',
        padding: theme.spacing(0.3, 0.5, 0.4, 0.4),
        fontSize: '12px',
    },
    closeBtn: {
        height: 24,
        width: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18,
        lineHeight: 0,
        borderRadius: '50%',
        background: '#ffffff !important',
        border: 'none',
        color: '#02783d',
        cursor: 'pointer',
        margin: 0,
        padding: 0,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    addbtn: {
        backgroundColor: '#0f0f0f',
        color: '#fff',
        minWidth: '120px',
        borderRadius: '25px',
        marginRight: '20px',
        '&:hover': {
            backgroundColor: fade('#0f0f0f', 0.8),
        },
        '.Mui-disabled': {},
        '&:disabled': {
            color: '#fff',
            boxShadow: 'none',
            backgroundColor: 'rgba(5, 5, 5, 0.735)',
        },
    },
    cancellbtn: {
        backgroundColor: '#fff',
        color: '#0f0f0f',
        minWidth: '120px',
        marginRight: '20px',
    },
    nextbtn: {},
    btnWrap: {},
    toolbarText: {
        fontSize: 15,
    },
    textEditor: {},
    badgeContainer: {
        ...theme.typography.body1,
        top: '10%',
        width: 15,
        background: '#F6BB43',
        fontSize: 13,
        lineHeight: 0,
        padding: 0,
        margin: 0,
        color: '#fff',
        overflow: 'hidden',
    },
}))

function Actions({
    editor,
    values,
    classes,
    handleTagsClick,
    toolbarText,
    handleNext,
    setFieldValue,
}) {
    const imageUpload = useFileUpload({
        fileType: 'images',
        multiple: true,
        onSuccess: (files) => {
            setFieldValue('files', [...files, ...values.files])
            setText(files.url)
        },
    })

    const [text, setText] = useState('')
    const handleClose = () => {
        setText('')
    }
    const open = Boolean(text)
    return (
        <>
            <Dialog
                open={open}
                keepMounted={false}
                fullWidth
                onClose={handleClose}
                scroll="body"
                aria-labelledby="form-dialog-title"
            >
                <Box pl={1} pr={1}>
                    <DialogContent>
                        <Box pt={2} pb={2}>
                            <textarea value={text} readOnly />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Box display="flex">
                            <Button
                                className={classes.cancellbtn}
                                variant="text"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                        </Box>
                    </DialogActions>
                </Box>
            </Dialog>
            <Box display={'flex'} flex={1} width="100%">
                <Box
                    flex={1}
                    display={'flex'}
                    justifyContent="flex-start"
                    alignItems="center"
                    border="1px solid #ccc"
                    borderRadius="8px"
                    height="50px"
                    pl={2.2}
                    pr={0.8}
                >
                    <Box display={'flex'} flex={1}>
                        <Typography
                            className={classes.toolbarText}
                            variant="body1"
                        >
                            {toolbarText}
                        </Typography>
                    </Box>

                    <ButtonGroup>
                        <Badge
                            badgeContent={values.tags?.length || 0}
                            classes={{ badge: classes.badgeContainer }}
                        >
                            <Button
                                color="primary"
                                onClick={handleTagsClick}
                                style={{ width: '36px', height: '36px' }}
                            >
                                <LocalOffer />
                            </Button>
                        </Badge>
                        <Badge
                            badgeContent={values?.files?.length || 0}
                            classes={{ badge: classes.badgeContainer }}
                        >
                            <Button
                                color="primary"
                                onClick={imageUpload.open}
                                {...imageUpload.getRootProps}
                                style={{ width: '36px', height: '36px' }}
                            >
                                <input {...imageUpload.getInputProps()} />
                                <FileCopy />
                            </Button>
                        </Badge>
                    </ButtonGroup>
                </Box>
                <Box
                    ml={2}
                    display={'flex'}
                    justifyContent="flex-end"
                    alignItems="center"
                    className={classes.btnWrap}
                >
                    <Button
                        variant="contained"
                        // disabled={!isValid}
                        color="primary"
                        className={classes.nextbtn}
                        onClick={handleNext}
                        size="large"
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default function CreateContent({
    values,
    setFieldValue,
    handleNext,
    handleTagsClick,
    text = {
        header: {
            title: '',
        },
        slug: {
            id: 'slug',
            placeholder: '',
        },
        title: {
            id: 'title',
            placeholder: '',
        },
        description: {
            id: 'description',
            placeholder: '',
        },
        content: {
            id: 'content',
            placeholder: '',
        },
        toolbar: {
            text: '',
        },
    },
}) {
    const classes = useStyles()
    const editorRef = useRef(null)

    return (
        <Card classes={{ root: classes.root }}>
            <CardHeader
                title={
                    <Typography
                        component="span"
                        // eslint-disable-next-line react/no-children-prop
                        children={text.header.title}
                        className={classes.title}
                    />
                }
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            variant="outlined"
                            id={text.slug.id}
                            name={text.slug.id}
                            label="Slug"
                            onChange={(e) => {
                                setFieldValue('slug', e.target.value)
                            }}
                            value={values.slug}
                            className={classes.titleInput}
                            rowsMax={10}
                            size="medium"
                            aria-label={text.slug.placeholder}
                            placeholder={text.slug.placeholder}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            variant="outlined"
                            id={text.title.id}
                            name={text.title.id}
                            label="Title"
                            onChange={(e) => {
                                setFieldValue('title', e.target.value)
                            }}
                            value={values.title}
                            className={classes.titleInput}
                            rowsMax={10}
                            size="medium"
                            aria-label={text.title.placeholder}
                            placeholder={text.title.placeholder}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            multiline
                            variant="outlined"
                            id={text.description.id}
                            name={text.description.id}
                            label="Description"
                            onChange={(e) => {
                                setFieldValue('description', e.target.value)
                            }}
                            value={values.description}
                            className={classes.titleInput}
                            rowsMax={10}
                            size="medium"
                            aria-label={text.description.placeholder}
                            placeholder={text.description.placeholder}
                        />
                    </Grid>
                    <Grid item className={classes.textEditor} xs={12}>
                        <MDEditor
                            value={values.body}
                            onChange={(value) => {
                                setFieldValue('body', value)
                            }}
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Actions
                    editor={editorRef.current}
                    values={values}
                    toolbarText={text.toolbar.text}
                    setFieldValue={setFieldValue}
                    classes={classes}
                    handleNext={handleNext}
                    handleTagsClick={handleTagsClick}
                />
            </CardActions>
        </Card>
    )
}
