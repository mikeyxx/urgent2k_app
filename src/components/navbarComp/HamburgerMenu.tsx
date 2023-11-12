import React from "react";
import { usePathname } from "next/navigation";

interface HamburgerMenuProps {
  offset: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function HamburgerMenu({ open, setOpen, offset }: HamburgerMenuProps) {
  const pathname = usePathname();

  const handleSidebarSlider = () => {
    setOpen((prev) => !prev);
    if (open === true) {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    } else {
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
  };

  if (offset >= 25) {
    return (
      <div
        className={`menu-btn ${open && "menu-btn open"}`}
        onClick={handleSidebarSlider}
      >
        <div className="menu-btn__burger-white"></div>
      </div>
    );
  }
  return (
    <>
      {pathname !== "/" ? (
        <div
          className={`menu-btn ${open && "menu-btn open"}`}
          onClick={handleSidebarSlider}
        >
          <div className="menu-btn__burger-white"></div>
        </div>
      ) : (
        <div
          className={`menu-btn ${open && "menu-btn open"}`}
          onClick={handleSidebarSlider}
        >
          <div className="menu-btn__burger"></div>
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
