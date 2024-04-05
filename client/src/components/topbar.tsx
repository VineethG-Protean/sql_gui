import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Database,
  MonitorDot,
  Settings,
  SquareKanban,
  User,
  MenuIcon,
} from "lucide-react";
import { LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "./api/authApi";

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
    path: "/monitoring",
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

const TopBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sticky top-0 backdrop-blur-md z-[50] flex justify-between items-center px-8 py-3 border-b border-muted">
      <div className="flex gap-12">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="w-5 h-5 cursor-pointer" />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>SQL GUi.</SheetTitle>
              <SheetDescription>
                <div className="flex flex-col gap-2 mt-4">
                  {sheetMenuItems.map((item, index) => (
                    <NavLink
                      to={item.path}
                      className={({ isActive, isPending }) => {
                        return isActive ? "text-primary" : "";
                      }}
                      key={index}
                    >
                      <div className="flex gap-4 items-center cursor-pointer group hover:bg-muted transition-all duration-500 p-2 rounded-md">
                        {item.icon}
                        <p className=" group-hover:text-green-500 transition-all duration-500">
                          {item.name}
                        </p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <p className="text-xl font-extrabold"> SQL GUi .</p>
      </div>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <LogOut className="h-4 w-4 cursor-pointer" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex justify-between items-center">
              <p>Are you sure?</p>
              <Button variant={"default"} onClick={handleLogout}>
                OK
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TopBar;
