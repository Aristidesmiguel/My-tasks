import { useNavigate } from "react-router-dom";
import "./index.css";
import { ROUTES } from "../../utils";

type DashboardHeaderProps = {
  onOpen?: () => void
}

export const DashboardHeader = ({onOpen}: DashboardHeaderProps) => {
  const navigate = useNavigate()
  const onClickButton = () => {
    navigate(ROUTES.addTasks)
  }

  return (
    <div id="cabeca">
      <div className="icones">
        <img onClick={onOpen} src="menu.png" alt="Menu Hamburger" />

        <div className="addTasks">
          <img onClick={onClickButton} src="add.png" alt="" />
          <p>Add Task</p>
        </div>
      </div>
      <div className="profile">
        <img id="foto_perfil" src="foto_perfil.PNG" alt="" />
        <div className="perfile_info">
          <h4>Akira Uzumaki</h4>
          <p>
            <a href="#">My account</a>
            <img src="seta.png" alt="" />
          </p>
        </div>
      </div>
    </div>
  );
};
