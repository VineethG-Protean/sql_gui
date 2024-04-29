import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "../ui/use-toast";
import {
  getMysqlDatabaseSchemaAPI,
  getMysqlDatabaseUsersAPI,
  getMysqlDatabasesAPI,
} from "../api/mysqlDatabaseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import AddMySqlDatabaseDialog from "../dialogs/add-mysqldatabase-dialog";

const DatabaseTab = () => {
  const { toast } = useToast();
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [addMysqlDatabaseDialogState, setAddMysqlDatabaseDialogState] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>();

  const [databaseUsers, setDatabaseUsers] = useState<any[]>([]);
  const [mysqlDatabases, setMysqlDatabases] = useState<any[]>([]);
  const [databaseSchema, setDatabaseSchema] = useState<{
    characterSet: string;
    collation: string;
    encryption: string;
    name: string;
  }>();

  const handleFetchMysqlDatabases = async () => {
    try {
      const response = await getMysqlDatabasesAPI({
        server_id: activeServer.id,
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

  const handleFetchMysqlDatabaseSchema = async (dbName: string) => {
    try {
      const schema = await getMysqlDatabaseSchemaAPI({
        server_id: activeServer.id,
        dbName,
      });
      setDatabaseSchema(schema.data.DATA);

      const users = await getMysqlDatabaseUsersAPI({
        server_id: activeServer.id,
        dbName,
      });

      console.log(users.data.DATA);
      setDatabaseUsers(users.data.DATA);

      toast({
        title: "Server Action",
        description: "Schema has been fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

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
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[580px] rounded-md border"
        >
          <ResizablePanel
            defaultSize={15}
            className="p-2"
            minSize={0}
            maxSize={25}
          >
            {mysqlDatabases.length != 0 ? (
              mysqlDatabases.map((db, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-primary rounded-md cursor-pointer transition-colors"
                  onClick={() => handleFetchMysqlDatabaseSchema(db.Database)}
                >
                  <p className="text-xs">{db.Database}</p>
                </div>
              ))
            ) : (
              <p className="h-full w-full flex justify-center items-center text-muted-foreground text-3xl">
                No databases found
              </p>
            )}
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
                <ScrollArea className="h-[430px] w-full rounded-md border p-4 mt-4 dark:bg-neutral-900 bg-neutral-100">
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
        server_id={activeServer.id}
        dialogState={addMysqlDatabaseDialogState}
        setDialogState={() =>
          setAddMysqlDatabaseDialogState(!addMysqlDatabaseDialogState)
        }
        fetchMysqlDatabases={handleFetchMysqlDatabases}
      />
    </Card>
  );
};

export default DatabaseTab;
