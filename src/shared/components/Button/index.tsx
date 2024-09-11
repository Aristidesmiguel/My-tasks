/* eslint-disable @typescript-eslint/no-explicit-any */
import "./button.css";

type ButtonType = {
  title: string;
  handleClickButton?: () => void
};

export const Button = ({ title, handleClickButton }: ButtonType) => {
  return (
    <button className="bg-purple" onClick={handleClickButton}>{title}</button>
  )
};
