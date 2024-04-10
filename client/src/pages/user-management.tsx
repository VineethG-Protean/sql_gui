import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, Lock, Pen, PlusCircle, Trash } from "lucide-react";

import CreateUserDialog from "@/components/dialogs/create-user-dialog";
import { deleteUserAPI, getAllUsersAPI } from "@/components/api/adminApi";
import { Users } from "@/lib/interfaces";
import { useToast } from "@/components/ui/use-toast";

const UserManagement = () => {
  const user = useSelector((state: RootState) => state.user);
  const { toast } = useToast();

  const [users, setUser] = useState<Users[]>([]);
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [createUserDialogState, setCreateUserDialogState] =
    useState<boolean>(false);

  const handleFetchUsers = async () => {
    const response = await getAllUsersAPI();
    setUser(response.data.DATA);
  };

  const handleDeleteUsers = async (id: number) => {
    const response = await deleteUserAPI(id);
    if (response.status == 201)
      toast({
        title: "User Action",
        description: "User has been removed successfully",
      });
  };

  useEffect(() => {
    if (user.role == "admin") {
      setAuthorized(true);
      handleFetchUsers();
    } else {
      setAuthorized(false);
    }
  }, []);

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
              onClick={() => setCreateUserDialogState(!createUserDialogState)}
            >
              <p>New</p>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

          <CreateUserDialog
            dialogState={createUserDialogState}
            setDialogState={() =>
              setCreateUserDialogState(!createUserDialogState)
            }
          />

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage your users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell className="flex gap-4 items-center">
                        <Pen className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                        <Trash
                          onClick={() => handleDeleteUsers(user.id)}
                          className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
                        />
                        <Info className="h-4 w-4 cursor-pointer hover:text-primary transition-colors" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {users.length == 0 && (
                <div className="p-5 text-center text-xl text-muted-foreground font-semibold w-full">
                  No Servers Found
                </div>
              )}
            </CardContent>
          </Card>
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
export default UserManagement;
