import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'
import { ImagePreview } from '../../ui/MediaPreview'

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
}))

export default function Summary({ values }) {
    const classes = useStyles()

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Summary
            </Typography>
            <List disablePadding>
                <Grid item>
                    <ImagePreview variant="grid" data={values.images} />
                </Grid>
                {Object.keys(values).map((key) =>
                    typeof values[key] === 'string' ? (
                        <ListItem className={classes.listItem} key={key}>
                            <ListItemText
                                primary={String(key).toLocaleUpperCase()}
                                secondary={values[key]}
                            />
                        </ListItem>
                    ) : Array.isArray(values[key]) &&
                      typeof values[key][0] === 'string' ? (
                        <ListItem className={classes.listItem} key={key}>
                            <ListItemText
                                primary={String(key).toLocaleUpperCase()}
                                secondary={values[key].join(', ')}
                            />
                        </ListItem>
                    ) : null
                )}
            </List>
        </React.Fragment>
    )
}
