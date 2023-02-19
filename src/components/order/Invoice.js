import React from 'react';
import {Document, Page, Text, View, StyleSheet} from "@react-pdf/renderer";
import {Table, TableHeader, TableCell, TableBody, DataTableCell} from "@david.kucsai/react-pdf-table";

const Invoice = ({order}) => {
    const styles = StyleSheet.create({
        body: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        title: {
            fontSize: 24,
            textAlign: "center",
        },
        author: {
            fontSize: 12,
            textAlign: "center",
            marginBottom: 40,
        },
        subtitle: {
            fontSize: 18,
            margin: 12,
        },
        text: {
            margin: 12,
            fontSize: 14,
            textAlign: "justify",
        },
        image: {
            marginVertical: 15,
            marginHorizontal: 100,
        },
        header: {
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
        },
        footer: {
            padding: "100px",
            fontSize: 12,
            marginBottom: 20,
            textAlign: "center",
            color: "grey",
        },
        meta: {
            fontSize: 10,
            textAlign: "center",
            color: "grey",
        },
        pageNumber: {
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
        },
    });
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>~{new Date().toLocaleString()}~</Text>
                <Text style={styles.title}>Order invoice</Text>
                <Text style={styles.author}>Business Name</Text>
                <Text style={styles.subtitle}>Order Summery</Text>
                <Table>
                    <TableHeader>
                        <TableCell style={{padding: "5px"}}>Title</TableCell>
                        <TableCell style={{padding: "5px"}}>Price</TableCell>
                        <TableCell style={{padding: "5px"}}>Quantity</TableCell>
                        <TableCell style={{padding: "5px"}}>Brand</TableCell>
                        <TableCell style={{padding: "5px"}}>Color</TableCell>
                    </TableHeader>
                </Table>
                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={x => x.product.title} style={{padding: "5px"}}/>
                        <DataTableCell getContent={x => `KES ${x.product.price}`} style={{padding: "5px"}}/>
                        <DataTableCell getContent={x => x.count} style={{padding: "5px"}}/>
                        <DataTableCell getContent={x => x.product.brand} style={{padding: "5px"}}/>
                        <DataTableCell getContent={x => x.color} style={{padding: "5px"}}/>
                    </TableBody>
                </Table>
                <Text style={styles.text}>
                    <Text
                        style={styles.meta}>Date: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</Text>
                    <Text style={styles.meta}>Order id: {order.paymentIntent.id}</Text>
                    <Text style={styles.meta}>Order Number: {order.orderNumber}</Text>
                    <Text style={styles.meta}>Order Status: {order.orderStatus}</Text>
                    <Text style={styles.meta}>Total paid: {order.paymentIntent.amount}</Text>
                </Text>
                <Text style={styles.footer}>
                    ~Thank you for shopping with us~

                </Text>

            </Page>

        </Document>
    );
};

export default Invoice;