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
  console.log(user?.photoURL)

  return (
    <div id="cabeca">
      <div className="icones">
        <img onClick={onOpen} src="menu.png" alt="Menu Hamburger" />

        <div className="addTasks">
          <img onClick={onClickButton} src="add.png" alt="" />
          <p>Add Task</p>
        </div>
      </div>
      <Box display={"flex"} gap={3}>
        <Avatar src={user?.photoURL ?? ""} />
        {/* <img id="foto_perfil" src="foto_perfil.PNG" alt="" /> */}
        <div className="perfile_info">
          <h4>{user?.displayName}</h4>
          <p>
            <a href="#">My account</a>
            <img src="seta.png" alt="" />
          </p>
        </div>
      </Box>
    </div>
  );
};
