import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [screen, setScreen] = useState({
    w: window.innerWidth || 0,
    h: window.innerHeight || 0,
  });

  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  // ✅ Handle window resize
  useEffect(() => {
    const updateDimensions = () => {
      setScreen({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // ✅ Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  // ✅ Device info
  const device = useMemo(
    () => ({
      size: screen,
      orientation: screen.w > screen.h ? "landscape" : "portrait",
      type: {
        isMobile: screen.w <= 425,
        isTablet: screen.w > 425 && screen.w <= 768,
        isDesktop: screen.w > 768,
      },
    }),
    [screen]
  );

  const value = useMemo(() => ({ device, theme, setTheme }), [device, theme]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser can't be used outside UserProvider");
  return context;
};
