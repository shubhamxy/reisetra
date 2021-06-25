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
    ListEmptyComponent,
    keyExtractor = (data, index) => {
      return data.id || data.key || index;
    },
  } = props;

  if (variant === "infinite") {
    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        direction="column"
      >
        {ListHeaderComponent && <Grid item>{ListHeaderComponent}</Grid>}
        {(data?.pages?.[0]?.data === undefined ||
          data?.pages?.[0]?.meta?.totalCount === 0) &&
          !isLoading && <Grid item>{ListEmptyComponent}</Grid>}
        <Grid item xs={12} style={{width: '100%'}}>
          <MaterialList className={clsx(classes.list, "scrollbar")} disablePadding>
            {data?.pages?.map((page: ISuccessResponse<any>, pageIndex: number) =>
              page.data?.map((item, index) => (
                //@TODO fix the type ???
                <MaterialListItem
                  disableGutters
                  key={keyExtractor(item, pageIndex + "-" + index)}
                >
                  {renderItem({ item, index })}
                  {!(
                    pageIndex === data.pages.length - 1 &&
                    index === page.data.length - 1
                  ) &&
                    ItemSeparatorComponent && ItemSeparatorComponent}
                </MaterialListItem>
              ))
            )}
          </MaterialList>
        </Grid>
        {isLoading && ListLoadingComponent && (
          <Grid item>{ListLoadingComponent}</Grid>
        )}
        {!isLoading && ListFooterComponent && (
          <Grid item>{ListFooterComponent}</Grid>
        )}
      </Grid>
    );
  } else {
    return (
      <Grid container className={classes.root}>
        {ListHeaderComponent && <Grid item>{ListHeaderComponent}</Grid>}
        {isEmpty === true && !isLoading && (
          <Grid item>{ListEmptyComponent}</Grid>
        )}
        <Grid item xs={12} style={{width: '100%'}}>
          {Array.isArray(data) && data.length > 0 ? (
            <MaterialList className={classes.list}>
              {data.map((item, index) => (
                <MaterialListItem key={keyExtractor(item, index)} divider={false} disableGutters>
                  {renderItem({ item, index })}
                  {!(index === data.length - 1) &&
                    ItemSeparatorComponent && ItemSeparatorComponent}
                </MaterialListItem>
              ))}
            </MaterialList>
          ) : null}
        </Grid>
        {isLoading && ListLoadingComponent && ListLoadingComponent}
        {!isLoading && ListFooterComponent && ListFooterComponent}
      </Grid>
    );
  }
}
