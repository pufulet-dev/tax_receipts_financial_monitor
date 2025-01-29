"use client";

import React, { useState, useEffect } from 'react';
import ReceiptForm from '../ReceiptForm/ReceiptForm';
import { processReceipt } from '@/utils/processReceipt';
import ProductService from '@/services/product.service';
import ReceiptService from '@/services/receipt.service';
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
    const [isClient, setIsClient] = useState(false);

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
                const filteredData = data.filter((item: any) => item && item.trim() !== '');
                console.log("scrapped data:: ", filteredData);
                const processedData = processReceipt(filteredData);
                console.log("processed Data:  ", processedData);
                console.log(process.env.NEXT_PUBLIC_STRAPI_URL, process.env.NEXT_PUBLIC_STRAPI_TOKEN);

                // add new receipt
                const receiptService = new ReceiptService();
                const receiptResponse = await receiptService.add ({
                    data: {
                        total: processedData.totalPrice,
                        date: processedData.dateTime,
                        link: scrapeUrl,
                    }
                })
                console.log("!!! receipt response: ", receiptResponse);
                const receiptId = receiptResponse.data.id;
                console.log("my receipt id:   ", receiptId);
                
                // add the products & link them to receipt
                for (let i = 0; i < processedData.products.length; i++) {
                    const productService = new ProductService();
                    await productService.add ({
                        data: {
                            name: processedData.products[i],
                            quantity: processedData.quantities[i],
                            price: processedData.prices[i],
                            receipt: receiptId,
                        }
                    });
                }
            } else {
              console.log("ERROR! fAILE to scrape")
            }
            setLoading(false);
          } catch (err: any) {
            console.log('Error during scraping: ' + err.message); 
            setLoading(false);
          } 
    };

    useEffect(() => {
        setIsClient(true); // on mounting
      }, []);
    
      if (!isClient) {
        return null;
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
                                <Button type="primary" onClick={handleWebScrapping}>Process</Button>
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
            </Card>
        </Space>
    )
}

export default UploadCard;