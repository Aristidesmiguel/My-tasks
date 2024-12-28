import { useNavigate } from "react-router-dom";
import "./index.css";
import { ROUTES } from "../../utils";
import { Avatar, Box } from "@chakra-ui/react";
import { useAuth } from "../../hooks";

type DashboardHeaderProps = {
  onOpen?: () => void
}

export const DashboardHeader = ({ onOpen }: DashboardHeaderProps) => {
  const navigate = useNavigate()
  const onClickButton = () => {
    navigate(ROUTES.addTasks)
  }


  const { user } = useAuth();
  const photoURL = localStorage.getItem('photoURL')
  const displayName = localStorage.getItem('displayName')

  return (
    <div id="cabeca">
      <div className="icones">
        <img onClick={onOpen} src="menu.png" alt="Menu Hamburger" />

        <div className="addTasks">
          <img onClick={onClickButton} src="add.png" alt="" />
          <p>Criar Tarefa</p>
        </div>
      </div>
      <Box className="profileHeader"  display={"flex"} gap={3}>
        <Avatar src={user?.photoURL ?? photoURL ?? ""} />
        {/* <img id="foto_perfil" src="foto_perfil.PNG" alt="" /> */}
        <div className="perfile_info">
          <h4 >{user?.displayName ?? displayName}</h4>
          <p>
            <a href={ROUTES.profile}>My account</a>
            <img src="seta.png" alt="" />
          </p>
        </div>
      </Box>
    </div>
  );
};
