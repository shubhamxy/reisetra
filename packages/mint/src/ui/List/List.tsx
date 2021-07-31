import React from "react";
import {
  Grid,
  List as MaterialList,
  ListItem as MaterialListItem,
} from "@material-ui/core";
import { InfiniteData } from "react-query";
import { DataT, ISuccessResponse } from "../../libs";
import clsx from "clsx";

interface ListProps {
  classes?: Record<string, string>;
  variant: "infinite" | "default";
  isLoading?: boolean;
  isEmpty?: boolean;
  ListLoadingComponent?: any;
  ListHeaderComponent?: any;
  ListHeaderComponentProps?: any;
  ListFooterComponent?: any;
  ListFooterComponentProps?: any;
  ItemSeparatorComponent?: any;
  ItemSeparatorComponentProps?: any;
  data?: InfiniteData<ISuccessResponse<DataT>>;
  renderItem?: any;
  ListEmptyComponent?: any;
  ListEmptyComponentProps?: any;
  keyExtractor?: Function;
  listItemDivider?: boolean;
  listProps?: any;
  listItemProps?: any;
}

export function List(props: ListProps) {
  const {
    classes = {},
    variant = "default",
    isLoading = false,
    isEmpty = false,
    ListLoadingComponent,
    ListHeaderComponent,
    ListFooterComponent,
    ItemSeparatorComponent,
    data,
    renderItem,
    listItemDivider = false,
    ListEmptyComponent,
    keyExtractor = (data, index) => {
      return data.id || data.key || index;
    },
    listProps = {},
    listItemProps = {},
  } = props;

  if (variant === "infinite") {
    return (
      <Grid
        container
        className={classes.root}
        justify="center"
      >
        {ListHeaderComponent && (
          <Grid item xs={12} className={classes.header}>
            {ListHeaderComponent}
          </Grid>
        )}
        {(data?.pages?.[0]?.data === undefined ||
          data?.pages?.[0]?.meta?.totalCount === 0) &&
          !isLoading && (
            <Grid item className={classes.empty} xs={12}>
              {ListEmptyComponent}
            </Grid>
          )}
        <Grid item xs={12}>
          <MaterialList
            className={clsx(classes.list, "scrollbar")}
            disablePadding
            {...listProps}
          >
            {data?.pages?.map(
              (page: ISuccessResponse<any>, pageIndex: number) =>
                page.data?.map((item, index) => (
                  //@TODO fix the type ???
                  <MaterialListItem
                    disableGutters
                    className={classes.listItem}
                    key={keyExtractor(item, pageIndex + "-" + index)}
                    divider={listItemDivider}
                    {...listItemProps}
                  >
                    {renderItem({ item, index })}
                    {!(
                      pageIndex === data.pages.length - 1 &&
                      index === page.data.length - 1
                    ) &&
                      ItemSeparatorComponent &&
                      ItemSeparatorComponent}
                  </MaterialListItem>
                ))
            )}
          </MaterialList>
        </Grid>

        {isLoading && ListLoadingComponent && (
          <Grid item xs={12}>
            {ListLoadingComponent}
          </Grid>
        )}
        {!isLoading && ListFooterComponent && (
          <Grid item xs={12}>
            {ListFooterComponent}
          </Grid>
        )}
      </Grid>
    );
  } else {
    return (
      <Grid container className={classes.root} justify="flex-start">
        {ListHeaderComponent && (
          <Grid
            item
            xs={12}
            className={classes.header}
            style={{
              alignSelf: "flex-start",
              position: "sticky",
              top: -1,
              zIndex: 1000,
            }}
          >
            {ListHeaderComponent}
          </Grid>
        )}
        <Grid item xs={12}>
          {ListEmptyComponent && !isLoading && data && data["length"] === 0 && (
            <Grid item xs={12} className={classes.empty}>
              {ListEmptyComponent}
            </Grid>
          )}
          {Array.isArray(data) && data.length > 0 ? (
            <MaterialList
              className={clsx(classes.list, "scrollbar")}
              {...listProps}
            >
              {data.map((item, index) => (
                <MaterialListItem
                  className={classes.listItem}
                  key={keyExtractor(item, index)}
                  divider={listItemDivider}
                  disableGutters
                  {...listItemProps}
                >
                  {renderItem({ item, index })}
                  {!(index === data.length - 1) &&
                    ItemSeparatorComponent &&
                    ItemSeparatorComponent}
                </MaterialListItem>
              ))}
            </MaterialList>
          ) : null}
        </Grid>
        {isLoading && ListLoadingComponent && (
          <Grid item xs={12} style={{ alignSelf: "flex-end" }}>
            {ListLoadingComponent}
          </Grid>
        )}
        {!isLoading && ListFooterComponent && (
          <Grid
            item
            xs={12}
            className={classes.footer}
            style={{ alignSelf: "flex-end", position: "sticky", bottom: 0 }}
          >
            {ListFooterComponent}
          </Grid>
        )}
      </Grid>
    );
  }
}
