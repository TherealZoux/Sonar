import { NavLink } from "react-router-dom";
import {type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
interface NavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
}

const getNavItemClasses = (isActive: boolean) => {
  return cn(
    "relative flex items-center gap-3 px-3 py-3 transition-all duration-300 group border-l-4 overflow-hidden",
    "before:absolute before:inset-0 before:bg-[#C75B3314] before:origin-left before:transition-transform before:duration-500 before:-z-10",
    isActive 
      ? "text-[#C75B33] border-[#C75B33] rounded-xl before:scale-x-100" 
      : "text-[#6F6F6F] border-transparent before:scale-x-0 hover:text-[#C75B33]"
  );
};

export const NavItem = ({ to, icon: Icon, label }: NavItemProps) => {
  return (
   <NavLink
      to={to}
      className={({ isActive }) => getNavItemClasses(isActive)}
    >
      {({ isActive }) => (
        <>
          <Icon className={`w-5 h-5 ${isActive ? "text-[#B14E2D]" : "text-[#6F6F6F]"}`} />
          <span className="font-medium">{label}</span>
        </>
      )}
    </NavLink>  );
};
