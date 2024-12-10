import { Layout } from "antd";
import { useHooks } from "hooks";
import useStore from "store";
import { privateRoutes } from "routes/data";

import Avatar from 'assets/images/27470334_7309681.jpg'
import Arrow from 'assets/images/dropdown-arrow.svg'
import './style.scss'
import { Link } from "react-router-dom";
import { storage } from "services";

const { Header } = Layout;

const HeaderComponent = () => {
  const { get, location, t, navigate } = useHooks();
  const menus = privateRoutes.find((m) => m.path === get(location, "pathname"));
  const { logOut } = useStore((state) => state);

  return (
    <Header className="flex justify-between items-center bg-[#fff] dark:bg-[#f69b33] p-0 pr-[20px]">
      <div>
        <span className="font-[500] text-[20px] dark:text-[#9EA3B5] text-black ml-[48px]">
          {t(get(menus, 'title', ""))}
        </span>
      </div>
      <div className="flex items-center">
        <div className="profile-dropdown">
          <div className="profile-dropdown__circle">
            <img className="profile-dropdown__avatar" src={Avatar} alt="avatar" />
            <img className="profile-dropdown__arrow" src={Arrow} alt="arrow" />
          </div>
          <div className="profile-dropdown__options">
            <p className="profile-dropdown__item profile-dropdown__info">{t("Admin")}</p>
            <Link className="profile-dropdown__item profile-dropdown__link" to="/profile">{t("Profile")}</Link>
            <p className="profile-dropdown__item profile-dropdown__link" onClick={() => (
              logOut(),
              storage.remove("token"),
              navigate("/")
            )}>
              {t("Log out")}
            </p>
          </div>
        </div>
      </div>
    </Header >
  );
};

export default HeaderComponent;
