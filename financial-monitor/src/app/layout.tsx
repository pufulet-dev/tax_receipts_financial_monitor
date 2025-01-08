"use client";

import React, { ReactNode } from 'react';
import { Layout, Menu, Typography } from 'antd';
import Link from 'next/link';
import './globals.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface AppLayoutProps {
  children: ReactNode; 
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const locale = 'en';

  const items = [
    {
      key: 'upload',
      label: <Link href={`/${locale}/upload`}>Upload</Link>,
    },
    {
      key: 'receipts',
      label: <Link href={`/${locale}/receipts`}>Receipts</Link>,
    },
    {
      key: 'statistics',
      label: <Link href={`/${locale}/statistics`}>Statistics</Link>,
    },
  ];

  return (
    <html lang={locale || 'en'}>
      <body>
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Link href={`/${locale}`}>
              <Title level={3} style={{ color: 'white', marginRight: '20px' }}>
                Financial Monitor
              </Title>
            </Link>
            <Menu theme="dark" mode="horizontal" items={items} />
          </Header>
          <Content style={{ padding: '0 50px', marginTop: '20px' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            ©2025 Financial Monitor
          </Footer>
        </Layout>
      </body>
    </html>
  );
};

export default AppLayout;