export const getCartFromLocalStorage = () => {
    let cart = [];
    if (typeof window !== 'undefined' && localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
    return cart;
};
