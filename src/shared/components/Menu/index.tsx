import { Link } from "react-router-dom";
import menu from "./menu.module.css";
import { ROUTES } from "../../utils";
import { FaList } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdHome } from "react-icons/io";

export const Menu = () => {
  return (
    <div className={menu.container}>
      <div className={menu.navBar}>
        <div className={menu.child_menu}>
          <Link className={menu.link} to={ROUTES.home}>
            <IoMdHome />
            Home
          </Link>
        </div>
        <div className={menu.child_menu}>
          <Link className={menu.link} to={ROUTES.home}>
            <CgProfile />
            Profile
          </Link>
        </div>
        <div className={menu.child_menu}>
          <Link className={menu.link} to={ROUTES.dashboard}>
            <FaList />
            Minhas Listas
          </Link>
        </div>
        <div className={menu.child_menu}>
          <Link className={menu.link} to={ROUTES.addTasks}>
            <MdLibraryAdd />
            Criar Tarefa
          </Link>
        </div>
        <div className={menu.child_menu}>
          <Link className={menu.link} to={ROUTES.editTasks}>
            <FaEdit />
            Editar Tarefa
          </Link>
        </div>
      </div>
      <div className={menu.redesSocial}>
        <div>
          <img src="facebook.png" alt="" />
        </div>
      </div>
    </div>
  );
};
