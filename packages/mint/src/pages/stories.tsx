import {
  Box,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { AppHeader } from "../ui/Header";
import { Footer } from "../ui/Footer";
import HeroCard from "../ui/HeroCard";
import { config, useAuthState } from "../libs";
import { useStories } from "../libs/rock/stories";
import { useRouter } from "next/router";
import { GridItem } from "../modules/Stories";
import GridList from "../ui/List/GridList";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
  },
  left: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const StoriesPage = () => {
  const pageMeta = {
    title: "Stories",
    description: "",
    url: `${config.clientUrl}/stories`,
  };
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();
  const authState = useAuthState();
  const {} = authState;

  const router = useRouter();
  const query = useStories(router.query, true);

  useEffect(() => {
    if (
      authState.isHydrated === true &&
      (authState.isAuthenticated === false ||
        (authState.user && authState.user.role !== "ADMIN"))
    ) {
      router.push("/login");
    }
  }, [authState]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <MainLayout
      classes={{
        left: classes.left,
        right: classes.right,
      }}
      top={
        <HeroCard
          data={{
            title: pageMeta.title,
            subtitle: pageMeta.description,
            backgroundImage: '/images/hero.jpeg',
          }}
          // actions={
          //   <Box>
          //     <Button href="/" color="secondary" variant="contained">
          //       Go Back
          //     </Button>
          //   </Box>
          // }
        />
      }
      header={<AppHeader />}
      footer={<Footer />}
    >
      <GridList
        query={query}
        renderItem={({ item, index }) => (
          <GridItem
            {...item}
            showDescription
            onClick={() => {
              window.open(`${config.clientUrl}/story/${item.id}`);
            }}
            key={item.id}
            styleIndex={index}
          />
        )}
      />
    </MainLayout>
  );
};

export default StoriesPage;
