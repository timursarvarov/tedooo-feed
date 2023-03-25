import React, {FC, useState} from "react";
import "./TDHeader.scss";
import {Menu, Input, Row, Col, Space, Avatar} from "antd";
import {
    SearchOutlined,
    HomeOutlined,
    MessageOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import tedoooLogo from "../../assets/images/tedooo_logo.png";
import userAvatar from "../../assets/images/user_avatar.png";

const TDHeader: FC = () => {
    const [selectedKey, setSelectedKey] = useState("home");

    const handleClick = (e: { key: React.SetStateAction<string> }) => {
        console.log("click ", e);
        setSelectedKey(e.key);
    };

    const menuItems = [
        {
            label: "Navigation One",
            key: "home",
            icon: <HomeOutlined/>,
        },
        {
            label: "Messaging",
            key: "messaging",
            icon: <MessageOutlined/>,
        },
        {
            label: "Notifications",
            key: "notification",
            icon: <NotificationOutlined/>,
        },
    ];

    return (
        <Row style={{height: "100%", lineHeight: "58px"}}>
            <Col span={6}>
                <Space align={"center"}>
                    <Avatar shape={"square"} size={40} src={tedoooLogo}/>
                    <Input
                        style={{color: "#949796"}}
                        size="large"
                        className="search-input"
                        placeholder="Search"
                        prefix={<SearchOutlined/>}
                    />
                </Space>
            </Col>
            <Col span={16}>
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                    selectedKeys={[selectedKey]}
                    onClick={handleClick}
                    items={menuItems}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        borderBottom: "none",
                    }}
                />
            </Col>
            <Col span={2}>
                <Avatar src={userAvatar} alt="user_avatar"/>
            </Col>
        </Row>
    );
};

export default TDHeader;
