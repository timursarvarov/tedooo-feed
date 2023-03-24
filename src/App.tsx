import React from 'react';
import './App.css';
import FeedList from "./components/FeedList/FeedList";
import {Layout, ConfigProvider, theme} from 'antd';
import TDHeader from "./components/Header/TDHeader";

const {Header, Content, Footer} = Layout;

function App() {
    const {
        token: {
            colorBgContainer,
        },
    } = theme.useToken();
    return (
        <div className="App">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#2DB8A1',
                    },
                }}
            >
                <Layout className="layout">
                    <Header
                        style={{background: colorBgContainer, height:58}}
                    >
                        <TDHeader/>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <div className="site-layout-content" style={{background: colorBgContainer}}>
                            <FeedList/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </ConfigProvider>
        </div>
    );
}

export default App;
