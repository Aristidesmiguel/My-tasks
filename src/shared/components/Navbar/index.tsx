import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import "./navbar.css";
import { ROUTES } from "../../utils";

export const Navbar = () => {
  const navigate = useNavigate();
  const handleOnCkick = () => {
    navigate(ROUTES.signIn);  
  }
 
  return (
    <>
      <div className="navbar">
      <a href="#" className="title">
        <span className="active">
          Task <strong>Manager</strong>
        </span>
      </a>

      <ul>
        <li>
          <a href="/about" className="active">
          Sobre
          </a>
        </li>
        <li>
          <a href="/cases">Contacto</a>
        </li>
      </ul>
      <Button title="Sign In" handleClickButton={handleOnCkick} />
    </div>
    </>
  );
};
