"use client";

import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Spin } from 'antd';
import { 
  NumberOutlined, 
  DollarOutlined, 
  ContainerOutlined, 
} from '@ant-design/icons';
import styles from "./ReceiptForm.module.css";


const ReceiptForm: React.FC = () => {
  const [form] = Form.useForm();
  const [isClient, setIsClient] = useState(false);

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  useEffect(() => {
    setIsClient(true); // on mounting
  }, []);

  if (!isClient) {
    // return <Spin tip="Loading..."/>; 
    return null;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className={styles.form}
    >
      <Form.Item
        label=" ECC Registration Number"
        name="eccNumber"
        rules={[{ 
          required: true, 
          message: 'Please enter the ECC registration number' 
        }]}
      >
        <Input 
          prefix={<NumberOutlined />} 
          placeholder="Enter ECC number"
        />
      </Form.Item>

      <Form.Item
        label=" Total Receipt Amount"
        name="totalAmount"
        rules={[{ 
          required: true, 
          message: 'Please enter the total amount' 
        }]}
      >
        <Input 
          prefix={<DollarOutlined />} 
          type="number" 
          step="0.01"
          placeholder="Enter total amount"
        />
      </Form.Item>

      <Form.Item
        label=" Receipt Number"
        name="receiptNumber"
        rules={[{ 
          required: true, 
          message: 'Please enter the receipt number' 
        }]}
      >
        <Input 
          prefix={<ContainerOutlined />} 
          placeholder="Enter receipt number"
        />
      </Form.Item>

      <Form.Item
        label=" Receipt Issue Date"
        name="issueDate"
        rules={[{ 
          required: true, 
          message: 'Please select the issue date' 
        }]}
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="YYYY-MM-DD"
          placeholder="Select date"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReceiptForm;