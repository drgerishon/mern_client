import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default.jpg';
import { Card, Col, Descriptions, Row, Typography, Button } from 'antd';
const { Title } = Typography;

const ShowPaymentInfo = ({ order, showStatus = true }) => {
  return (
    <Card
      title={<Title level={4}>{`Order ${order.orderId}`}</Title>}
      extra={showStatus && <span>{order.orderStatus}</span>}
      className="mb-4"
    >
      <Descriptions>
        <Descriptions.Item label="Payment Status">
          {order.paymentStatus.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Currency">
          {order.currencyCode}
        </Descriptions.Item>
        <Descriptions.Item label="Payment">
          {order.paymentMethod.toUpperCase()}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {dayjs(order.orderDate).format('MMMM D, YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Amount">
          {order.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: `${order.currencyCode}`,
          })}
        </Descriptions.Item>
      </Descriptions>
      <Row gutter={16}>
        {order.products.map((item, index) => (
          <Col key={index} md={12} lg={6} className="mb-4">
            <Card
              cover={
                <img
                  alt={item.product.title}
                  src={defaultImage}
                  className="w-100"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              }
            >
              <Card.Meta
                title={item.product.title}
                description={
                  <Row>
                    <Col>
                      <strong>Count: </strong>
                      {item.count}
                    </Col>
                    <Col>
                      <strong>Price: </strong>
                      {item.product.price}
                    </Col>
                  </Row>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="end">
        <Link
          to={`/user/order/${order._id}`}
          state={{ order: order, from: '/user/history' }}
        >
          <Button type="primary" className="mr-2">
            View Order
          </Button>
        </Link>
        {order.shippingStatus === 'shipped' && (
          <Link to={`/user/order/${order._id}`}>
            <Button type="success">Track Shipment</Button>
          </Link>
        )}
      </Row>
    </Card>
  );
};

export default ShowPaymentInfo;
