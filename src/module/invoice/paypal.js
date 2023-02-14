const axios = require("axios");

const createInvoice = async (amount, recipient, invoiceId, dueDate, itemList, shippingAddress) => {
        const requestBody = {
            intent: "sale",
            payer: {
                payment_method: "paypal"
            },
            transactions: [{
                amount: {
                    total: amount,
                    currency: "USD"
                },
                item_list: {
                    items: itemList,
                    shipping_address: shippingAddress
                },
                description: "Invoice for payment"
            }], redirect_urls: {
                return_url: "http://localhost:3000/return",
                cancel_url: "http://localhost:3000/cancel"
            },
            invoice_number: invoiceId,
            invoice_date: new Date(),
            due_date: dueDate,
            billing_info: [{
                email: recipient
            }]
        };


        try {
            const response = await axios.post("https://api.sandbox.paypal.com/v1/invoicing/invoices", requestBody, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer Access-Token"
                }
            });

            return response.data.links.find(link => link.rel === "approval_url").href;
        } catch (error) {
            console.error(error);
        }
    }
;

module.exports = {
    createInvoice
};
