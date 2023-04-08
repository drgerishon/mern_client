export const accountMenuItems = [
    {
        label: 'Orders',
        link: '/user/orders',
        icon: 'icon-park-outline:buy',
        condition: true, // Show when currentUser is true
    },
    {
        label: 'Inbox',
        link: '/inbox',
        icon: 'material-symbols:forward-to-inbox-outline',
        condition: true, // Show when currentUser is true
    },
    {
        label: 'Saved items',
        link: '/wishlist',
        icon: 'mdi:cards-heart-outline',
        condition: true, // Show when currentUser is true
    },
    {
        label: 'Login',
        link: '/auth/login',
        icon: 'material-symbols:logout',
        condition: false, // Show when currentUser is false
    },
    {
        label: 'Register',
        link: '/auth/register',
        icon: 'material-symbols:logout',
        condition: false, // Show when currentUser is false
    },
    {
        label: 'Sign out',
        icon: 'material-symbols:logout',
        action:  'LOGOUT_PLACEHOLDER',
        condition: true, // Show when currentUser is true
    },
];


