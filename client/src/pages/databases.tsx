import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setActiveServer } from "@/store/slices/activeServerSlice";

import {
  getMysqlDatabasesAPI,
  getMysqlDatabaseInfoAPI,
  getMysqlDatabaseUsersAPI,
  dropMysqlDatabaseAPI,
} from "@/components/api/mysqlDatabaseApi";

import AddMySqlUserDialog from "@/components/dialogs/add-mysqluser-dialog";
import AddMySqlDatabaseDialog from "@/components/dialogs/add-mysqldatabase-dialog";

import { Table as LucideTable, PlusCircle, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const Databases = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeServer = useSelector((state: RootState) => state.activeServer);
  const servers = useSelector((state: RootState) => state.servers);

  const [addMysqlDatabaseDialogState, setAddMysqlDatabaseDialogState] =
    useState<boolean>(false);
  const [addMysqlUserDialogState, setAddMysqlUserDialogState] =
    useState<boolean>(false);
  const [dropDatabaseAlertState, setDropDatabaseAlertState] =
    useState<boolean>(false);
  const [mysqlDatabases, setMysqlDatabases] = useState<any[]>([]);
  const [databaseSchema, setDatabaseSchema] = useState<{
    characterSet: string;
    collation: string;
    encryption: string;
    name: string;
  }>();
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");
  const [databaseUsers, setDatabaseUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleFetchMysqlDatabases = async () => {
    try {
      const response = await getMysqlDatabasesAPI({
        server_id: activeServer.id!,
      });
      setMysqlDatabases(response.data.DATA[0]);
      toast({
        title: "Server Action",
        description: "Databases has been fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleFetchMysqlDatabaseInfo = async (databaseName: string) => {
    try {
      const schema = await getMysqlDatabaseInfoAPI({
        server_id: activeServer.id!,
        databaseName,
      });
      setDatabaseSchema(schema.data.DATA);

      const users = await getMysqlDatabaseUsersAPI({
        server_id: activeServer.id!,
        databaseName,
      });

      console.log(users.data.DATA);
      setDatabaseUsers(users.data.DATA);

      toast({
        title: "Server Action",
        description: "Schema has been fetched successfully.",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  async function handleDropDatabase(databaseName: string) {
    try {
      await dropMysqlDatabaseAPI({
        server_id: activeServer.id!,
        databaseName,
      });
      handleFetchMysqlDatabases();
      toast({
        title: "Server Action",
        description: "Database has been dropped successfully.",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (activeServer.id) handleFetchMysqlDatabases();
  }, [activeServer]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MySQL Databases</CardTitle>
        <CardDescription>List of MySQL databases</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <Input placeholder="Search database ... " className="w-48" />
          <div className="flex gap-2">
            <Select
              defaultValue={activeServer.id?.toString()}
              onValueChange={(e) => {
                const server = servers.find(
                  (server, _) => server.id?.toString() === e
                );
                if (server) dispatch(setActiveServer(server));
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Please select a server" />
              </SelectTrigger>
              <SelectContent>
                {servers.map((server, index) => (
                  <SelectItem key={index} value={server.id!.toString()}>
                    {server.name}
                  </SelectItem>
                ))}
                {servers.length == 0 && (
                  <p className="p-2 text-xs text-center">No Servers Found</p>
                )}
              </SelectContent>
            </Select>
            <Button
              className="flex gap-2 items-center"
              onClick={() =>
                setAddMysqlDatabaseDialogState(!addMysqlDatabaseDialogState)
              }
            >
              <p>New</p>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-14.5rem)] rounded-md border"
        >
          <ResizablePanel
            defaultSize={15}
            className="p-2"
            minSize={0}
            maxSize={25}
          >
            <ScrollArea className="h-[430px] pe-3">
              {mysqlDatabases.length != 0 ? (
                <div className="flex flex-col gap-1">
                  {mysqlDatabases.map((db, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 flex justify-between items-center group hover:bg-primary rounded-md cursor-pointer transition-colors"
                      onClick={() => handleFetchMysqlDatabaseInfo(db.Database)}
                    >
                      <p className="text-xs">{db.Database}</p>

                      <div className="flex gap-2 items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Trash
                                className="h-4 w-4 group-hover:block hidden"
                                onClick={(e) => [
                                  e.stopPropagation(),
                                  setDropDatabaseAlertState(
                                    !dropDatabaseAlertState
                                  ),
                                  setSelectedDatabase(db.Database),
                                ]}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-muted text-muted-foreground"
                            >
                              <p>Drop Database</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <LucideTable
                                className="h-4 w-4 group-hover:block hidden"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/database/${db.Database}`);
                                }}
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-muted text-muted-foreground"
                            >
                              <p>View Tables</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="h-full w-full flex justify-center items-center text-muted-foreground text-2xl">
                  No databases found
                </p>
              )}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85} minSize={40} className="p-4">
            {databaseSchema && (
              <div className="flex justify-between flex-wrap border border-muted px-4 py-6 rounded-md">
                {Object.entries(databaseSchema).map(([key, value]) => (
                  <span>
                    <p className="uppercase font-semibold text-muted-foreground text-md">
                      {key}
                    </p>
                    <p className="text-sm text-primary font-bold">{value}</p>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              {databaseUsers.length !== 0 && (
                <ScrollArea className="h-[350px] w-full rounded-md border p-4 mt-4 dark:bg-neutral-900 bg-neutral-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Host</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {databaseUsers.map((user, index) => (
                        <TableRow
                          key={index}
                          onClick={() => setSelectedUser(user)}
                        >
                          <TableCell>{user.User}</TableCell>
                          <TableCell>{user.Host}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="flex justify-center mt-6">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-dotted border-primary text-primary flex gap-4 items-center"
                      onClick={() =>
                        setAddMysqlUserDialogState(!addMysqlUserDialogState)
                      }
                    >
                      <p>Add User</p>
                      <PlusCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </ScrollArea>
              )}

              {selectedUser && (
                <ScrollArea className="h-[430px] w-full rounded-md border p-4 mt-4 dark:bg-neutral-900 bg-neutral-100">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Privilege</TableHead>
                        <TableHead>Access</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedUser &&
                        Object.entries(selectedUser).map(
                          ([privilege, access], index) =>
                            privilege.endsWith("_priv") && (
                              <TableRow key={index}>
                                <TableCell className="uppercase">
                                  {privilege + "ilege"}
                                </TableCell>
                                <TableCell>{String(access)}</TableCell>
                              </TableRow>
                            )
                        )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>

      <AddMySqlDatabaseDialog
        dialogState={addMysqlDatabaseDialogState}
        setDialogState={() =>
          setAddMysqlDatabaseDialogState(!addMysqlDatabaseDialogState)
        }
        fetchMysqlDatabases={handleFetchMysqlDatabases}
      />
      <AddMySqlUserDialog
        dialogState={addMysqlUserDialogState}
        setDialogState={() =>
          setAddMysqlUserDialogState(!addMysqlUserDialogState)
        }
        databases={mysqlDatabases}
        fetchDatabaseUsers={(database: string) =>
          handleFetchMysqlDatabaseInfo(database)
        }
      />

      <AlertDialog
        open={dropDatabaseAlertState}
        onOpenChange={() => setDropDatabaseAlertState(!dropDatabaseAlertState)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              database and the data present in database from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDropDatabase(selectedDatabase)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Databases;
