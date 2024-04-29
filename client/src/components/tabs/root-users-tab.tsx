import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";

import { dropMysqlUserAPI, getMysqlUsersAPI } from "../api/mysqlUserApi";
import { Button } from "../ui/button";
import { PlusCircle, Trash } from "lucide-react";
import AddMySqlUserDialog from "../dialogs/add-mysqluser-dialog";
import { useToast } from "../ui/use-toast";

const RootUsersTab = () => {
  const { toast } = useToast();
  const activeServer = useSelector((state: RootState) => state.activeServer);
  const [mysqlUsers, setMysqlUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [addMysqlUserDialogState, setAddMysqlUserDialogState] =
    useState<boolean>(false);

  const handleFetchMysqlUsers = async () => {
    try {
      const response = await getMysqlUsersAPI({ server_id: activeServer.id });
      setMysqlUsers(response.data.DATA);
      toast({
        title: "Server Action",
        description: "User data has been fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleDropMysqlUser = async (name: string, host: string) => {
    try {
      await dropMysqlUserAPI({ server_id: activeServer.id, name, host });
      toast({
        title: "Server Action",
        description: "User has been dropped successfully",
      });
      handleFetchMysqlUsers();
      setSelectedUser(null);
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (activeServer.id) handleFetchMysqlUsers();
  }, [activeServer]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MySQL Root Users</CardTitle>
        <CardDescription>List of MySQL root users</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search user ... " className="w-48" />
          <Button
            className="flex gap-2 items-center"
            onClick={() => setAddMysqlUserDialogState(true)}
          >
            <p>New</p>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-md border min-h-[580px]"
        >
          <ResizablePanel defaultSize={15} className="p-2" minSize={15}>
            {mysqlUsers.length != 0 ? (
              mysqlUsers.map((user, index) => (
                <div
                  key={index}
                  className="px-4 py-2 flex items-center justify-between hover:bg-primary rounded-md cursor-pointer transition-colors"
                  onClick={() => setSelectedUser(user)}
                >
                  <p className="text-xs">{user.User}</p>
                  <Trash
                    className="h-3 w-3"
                    onClick={() => handleDropMysqlUser(user.User, user.Host)}
                  />
                </div>
              ))
            ) : (
              <p className="h-full w-full flex justify-center items-center text-muted-foreground text-3xl">
                No users found
              </p>
            )}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={85} minSize={40} className="p-4">
            {selectedUser ? (
              <>
                <div className="flex gap-2">
                  <p>Host: </p>
                  <p>{selectedUser?.Host}</p>
                </div>
                <p className="text-center">Global Privileges</p>
                <ScrollArea className="h-[480px] w-full rounded-md border p-4 mt-4 dark:bg-neutral-900 bg-neutral-100">
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
              </>
            ) : (
              <p className="h-full w-full flex justify-center items-center text-muted-foreground text-3xl">
                Select any user
              </p>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>

      <AddMySqlUserDialog
        server_id={activeServer.id}
        dialogState={addMysqlUserDialogState}
        setDialogState={() =>
          setAddMysqlUserDialogState(!addMysqlUserDialogState)
        }
        fetchMysqlUsers={handleFetchMysqlUsers}
      />
    </Card>
  );
};

export default RootUsersTab;
