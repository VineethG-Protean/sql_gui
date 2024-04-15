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

import { getMysqlUsersAPI } from "../api/serverApi";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const UsersTab = () => {
  const activeServer = useSelector((state: RootState) => state.activeServer);
  const [mysqlUsers, setMysqlUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>();

  const handleFetchMysqlUsers = async () => {
    try {
      const response = await getMysqlUsersAPI(activeServer.id);
      setMysqlUsers(response.data.DATA);
    } catch (error) {}
  };

  useEffect(() => {
    handleFetchMysqlUsers();
  }, [activeServer]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MySQL Users</CardTitle>
        <CardDescription>List of MySQL users</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search user ... " className="w-48" />
          <Button className="flex gap-2 items-center">
            <p>New</p>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[620px] rounded-md border"
        >
          <ResizablePanel defaultSize={15} className="p-2" minSize={15}>
            {mysqlUsers.length != 0 ? (
              mysqlUsers.map((user, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-primary rounded-md cursor-pointer transition-colors"
                  onClick={() => {
                    {
                      setSelectedUser(user), console.log(user);
                    }
                  }}
                >
                  {user.User}
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
                <ScrollArea className="h-[400px] w-full rounded-md border p-4 mt-4 dark:bg-neutral-900 bg-neutral-100">
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
                                  {privilege.split("_")[0]}
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
    </Card>
  );
};

export default UsersTab;
