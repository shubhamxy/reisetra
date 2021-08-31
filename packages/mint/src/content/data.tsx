export const FooterLinks = [
    {
        headerTitle: 'Shopping',
        nav: [
            {
                to: '/products?sort=bestselling',
                title: 'Top Selling',
            },
            {
                to: '/products?sort=new',
                title: 'New Arrivals',
            },
            {
                to: '/products?sort=trending',
                title: 'Trending',
            },
            {
                to: '/products?sort=relevant',
                title: 'Most Popular',
            },
        ],
    },
    {
        headerTitle: 'Resources',
        nav: [
            {
                to: '/about',
                title: 'About us',
            },
            {
                to: '/stories',
                title: 'Stories',
            },
            {
                to: '/support',
                title: 'Support',
            },
        ],
    },
    {
        headerTitle: 'Quick Links',
        nav: [
            {
                to: '/shipping',
                title: 'Shipping',
            },
            {
                to: '/terms',
                title: 'Terms',
            },
            {
                to: '/privacy',
                title: 'Privacy',
            },
        ],
    },
]

export const SectionFormData = {
    description:
        'Answer a few questions and we’ll help you find the products which best suits your preferences',
    actions: [
        {
            label: 'Get Started',
        },
        {
            label: 'Dismiss',
        },
    ],
    formTitle: 'Help us understand your needs',
    form: [
        {
            type: 'text-feild',
            id: 'Who are your shopping for?',
            label: 'Who are your shopping for?',
            name: 'Who are your shopping for?',
            props: {
                size: 'medium',
                multiline: true,
            },
        },
        {
            type: 'text-feild',
            id: 'What were you looking for?',
            label: 'What were you looking for?',
            name: 'What were you looking for?',
            props: {
                size: 'medium',
                multiline: true,
            },
        },
        {
            type: 'text-feild',
            id: 'Did you get what you were looking for?',
            label: 'Did you get what you were looking for?',
            name: 'Did you get what you were looking for?',
            props: {
                size: 'medium',
                multiline: true,
            },
        },
        {
            type: 'select',
            id: 'Are you going to return later?',
            label: 'Are you going to return later?',
            name: 'Are you going to return later?',
            props: {
                size: 'medium',
            },
            menuItems: [
                {
                    id: 'yes',
                    label: 'Yes',
                    value: 'Yes',
                },
                {
                    id: 'no',
                    label: 'No',
                    value: 'No',
                },
                {
                    id: 'maybe',
                    label: 'Maybe',
                    value: 'Maybe',
                },
            ],
        },
        {
            type: 'select',
            id: 'What led you to visit our website?',
            label: 'What led you to visit our website?',
            name: 'What led you to visit our website?',
            props: {
                size: 'medium',
            },
            menuItems: [
                {
                    id: 'Researching products information',
                    label: 'Researching products information',
                    value: 'Researching products information',
                },
                {
                    id: 'Interested in buying products',
                    label: 'Interested in buying products',
                    value: 'Interested in buying products',
                },
                {
                    id: 'Looking for contact information',
                    label: 'Looking for contact information',
                    value: 'Looking for contact information',
                },
                {
                    id: 'Know more about the company',
                    label: 'Know more about the company',
                    value: 'Know more about the company',
                },
                {
                    id: 'Other',
                    label: 'Other',
                    value: 'Other',
                },
            ],
        },
        {
            type: 'text-feild',
            id: 'Please let us know how we can improve your experience.',
            label: 'Please let us know how we can improve your experience.',
            name: 'Please let us know how we can improve your experience.',
            props: {
                size: 'medium',
                multiline: true,
                rows: 5,
            },
        },
        {
            type: 'ratings',
            id: 'On a scale of 1-10, how likely are you to recommend us to your friend or colleague?',
            label: 'On a scale of 1-10, how likely are you to recommend us to your friend or colleague?',
            name: 'On a scale of 1-10, how likely are you to recommend us to your friend or colleague?',
            props: {
                size: 'medium',
                multiline: true,
                rows: 5,
            },
        },
    ],
    formActions: [
        {
            label: 'Cancel',
        },
        {
            label: 'Submit',
        },
    ],
}
