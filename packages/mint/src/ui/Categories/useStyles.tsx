import { alpha, createStyles, makeStyles } from '@material-ui/core'
import * as React from 'react'

export const useStyles = makeStyles(() =>
    createStyles({
        root: {
            backgroundColor: '#c4a289',
            padding: 24,
        },
        badge: {
            top: '-10px !important',
        },
        percentage: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            fontSize: 21,
            lineHeight: 21,
            fontWeight: 700,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
            alignItems: 'flex-start',
        },
        taglist: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        taglistitem: {
            background: '#ffffff',
            borderRadius: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0px -28px 100px rgba(15, 15, 15, 0.0666248)',
            marginRight: '8px',
            marginBottom: '8px',
            '&:hover': {
                backgroundColor: '#ffffff',
            },
            '&:focus': {
                backgroundColor: '#ffffff',
                boxShadow: `0px 0px 0px 4px#d0f20f33`,
            },
        },
        listPrimaryText: {},
        action: {
            top: '35%',
            padding: '1px 6px 1px 6px',
            borderRadius: 9,
            fontSize: 12,
            backgroundColor: alpha('#011632', 0.05),
        },
    })
)
