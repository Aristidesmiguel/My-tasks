import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "../../components";
import { ROUTES } from "../../utils";

import home from "./home.module.css";

export const Home = () => {
  const navigate = useNavigate();
  const onClickButton = () => {
    navigate(ROUTES.dashboard);
  };
  return (
    <div className={home.container_home_main}>
      <header className={home.header}>
        <Navbar />
      </header>
      <main className={home.main}>
        <aside>
          <h1>
            <span className="active">Creative Digital</span> Design Agency is
            looking for new talent
          </h1>
          <p>Creative Digital Design Agency is looking for new talent</p>
          <Button handleClickButton={onClickButton} title="Get Started" />
        </aside>

        <section>
          <img
            src="reading-list.png"
            alt="Ilustração de um personagem lendo uma lista"
          />
        </section>
      </main>
    </div>
  );
};
