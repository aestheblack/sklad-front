import {
  AppstoreOutlined,
  TranslationOutlined,
  LineChartOutlined,
  BookOutlined,
  UserAddOutlined,
  BellOutlined,
} from "@ant-design/icons";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    key: "problems",
    label: "Masalalar",
    icon: <AppstoreOutlined />,
    route: "/problems",
  },
  {
    key: "projects",
    label: "Loyihalar",
    icon: <AppstoreOutlined />,
    route: "/projects",
  },
  {
    key: "students",
    label: "O'quvchilar",
    icon: <UserAddOutlined />,
    route: "/students",
  },
  {
    key: "teachers",
    label: "O'qituvchilar",
    icon: <UserAddOutlined />,
    route: "/teachers",
  },
  {
    key: "marked-projects",
    label: "Tekshirish",
    icon: <AppstoreOutlined />,
    route: "/marked-projects",
  },
  {
    key: "difficulties",
    label: "Qiyinliklar",
    icon: <LineChartOutlined />,
    route: "/difficulties",
  },
  {
    key: "subjects",
    label: "Fanlar",
    icon: <BookOutlined />,
    route: "/subjects",
  },
  {
    key: "charts",
    label: "Hisobotlar",
    icon: <LineChartOutlined />,
    route: "/charts",
  },
  {
    key: "feedbacks",
    label: "Fikrlar",
    icon: <BellOutlined />,
    route: "/feedbacks",
  },
  {
    key: "translations",
    label: "Tarjimalar",
    icon: <TranslationOutlined />,
    route: "/translations",
  },
];

function gen4() {
  return Math.random()
    .toString(16)
    .slice(-4);
}

export default {
  menuItems,
};

export { gen4 };
