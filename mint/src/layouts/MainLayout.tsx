import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import * as React from "react";
import clsx from "clsx";
import { ClassNameMap } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    background: theme.palette.background.default,
    minHeight: "100vh",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
    flex: 1,
  },
  top: {
    display: "flex",
    alignItems: "center",
    width: '100%',
    padding: 24,
  },
  // middle part
  content: {},
  bottom: {
    display: "flex",
    flexDirection: "column",
  },
  left: {
    position: "sticky",
    height: "100%",
    top: 64,
    display: "flex",
    flexDirection: "column",
    padding: 24,
  },
  main: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexWrap: "wrap",
    padding: 24,
  },
  right: {
    position: "sticky",
    height: "100%",
    top: 64,
    display: "flex",
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: 24,
    [theme.breakpoints.down('md')]: {
      flexBasis: '33%',
      maxWidth: '33%',
    }
  },
}));

interface ILayout {
  children?: React.ReactChild;
  header?: React.ReactChild;
  footer?: React.ReactChild;
  left?: React.ReactChild;
  right?: React.ReactChild;
  top?: React.ReactChild;
  bottom?: React.ReactChild;
  classes?: Partial<
    ClassNameMap<
      | "container"
      | "bottom"
      | "content"
      | "left"
      | "right"
      | "top"
      | "wrapper"
      | "main"
    >
  >;
}

export function MainLayout({
  children,
  header,
  footer,
  left,
  right,
  bottom,
  top,
  classes: cls,
}: ILayout) {
  const classes = useStyles();
  return (
    <Grid
      className={clsx(cls?.wrapper, classes.wrapper)}
      container
      component="main"
    >
      {header ? header : null}

      <Container className={clsx(cls?.container, classes.container)}>
        {top && (
          <Grid
            className={clsx(cls?.top, classes.top)}
            component="section"
            xs={12}
          >
            {top}
          </Grid>
        )}

        <Grid container className={clsx(cls?.content, classes.content)}>
          {left && (
            <Grid
              className={clsx(cls?.left, classes.left)}
              component="aside"
              xs={3}
            >
              {left}
            </Grid>
          )}

          {children && (
            <Grid
              className={clsx(cls?.main, classes.main)}
              item
              xs
              component="section"
            >
              {children}
            </Grid>
          )}

          {right && (
            <Grid
              className={clsx(cls?.right, classes.right)}
              component="aside"
              xs={3}
            >
              {right}
            </Grid>
          )}
        </Grid>

        {bottom && (
          <Grid
            className={clsx(cls?.bottom, classes.bottom)}
            component="section"
          >
            {bottom}
          </Grid>
        )}
      </Container>

      {footer ? footer : null}
    </Grid>
  );
}
