import React from 'react'
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

export default function Navbar() {
    return (
        <div
            className="nav-container"
        >
            <div className="logo-container">
                <Avatar src="https://i.imgur.com/6VBx3io.png" size="large" />
                <Typography.Title level={2} className="logo">
                    <Link to="/">CryptoWorld</Link>
                </Typography.Title>
                {/* <Button className="menu-control-container">
                <MenuOutlined />
            </Button> */}
            </div>
            <Menu theme="dark">
                <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined />}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined />}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined />}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}
