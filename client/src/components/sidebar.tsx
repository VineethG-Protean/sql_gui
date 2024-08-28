import { NavLink } from "react-router-dom";

import {
  Database,
  MonitorDot,
  Server,
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
    icon: <SquareKanban className="h-4 w-4" />,
    name: "Summary",
    path: "/",
  },
  {
    icon: <MonitorDot className="h-4 w-4" />,
    name: "Monitoring",
    path: "/monitoring",
  },
  {
    icon: <Database className="h-4 w-4" />,
    name: "Database Management",
    path: "/database",
  },
  {
    icon: <User className="h-4 w-4" />,
    name: "User Management",
    path: "/user",
  },
  {
    icon: <Server className="h-4 w-4" />,
    name: "Server Management",
    path: "/server",
  },
  {
    icon: <Settings className="h-4 w-4" />,
    name: "Settings",
    path: "/settings",
  },
];

const SideBar = () => {
  return (
    <div className="fixed top-16 hidden sm:flex flex-col items-center p-6 border-r border-muted h-full">
      <div className="flex flex-col gap-6 h-full">
        {sheetMenuItems.map((item, index) => (
          <NavLink
            to={item.path}
            className={({ isActive, isPending }) => {
              return isActive ? "text-primary" : "";
            }}
            key={index}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="cursor-pointer group hover:bg-muted p-2 transition-all duration-500 rounded-md">
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
