"use client";

import React from "react";
import { Card, Row, Col, Typography, Divider, Space } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'; // for date formatting
import styles from "./ReceiptCard.module.css";

const { Title, Text } = Typography;


interface productsProps {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface ReceiptCardProps {
    id: number,
    date: Date,
    total: number,
    products: Array<productsProps>,
}

const ReceiptCard: React.FC<ReceiptCardProps> = ({ id, date, total, products }) => {


    return (
        <Card key={id} className={styles.receiptCardWrapper} style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 300, }}>
            <Row className={styles.receiptInfoLine}>
                <Col>
                    <Text type="secondary"> <DollarOutlined/> Receipt </Text>
                </Col>
                <Col>
                    <Text type="secondary"> {dayjs(date).format('YYYY-MM-DD HH:mm:ss')} </Text>
                </Col>
            </Row>
            <Row style={{ margin: "10px 0", }}>
                <Text type="secondary"> Order ID: {id} </Text>
            </Row>
            <div style={{ flexGrow: 1, }}>
                {products.map((product: any) => (
                    <Row key={product.id} className={styles.receiptInfoLine}>
                        <Col>
                            <Text> 
                                {product.name} 
                                <Text type="secondary"> x {product.quantity} </Text>
                            </Text>
                        </Col>
                        <Col>
                            <Text> MDL {product.price.toFixed(2)} </Text>
                        </Col>
                    </Row>
                ))}
            </div>
            <Divider />
            <Row className={styles.receiptInfoLine} >
                <Col>
                    <Text> Total Amount </Text>
                </Col>
                <Col>
                    <Title level={4}> MDL {total.toFixed(2)} </Title>
                </Col>
            </Row>
        </Card>
    );
}

export default ReceiptCard;