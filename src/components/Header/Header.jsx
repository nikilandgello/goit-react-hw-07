import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import css from "./Header.module.css";
import clsx from "clsx";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <header className={css.header}>
      <div className={clsx("container", css.containerHeader)}>
        <a className={css.logo} href="/">
          Phonebook
        </a>
        <button onClick={toggleTheme} className={css.buttonTheme}>
          {theme === "dark" ? (
            <svg width={30} height={30} className={css.iconDark}>
              <use href="/sprite.svg#icon-moon"></use>
            </svg>
          ) : (
            <svg width={30} height={30} className={css.iconLight}>
              <use href="/sprite.svg#icon-sun"></use>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
