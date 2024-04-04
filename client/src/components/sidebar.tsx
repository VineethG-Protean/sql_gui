import { NavLink } from "react-router-dom";

import {
  Database,
  MonitorDot,
  Settings,
  SquareKanban,
  User,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const sheetMenuItems = [
  {
    icon: (
      <SquareKanban className="h-4 w-4 group-hover:text-green-500 transition-all duration-500" />
    ),
    name: "Summary",
    path: "/",
  },
  {
    icon: (
      <MonitorDot className="h-4 w-4 group-hover:text-green-500 transition-all duration-500" />
    ),
    name: "Monitoring",
    path: "/",
  },
  {
    icon: (
      <Database className="h-4 w-4 group-hover:text-green-500 transition-all duration-500" />
    ),
    name: "Database Management",
    path: "/database",
  },
  {
    icon: (
      <User className="h-4 w-4 group-hover:text-green-500 transition-all duration-500" />
    ),
    name: "User Management",
    path: "/user",
  },
  {
    icon: (
      <Settings className="h-4 w-4 group-hover:text-green-500 transition-all duration-500" />
    ),
    name: "Settings",
    path: "/settings",
  },
];

const SideBar = () => {
  return (
    <div className="hidden sm:flex flex-col items-center p-6 border-r border-muted h-full">
      <div className="flex flex-col gap-6 h-full">
        {sheetMenuItems.map((item, index) => (
          <NavLink
            to={item.path}
            className={({ isActive, isPending }) => {
              return isActive ? "text-primary" : "";
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    key={index}
                    className="cursor-pointer group hover:bg-muted p-2 transition-all duration-500 rounded-md"
                  >
                    {item.icon}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
