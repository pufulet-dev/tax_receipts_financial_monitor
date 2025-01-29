"use client";

import React, { useState, useEffect } from "react";
import { Space, Card, Row, Col, Typography, Input, DatePicker, Slider, Button, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReceiptCard from "../ReceiptCard/ReceiptCard";
import { useRouter } from "next/navigation";
import styles from "./ReceiptsList.module.css";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;


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

interface ReceiptsListProps {
    receipts: any;
    currentPage: number;
}


const ReceiptsList: React.FC<ReceiptsListProps> = ({ receipts, currentPage }) => {

    console.log("received receipts in client:  ", receipts);

    const [page, setPage] = useState(currentPage);
    const router = useRouter();

    useEffect(() => {
        router.push(`/en/receipts?page=${page}`, undefined);
    }, [page, router]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0) {
            setPage(newPage); 
        }
    };

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
                    <Col span={18} style={{ display: "flex", flexDirection: "column", }}>
                        <Row>
                            { receipts.length 
                            ? receipts.map((item: ReceiptCardProps) => ( 
                                <ReceiptCard 
                                    key={item.id}
                                    id={item.id}
                                    date={item.date}
                                    total={item.total}
                                    products={item.products}
                                />
                            ))
                            : <Empty style={{ height: "100%", width: "100%", margin: "100px auto", }} /> }
                        </Row>

                        {/* PAGINATION SECTION */}
                        <Row justify="center" className={styles.paginationWrapper}>
                            <Button 
                                color="default" variant="link"
                                onClick={() => handlePageChange(page - 1)} 
                                disabled={page === 1}
                            >
                                Prev
                            </Button>
                            <Text className={styles.pageNumber}> {page} </Text>
                            <Button 
                                color="default" variant="link"
                                onClick={() => handlePageChange(page + 1)} 
                            >
                                Next
                            </Button>
                        </Row>
                    </Col>
                </Row>

                
            </Card>
        </Space>
    );
}

export default  ReceiptsList;