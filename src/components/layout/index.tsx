import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Header, Navigation2 } from "components";

const { Sider, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout className="h-full">
      <Sider trigger={null}>
        <Navigation2 />
      </Sider>
      <Layout>
        <Header />
        <Content className="overflow-auto p-[16px] min-h-[280px]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
