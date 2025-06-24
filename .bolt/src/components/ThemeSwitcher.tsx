import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Monitor } from "lucide-react";

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return { theme, setTheme };
};

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    if (theme === newTheme) return;
    setTheme(newTheme);
  };

  const themes = [
    { id: "light", icon: Sun, label: "Light" },
    { id: "system", icon: Monitor, label: "System" },
    { id: "dark", icon: Moon, label: "Dark" }
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-background/80 backdrop-blur-sm rounded-full border border-border/30 shadow-sm">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.id;
        
        return (
          <motion.button
            key={themeOption.id}
            onClick={() => handleThemeChange(themeOption.id as "light" | "dark" | "system")}
            className={`relative flex items-center justify-center h-8 w-8 rounded-full transition-all duration-300 ${
              isActive 
                ? "text-purple-600 dark:text-purple-400" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="theme-highlight"
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full border border-purple-400/30"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <Icon className="h-4 w-4 relative z-10" />
          </motion.button>
        );
      })}
    </div>
  );
};