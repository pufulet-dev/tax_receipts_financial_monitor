"use client";

import React from "react";
import { Space, Card, Row, Col, Typography, Input, DatePicker, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReceiptCard from "../ReceiptCard/ReceiptCard";
import styles from "./ReceiptsList.module.css";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;


interface ReceiptsListProps {
    receipts: any;
}

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


const ReceiptsList: React.FC<ReceiptsListProps> = ({ receipts }) => {

    console.log("received receipts in client:  ", receipts);

    return (
        <Space direction="vertical" className={styles.receiptsWrapper}>
            <Card className={styles.receiptsCard}>
                <Row>

                    {/* FILTER BAR */}
                    <Col span={6}>
                        <Card className={styles.filtersCard}>
                            <Title level={3}> Filters </Title>
                            <Text> Search by ID (keywords) </Text>
                            <Input 
                                prefix={<SearchOutlined />}
                                placeholder="Order ID"/>
                            <Text> Date Range </Text>
                            <RangePicker />
                            <Text> Price Range (MDL) </Text>
                            <Slider range={{ draggableTrack: true }} defaultValue={[0, 1000]} />
                        </Card>
                    </Col>

                    {/* RECEIPT CARDS */}
                    <Col span={18} style={{ display: "flex", flexDirection: "row", minHeight: 300, }}>
                        { receipts.map((item: ReceiptCardProps) => ( 
                            <ReceiptCard 
                                key={item.id}
                                id={item.id}
                                date={item.date}
                                total={item.total}
                                products={item.products}
                            />
                        )) }
                    </Col>
                </Row>
            </Card>
        </Space>
    );
}

export default  ReceiptsList;