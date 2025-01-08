"use client";

import React from 'react';
import { Row, Col, Input, Typography, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Upload: React.FC = () => {

    return (
        <div style={{ padding: '20px' }}>
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <Text>Please upload the mev.sfs.md link with your tax receipt to be processed</Text>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Input size="small" placeholder="Enter link" prefix={<LinkOutlined />} />
            </Col>
            <Col span={6}>
              <Button type="primary">Process</Button>
            </Col>
          </Row>
        </div>
    );
};

export default Upload;