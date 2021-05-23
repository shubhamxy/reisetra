import React, { forwardRef } from "react";
import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import Image from "next/image";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
  },
  contentRoot: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  emtyResultText: {
    textAlign: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "32px",
    padding: theme.spacing(0, 8, 0, 8),
  },
  emtyResultSubtext: {
    ...theme.typography.body1,
    fontSize: "14px",
    color: "#667587",
    maxWidth: "400px",
    textAlign: "center",
    paddingBottom: "20px",
    lineHeight: "19px",
  },
  button: {
    margin: 0,
    height: "35px",
  },
}));

export function EmptyListComponent(props) {
  const {
    icon: Icon,
    imgProps,
    title,
    subtext,
    titleProps = {},
    subtextProps = {},
    buttonText,
    onButtonClick,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      flex={1}
      flexGrow={1}
      {...rest}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
      >
        {Icon ? (
          <Icon
            src={"/images/icons/dashboard/folder.svg"}
            height={180}
            width={180}
            objectFit={"contain"}
            {...imgProps}
          />
        ) : (
          <Image
            src={"/images/icons/dashboard/folder.svg"}
            height={180}
            width={180}
            objectFit={"contain"}
            {...imgProps}
          />
        )}

        <Typography
          variant={"h4"}
          className={classes.emtyResultText}
          {...titleProps}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className={classes.emtyResultSubtext}
          {...subtextProps}
        >
          {subtext}
        </Typography>
        {buttonText && (
          <Button
            onClick={onButtonClick}
            className={classes.button}
            variant="contained"
            type="button"
            color="primary"
          >
            <Typography variant={"subtitle2"}>{buttonText}</Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export const List = forwardRef(function (props: any, ref) {
  const {
    className,
    isLoading = false,
    isEmpty = false,
    ListLoadingComponent,
    ListHeaderComponent,
    ListHeaderComponentProps,
    ListFooterComponent,
    ListFooterComponentProps,
    ItemSeparatorComponent,
    ItemSeparatorComponentProps,
    data,
    renderItem,
    ListEmptyComponent = EmptyListComponent,
    ListEmptyComponentProps,
    keyExtractor = (data, index) => {
      return data.id || data._id || data.key || index;
    },
    classes: cls = {},
    style,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <ul className={clsx(cls.root, classes.root)} style={style}>
      {ListHeaderComponent && (
        <ListHeaderComponent {...ListHeaderComponentProps} />
      )}
      {isEmpty === true && !isLoading && (
        <ListEmptyComponent {...ListEmptyComponentProps} />
      )}
      {Array.isArray(data) && data.length > 0 ? (
        <Box className={clsx(cls.contentRoot, classes.contentRoot)}>
          {data.map((item, index) => (
            <li key={keyExtractor(item, index)}>
              {renderItem({ item, index, ...rest })}
              {!(index === data.length - 1) && ItemSeparatorComponent && (
                <ItemSeparatorComponent {...ItemSeparatorComponentProps} />
              )}
            </li>
          ))}
        </Box>
      ) : isEmpty === false &&
        data &&
        data.pages &&
        Array.isArray(data.pages) ? (
        <Box
          className={[cls.content ? cls.content : "", classes.contentRoot].join(
            " "
          )}
        >
          {data.pages.map((page: any, pageIndex) =>
            page?.data?.length > 0
              ? page.data.map((item, index) => (
                  <li key={keyExtractor(item, pageIndex + "-" + index)}>
                    {renderItem({ item, index, ...rest })}
                    {!(
                      pageIndex === data.pages.length - 1 &&
                      index === page.data.length - 1
                    ) &&
                      ItemSeparatorComponent && (
                        <ItemSeparatorComponent
                          {...ItemSeparatorComponentProps}
                        />
                      )}
                  </li>
                ))
              : null
          )}
        </Box>
      ) : null}
      {isLoading && ListLoadingComponent && <ListLoadingComponent />}
      {!isLoading && ListFooterComponent && (
        <ListFooterComponent {...ListFooterComponentProps} />
      )}
    </ul>
  );
});
