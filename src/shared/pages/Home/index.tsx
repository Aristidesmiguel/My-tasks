import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../../components";
import { ROUTES } from "../../utils";

import home from "./home.module.css";
import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = () => {
    setIsOpen(false)
  }
  const onOpen = () => {
    setIsOpen(true)
  }

  const navigate = useNavigate();

  const onClickButton = () => {
    navigate(ROUTES.dashboard);
  };

  useEffect(() => {
    document.title = "Home";
  })

  const onClickOnSingIn = () => {
    navigate(ROUTES.signIn)
  }
  return (
    <div className={home.container_home_main}>
      <div className={home.menu_container}>
        <img className={home.menu} src="menu.png" onClick={onOpen} alt="" />
      </div>
      <header className={home.header}>
        <Navbar />
      </header>
      <main className={home.main}>
        <aside>
          <h1>
            <span className="active">TaskManeger,</span> venha criar
            seus planos para o <span className="active">futuro!</span>
          </h1>
          <p>Organizando sua vida, com qualidade e segurança, no conforto de casa!</p>
          <Button handleClickButton={onClickButton} title="Get Started" />
        </aside>

        <section>
          <img
            src="reading-list.png"
            alt="Ilustração de um personagem lendo uma lista"
          />
        </section>
      </main>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent style={{ background: "#B4ACF9" }}>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody className={home.modalbody}>
            <div >
              <h1>Task Manager</h1>
            </div>
            <nav >
              <ul>
                <li>About</li>
                <li>cases</li>
                <li>Resource</li>
              </ul>
            </nav>
            <Button title="Sing In" handleClickButton={onClickOnSingIn}></Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
