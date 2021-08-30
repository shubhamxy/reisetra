import {
    Box,
    Chip,
    fade,
    FormControl,
    Grid,
    InputLabel,
    List,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Typography,
} from '@material-ui/core'
import React from 'react'
import { MainLayout } from '../../layouts/MainLayout'
import { AppHeader } from '../../ui/Header'
import { Footer } from '../../ui/Footer'
import { ProductsFeed } from '../../ui/Feed/Feed'
import { Products } from '../../modules/Products'
import { ProductFilters } from '../../ui/ProductFilters'
import { useRouter } from 'next/router'
import { useBrands, useCategories, useTags } from '../../libs'
import clsx from 'clsx'
import { useDebounce } from 'use-debounce'
import { ShowCase } from '../../modules/ShowCase'

const useStyles = makeStyles((theme) => ({
    content: {
        paddingTop: 24,
        display: 'flex',
        flexDirection: 'column',
    },
    tagListContainer: {
        padding: 20,
        minHeight: '300px',
    },
    tagList: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    bottom: {
        width: '100%',
        paddingTop: 24,
    },
    tagListItem: {
        borderRadius: '48px',
        textAlign: 'center',
        textTransform: 'capitalize',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px -28px 100px rgba(15, 15, 15, 0.1)',
        marginRight: '8px',
        marginBottom: '8px',
        background: theme.palette.text.primary,
        color: theme.palette.background.paper,
        '&:hover': {
            backgroundColor: fade(theme.palette.text.primary, 0.8),
        },
        '&:focus': {
            backgroundColor: theme.palette.text.primary,
            boxShadow: `0px 0px 0px 4px#d0f20f33`,
        },
        '&.Mui-disabled': {
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
    products: {
        marginBottom: 12,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '300px',
    },
    productsFilter: {
        padding: 20,
    },
    sizeSelectContainer: {
        minWidth: 120,
    },
    top: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    right: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))

export type FilterT = {
    type: string
    title: string
    subtitle: string
    data: {
        label: string
        value: string
    }[]
}

function useHelper() {
    const router = useRouter()
    const query = router.query
    const categories = useCategories()
    const tags = useTags(
        query.category
            ? {
                  category: query.category,
              }
            : {}
    )
    const brands = useBrands(
        query.category
            ? {
                  category: query.category,
              }
            : {}
    )
    const sortBy: FilterT = {
        type: 'select',
        title: 'Sort',
        subtitle: 'Sort by',
        data: [
            {
                label: 'Most Relevant',
                value: 'relevant',
            },
            {
                label: 'Trending',
                value: 'trending',
            },
            {
                label: 'Best Selling',
                value: 'bestselling',
            },
            {
                label: 'New',
                value: 'new',
            },
        ],
    }

    const filters: {
        [key: string]: FilterT
    } = {
        category: {
            type: 'select',
            title: 'Categories',
            subtitle: 'Select a category',
            // @ts-ignore
            data: categories?.data?.data || [],
        },
        brands: {
            type: 'multiselect',
            title: 'Brands',
            subtitle: 'Select multiple brands',
            data: brands?.data?.data
                ? [
                      // @ts-ignore
                      ...brands?.data?.data?.map((item) => {
                          return {
                              label: item.name,
                              value: item.name,
                          }
                      }),
                  ]
                : [],
        },
        tags: {
            type: 'multiselect',
            title: 'Tags',
            subtitle: 'Select multiple tags',
            // @ts-ignore
            data: tags?.data?.data || [],
        },
        price: {
            type: 'range',
            title: 'Price',
            subtitle: 'Filter by price range',
            data: [],
        },
        rating: {
            type: 'rating',
            title: 'Ratings',
            subtitle: 'Filter by ratings range',
            data: [
                { value: '4', label: '& up' },
                { value: '3', label: '& up' },
                { value: '2', label: '& up' },
                { value: '1', label: '& up' },
            ],
        },
    }

    function setFieldValue(
        key: string,
        value: string | string[] | number | number[]
    ) {
        const routerObj = {
            query: router.query,
        }
        if (!value) {
            delete routerObj.query[key]
        } else {
            routerObj.query[key] = value as any
        }
        router.push(routerObj)
    }

    const values: {
        sort: string | string[]
        category: string
        brands: string[]
        price: number[]
        tags: string[]
        q: string
        rating: string
    } = {
        sort: query.sort || sortBy.data[0].value,
        category: (query.category as string) || '',
        // (filters?.category?.data ? filters.category?.data[0]?.value : ""),
        brands: Array.isArray(query.brands)
            ? query.brands.length > 0
                ? query.brands
                : []
            : query.brands
            ? [query.brands]
            : [],
        price: Array.isArray(query.price)
            ? query.price.length > 0
                ? [+query.price[0], +query.price[1]]
                : [0, +query.price]
            : [0, 100000],
        tags: Array.isArray(query.tags)
            ? query.tags.length > 0
                ? query.tags
                : []
            : query.tags
            ? [query.tags]
            : [],
        q: query.q ? (query.q as string) : '',
        rating: query.rating ? (query.rating as string) : undefined,
    }

    const [debouncedValues, { isPending }] = useDebounce(values, 1000)

    return {
        sortBy,
        filters,
        setFieldValue,
        values,
        debouncedValues,
        isLoading:
            isPending() ||
            !router.isReady ||
            categories.isLoading ||
            tags.isLoading,
    }
}

const ProductsPage = () => {
    const classes = useStyles()
    const {
        isLoading,
        sortBy,
        filters,
        setFieldValue,
        values,
        debouncedValues,
    } = useHelper()

    const Bottom = (
        <Grid item xs container className={classes.bottom}>
            <Grid item xs={12}>
                <Typography variant="h6">{'Recommended'}</Typography>
            </Grid>
            <Grid item xs={12}>
                <ShowCase filters={{ size: 3 }} />
            </Grid>
        </Grid>
    )

    return (
        <MainLayout
            classes={{
                left: classes.left,
                right: classes.right,
                top: classes.top,
            }}
            header={<AppHeader />}
            right={
                <Box style={{ minHeight: '400px', width: '100%' }}>
                    <ProductFilters
                        data={filters}
                        values={values}
                        setFieldValue={setFieldValue}
                    />
                    <ProductsFeed />
                </Box>
            }
            top={
                <Box style={{ width: '100%' }}>
                    <ProductFilters
                        data={filters}
                        values={values}
                        setFieldValue={setFieldValue}
                    />
                </Box>
            }
            footer={<Footer />}
        >
            <>
                <Paper className={classes.content}>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        className={classes.productsFilter}
                    >
                        <Box
                            display={'flex'}
                            flexDirection="row"
                            alignItems={'center'}
                            justifyContent="space-between"
                            pb={2.6}
                        >
                            <Box pt={0.6} pb={0.6}>
                                <Typography variant={'h5'}>
                                    {filters.category.data.find(
                                        (item) => item.label === values.category
                                    )?.label || ''}
                                </Typography>
                            </Box>
                            <FormControl
                                variant="outlined"
                                className={classes.sizeSelectContainer}
                            >
                                <InputLabel id="demo-simple-select-outlined-label">
                                    Sort
                                </InputLabel>
                                <Select
                                    variant="outlined"
                                    style={{ height: 40, overflow: 'hidden' }}
                                    fullWidth
                                    labelId="Sort"
                                    value={values.sort}
                                    onChange={(e) => {
                                        // setSortIndex(+e.target.value);
                                        setFieldValue(
                                            'sort',
                                            e.target.value as string
                                        )
                                    }}
                                    label="Sort"
                                >
                                    {sortBy.data?.map((item) => (
                                        <MenuItem
                                            key={item.label}
                                            value={item.value}
                                        >
                                            {item.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>

                    <Box className={classes.products}>
                        <Products
                            filters={debouncedValues}
                            enabled={!isLoading}
                        />
                    </Box>
                    {filters.tags.data.length > 0 && (
                        <Box
                            display={'flex'}
                            flexDirection={'column'}
                            className={classes.tagListContainer}
                        >
                            <Box
                                display={'flex'}
                                flexDirection="column"
                                alignItems={'flex-start'}
                                pb={2.6}
                            >
                                <Box pt={0.6} pb={0.6}>
                                    <Typography variant={'h5'}>
                                        Recommended Tags
                                    </Typography>
                                </Box>

                                <Typography
                                    variant={'subtitle2'}
                                    style={{ maxWidth: '90%', opacity: 0.6 }}
                                >
                                    Some recommended tags we think you may be
                                    interested in.
                                </Typography>
                            </Box>
                            <List
                                classes={{
                                    root: classes.tagList,
                                }}
                                disablePadding
                            >
                                {filters.tags.data.map((item, index) => {
                                    const value = values.tags as string[]
                                    const isSelected = values.tags.includes(
                                        item.label
                                    )
                                    return (
                                        <Chip
                                            onClick={() => {
                                                if (isSelected) {
                                                    setFieldValue('tags', [
                                                        ...value.filter(
                                                            (i) =>
                                                                i !== item.label
                                                        ),
                                                    ])
                                                    return
                                                }
                                                setFieldValue(
                                                    'tags',
                                                    Array.isArray(value)
                                                        ? [...value, item.label]
                                                        : ([
                                                              item.label,
                                                          ] as string[])
                                                )
                                            }}
                                            key={index}
                                            className={clsx(
                                                classes.tagListItem,
                                                isSelected
                                                    ? classes.tagListItemSelected
                                                    : ''
                                            )}
                                            label={
                                                <Typography
                                                    style={{
                                                        fontSize: 14,
                                                        lineHeight: 1,
                                                    }}
                                                    variant="subtitle2"
                                                >
                                                    {item.label}
                                                </Typography>
                                            }
                                        />
                                    )
                                })}
                            </List>
                        </Box>
                    )}
                </Paper>
                {Bottom}
            </>
        </MainLayout>
    )
}

export default ProductsPage
