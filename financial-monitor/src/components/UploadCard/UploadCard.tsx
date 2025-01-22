"use client";

import React, { useState } from 'react';
import ReceiptForm from '../ReceiptForm/ReceiptForm';
import { Row, Col, Input, Typography, Button, Card, Space, Spin } from 'antd';
import { LinkOutlined, UploadOutlined, FormOutlined, InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import styles from "./UploadCard.module.css";

const { Text, Title } = Typography;
const { Dragger } = Upload;

const UploadCard: React.FC = () => {

    const [activeButton, setActiveButton] = useState(0);
    const [scrapeUrl, setScrapeUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const props = {
        name: 'file',
        multiple: true,
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const buttons = [
        {
            label: "Link",
            icon: <LinkOutlined />,
        },
        {
            label: "Photo",
            icon: <UploadOutlined />,
        },
        {
            label: "Form",
            icon: <FormOutlined />,
        },
    ];

    const handleButtonClick = (index: number) => {
        setActiveButton(index);
    };

    const handleWebScrapping = async () => {
        console.log("started web scrapping");
        const url = scrapeUrl;

        setLoading(true);

        try {
            const response = await fetch('/api/scrape', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ url }),  
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("scrapped data: ", data)
            } else {
              console.log("ERROR! fAILE to scrape")
            }
            setLoading(false);
          } catch (err: any) {
            console.log('Error during scraping: ' + err.message); 
            setLoading(false);
          } 
    };

    return (
        <Space direction="vertical" className={styles.cardWrapper}>
            <Card className={styles.card}>
                <Title level={4}>Upload Tax Receipt</Title>
                <Text type="secondary">Choose your preferred method to submit your tax receipt.</Text>

                <Row>
                    <Space.Compact direction="horizontal">
                        {buttons.map((button, index) => (
                            <Button
                                key={button.label}
                                type={activeButton === index ? 'primary' : 'default'}
                                icon={button.icon}
                                style={{ width: '200px', height: '30px' }}
                                onClick={() => handleButtonClick(index)}>
                                {button.label}
                            </Button>
                        ))}
                    </Space.Compact>
                </Row>

                {activeButton === 0 &&
                    <Space.Compact direction="vertical" style={{ marginTop: 20, width: "110%", }}>
                        <Row style={{ marginBottom: '20px' }}>
                            <Col span={24}>
                                <Text type="secondary">
                                    Please upload the mev.sfs.md link with your tax receipt to be processed.
                                </Text>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={18}>
                                <Input 
                                    size="small" 
                                    placeholder="https://"
                                    value={scrapeUrl}
                                    onChange={(event) => {setScrapeUrl(event?.target?.value || "")}} />
                            </Col>
                            <Col span={6}>
                                <Button type="primary">Process</Button>
                            </Col>
                        </Row>
                        {loading === true && <Spin />}
                    </Space.Compact>
                }
                {
                    activeButton === 1 &&
                    <Space.Compact direction="vertical" style={{ marginTop: 20 }}>
                        <Text type="secondary">
                            Please upload a photo of the QR code on your tax receipt.
                        </Text>
                        <Dragger {...props} style={{ marginTop: 20 }}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
                            </p>
                        </Dragger>
                    </Space.Compact>
                }
                {
                    activeButton === 2 &&
                    <ReceiptForm />
                }
                {
                    (![0, 1, 2].includes(activeButton)) && 
                    <Text type="secondary">
                        Please select a method to upload the tax receipt.
                    </Text>
                }

                <Button onClick={handleWebScrapping}> Trigger Web Scrapping </Button>
            </Card>
        </Space>
    )
}

export default UploadCard;