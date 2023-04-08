export const roles = {
    subscriber: {
        can: ['readOwnProfile', 'updateOwnProfile', 'createOwnWishlist', 'deleteOwnWishlist', 'readProduct', 'readProductCategory', 'readProductSubCategory', 'createOwnOrder', 'deleteOwnOrder', 'readOwnOrder', 'readPayment']
    },

    farmer: {
        can: ['createOwnProduct', 'updateOwnProduct', 'deleteOwnProduct', 'createOwnOrder', 'readOwnOrder', 'deleteOwnOrder']
    },
    admin: {
        can: ['createUser','readOwnOrder', 'readUser', 'updateUser', 'deleteUser', 'createProduct', 'readProduct', 'updateProduct', 'deleteProduct', 'createProductCategory', 'readProductCategory', 'updateProductCategory', 'deleteProductCategory', 'createProductSubCategory', 'readProductSubCategory', 'updateProductSubCategory', 'deleteProductSubCategory', 'createOrder', 'readOrder', 'updateOrder', 'deleteOrder', 'createPayment', 'readPayment', 'updatePayment', 'deletePayment', 'createWishlist', 'readWishlist', 'updateWishlist', 'deleteWishlist', 'createAddress', 'readAddress', 'updateAddress', 'deleteAddress', 'createInvoice', 'readInvoice', 'updateInvoice', 'deleteInvoice', 'createShipment', 'readShipment', 'updateShipment', 'deleteShipment', 'createReport', 'readReport', 'updateReport', 'deleteReport', 'createRefund', 'readRefund', 'updateRefund', 'deleteRefund', 'createReview', 'readReview', 'updateReview', 'deleteReview', 'createNotification', 'readNotification', 'updateNotification', 'deleteNotification', 'createLog', 'readLog', 'updateLog', 'deleteLog', 'createSetting', 'readSetting', 'updateSetting', 'deleteSetting', 'createAnalytics', 'readAnalytics', 'updateAnalytics', 'deleteAnalytics']
    }
};