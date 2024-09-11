import { Button } from "../Button";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <a href="#" className="title">
        <span className="active">
          Task <strong>Manager</strong>
        </span>
      </a>

      <ul>
        <li>
          <a href="/about" className="active">
            About
          </a>
        </li>
        <li>
          <a href="/cases">Cases</a>
        </li>
        <li>
          <a href="/Resource">Resource</a>
        </li>
      </ul>
      <Button title="Sign In" />
    </div>
  );
};
