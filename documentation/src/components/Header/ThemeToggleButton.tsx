import type { FunctionalComponent } from "preact";
import { useState, useEffect } from "preact/hooks";
import "./ThemeToggleButton.css";

const themes = ["light", "auto", "dark"];

const icons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="12" cy="12" r="9" />
    <path d="M13 12h5" />
    <path d="M13 15h4" />
    <path d="M13 18h1" />
    <path d="M13 9h4" />
    <path d="M13 6h1" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
    <path d="M19 11h2m-1 -1v2" />
  </svg>,
];

const ThemeToggle: FunctionalComponent = () => {
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    if (typeof localStorage !== undefined && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return "auto";
  });

  useEffect(() => {
    const root = document.documentElement;
    function setTheme(color: string) {
      if (color === "light") {
        root.classList.remove("theme-dark");
      } else {
        root.classList.add("theme-dark");
      }
    }

    if (selectedTheme === "auto") {
      const matcher = window.matchMedia("(prefers-color-scheme: dark)");
      setAutomaticTheme();
      matcher.addEventListener("change", setAutomaticTheme);
      return () => matcher.removeEventListener("change", setAutomaticTheme);
      function setAutomaticTheme() {
        setTheme(matcher.matches ? "dark" : "light");
      }
    } else {
      setTheme(selectedTheme || "light");
    }
  }, [selectedTheme]);

  return (
    <div className="theme-toggle">
      {themes.map((t, i) => {
        const icon = icons[i];
        const checked = t === selectedTheme;
        return (
          <label className={checked ? " checked" : ""}>
            {icon}
            <input
              type="radio"
              name="theme-toggle"
              checked={checked}
              value={t}
              title={`Use ${t} theme`}
              aria-label={`Use ${t} theme`}
              onChange={() => {
                localStorage.setItem("theme", t);
                setSelectedTheme(t);
              }}
            />
          </label>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
