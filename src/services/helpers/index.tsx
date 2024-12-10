import { AppstoreOutlined } from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    key: "categories",
    label: "Kategoriyalar",
    icon: <AppstoreOutlined />,
    route: "/categories",
  },
  {
    key: "customers",
    label: "Mijozlar",
    icon: <AppstoreOutlined />,
    route: "/customers",
  },
  {
    key: "contracts",
    label: "Contracts",
    icon: <AppstoreOutlined />,
    route: "/contracts",
  }
];

export default {
  menuItems,
};
