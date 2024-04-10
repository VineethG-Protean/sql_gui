import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { Info, Lock, Pen, PlusCircle, Server, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getAllServersAPI } from "@/components/api/userApi";
import AddServerDialog from "@/components/dialogs/add-server-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Servers } from "@/lib/interfaces";
import { deleteServerAPI } from "@/components/api/adminApi";
import { useToast } from "@/components/ui/use-toast";

const ServerManagement = () => {
  const { toast } = useToast();
  const user = useSelector((state: RootState) => state.user);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [addServerDialogState, setAddServerDialogState] =
    useState<boolean>(false);
  const [servers, setServers] = useState<Servers[]>([]);

  const handleFetchServers = async () => {
    const response = await getAllServersAPI();
    setServers(response.data.DATA);
  };

  const handleDeleteServer = async (id: number) => {
    const response = await deleteServerAPI(id);
    if (response.status == 201) {
      toast({
        title: "Server Action",
        description: "Server has been removed successfully",
      });

      handleFetchServers();
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
                    <TableHead>Protocol</TableHead>
                    <TableHead>Host</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servers.map((server, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex gap-2 items-center">
                        <Server className="w-4 h-4" />
                        {server.name}
                      </TableCell>
                      <TableCell>{server.protocol}</TableCell>
                      <TableCell>{server.host}</TableCell>
                      <TableCell>{server.type}</TableCell>
                      <TableCell className="flex gap-4 items-center">
                        <Pen className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                        <Trash
                          onClick={() => handleDeleteServer(server.id)}
                          className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
                        />
                        <Info className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
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
