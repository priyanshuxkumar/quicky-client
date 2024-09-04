"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="ml-3 min-w-0">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="toggleB" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="toggleB"
              className="sr-only"
              defaultChecked={theme === "light" ? false : true}
              onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            />
            <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>

            <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
