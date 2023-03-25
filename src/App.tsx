import React from "react";
import "./App.css";
import TDFeedList from "./components/TDFeedList/TDFeedList";
import {Layout, ConfigProvider, theme, Col, Row, Space} from "antd";
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
                        colorPrimary: "#2DB8A1",
                    },
                }}
            >
                <Layout>
                    <Header
                        style={{background: colorBgContainer, height: 58}}
                    >
                        <TDHeader/>
                    </Header>
                    <Content >
                            <TDFeedList style={{
                                maxWidth: "736px"
                            }}/>
                    </Content>
                </Layout>
            </ConfigProvider>
        </div>
    );
}

export default App;
