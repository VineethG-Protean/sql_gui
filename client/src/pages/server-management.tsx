import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import {
  Database,
  Info,
  Lock,
  Pen,
  PlusCircle,
  ScreenShare,
  Server,
  Trash,
  Usb,
} from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getAllServersAPI } from "@/components/api/userApi";
import { deleteServerAPI } from "@/components/api/adminApi";
import AddServerDialog from "@/components/dialogs/add-server-dialog";
import { Servers } from "@/lib/interfaces";
import { formatDate } from "@/lib/utils";
import EditServerDialog from "@/components/dialogs/edit-server-dialog";

const popover_icons = [
  {
    icon: <ScreenShare className="w-3 h-3 mt-1 text-primary" />,
    value: "host",
  },
  {
    icon: <Usb className="w-3 h-3 mt-1 text-primary" />,
    value: "port",
  },
  {
    icon: <Database className="w-3 h-3 mt-1 text-primary" />,
    value: "type",
  },
];
const ServerManagement = () => {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [servers, setServers] = useState<Servers[]>([]);
  const [selectedServer, setSelectedServer] = useState<Servers>();
  const [addServerDialogState, setAddServerDialogState] =
    useState<boolean>(false);
  const [editServerDialogState, setEditServerDialogState] =
    useState<boolean>(false);

  const handleFetchServers = async () => {
    const response = await getAllServersAPI();
    setServers(response.data.DATA);
  };

  const handleDeleteServer = async (id: number) => {
    try {
      await deleteServerAPI(id);
      toast({
        title: "Server Action",
        description: "Server has been removed successfully",
      });
      handleFetchServers();
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      if (user.role == "admin") {
        setAuthorized(true);
        await handleFetchServers();
      } else {
        setAuthorized(false);
      }
    };

    checkAuthorization();
  }, [user]);

  return (
    <>
      {authorized ? (
        <>
          <div className="w-full flex justify-between items-center">
            <div className="flex gap-2 items-center">
              {/* <p className="font-bold">Filters</p> */}
              <Input placeholder="Search" />
            </div>
            <Button
              className="flex gap-2 items-center"
              onClick={() => setAddServerDialogState(!addServerDialogState)}
            >
              <p>New</p>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Servers</CardTitle>
              <CardDescription>Manage your servers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server, index) => (
                    <TableRow key={index} className="group">
                      <TableCell className="flex gap-2 items-center">
                        <Server className="w-4 h-4" />
                        {server.name}
                      </TableCell>
                      <TableCell>{formatDate(server.created_at)}</TableCell>
                      <TableCell>{formatDate(server.modified_at)}</TableCell>
                      <TableCell className="flex gap-4 items-center group-hover:visible invisible transition-all duration-250">
                        <Pen
                          className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => [
                            setEditServerDialogState(true),
                            setSelectedServer(server),
                          ]}
                        />

                        <AlertDialog>
                          <AlertDialogTrigger>
                            <Trash className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently remove the server information from
                                the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteServer(server.id!)}
                              >
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <Popover>
                          <PopoverTrigger>
                            <Info className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="flex gap-4 items-center">
                              <div className="p-4 rounded-full bg-black mt-1">
                                <Server className="h-10 w-10" />
                              </div>

                              <div className="w-full">
                                <div className="mb-1 flex justify-between items-center">
                                  <p className="font-semibold text-lg">
                                    {server.name}
                                  </p>
                                  <p className="flex justify-center items-center text-muted-foreground border border-muted text-[12px] rounded-md px-3 py-0.5">
                                    {server.protocol}
                                  </p>
                                </div>

                                <div className="flex flex-col border border-muted rounded-md p-2">
                                  {popover_icons.map((icon, index) => (
                                    <span
                                      className="flex gap-2 items-center text-xs font-light text-muted-foreground"
                                      key={index}
                                    >
                                      {icon.icon}
                                      <p>
                                        {server[icon.value as keyof Servers]}
                                      </p>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {servers.length == 0 && (
                <div className="p-5 text-center text-xl text-muted-foreground font-semibold w-full">
                  No Servers Found
                </div>
              )}
            </CardContent>
          </Card>

          <AddServerDialog
            dialogState={addServerDialogState}
            setDialogState={() =>
              setAddServerDialogState(!addServerDialogState)
            }
            fetchServers={handleFetchServers}
          />

          <EditServerDialog
            dialogState={editServerDialogState}
            setDialogState={() =>
              setEditServerDialogState(!editServerDialogState)
            }
            fetchServers={handleFetchServers}
            server={selectedServer}
          />
        </>
      ) : (
        <div className="w-full h-full flex flex-col gap-12 justify-center items-center text-muted-foreground border border-muted rounded-md">
          <p className="text-6xl">You are not authorized</p>
          <Lock className="h-16 w-16" />
        </div>
      )}
    </>
  );
};

export default ServerManagement;
