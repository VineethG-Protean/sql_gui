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
import {
  AtSign,
  Info,
  Lock,
  Mail,
  Pen,
  PlusCircle,
  Trash,
  User,
} from "lucide-react";

import CreateUserDialog from "@/components/dialogs/create-user-dialog";
import { deleteUserAPI, getAllUsersAPI } from "@/components/api/adminApi";
import { Users } from "@/lib/interfaces";
import { useToast } from "@/components/ui/use-toast";
import EditUserDialog from "@/components/dialogs/edit-user-dialog";
import { formatDate } from "@/lib/utils";

const popover_icons = [
  {
    icon: <AtSign className="w-3 h-3 mt-1 text-primary" />,
    value: "username",
  },
  {
    icon: <Mail className="w-3 h-3 mt-1 text-primary" />,
    value: "email",
  },
];

const UserManagement = () => {
  const user = useSelector((state: RootState) => state.user);
  const { toast } = useToast();

  const [authorized, setAuthorized] = useState<boolean>(false);
  const [users, setUser] = useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = useState<Users>();
  const [createUserDialogState, setCreateUserDialogState] =
    useState<boolean>(false);
  const [editUserDialogState, setEditUserDialogState] =
    useState<boolean>(false);

  const handleFetchUsers = async () => {
    const response = await getAllUsersAPI();
    setUser(response.data.DATA);
  };

  const handleDeleteUsers = async (id: number) => {
    try {
      await deleteUserAPI(id);
      toast({
        title: "User Action",
        description: "User has been deleted successfully",
      });
      handleFetchUsers();
    } catch (error) {
      toast({
        title: "User Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      if (user.role == "admin") {
        setAuthorized(true);
        await handleFetchUsers();
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
              onClick={() => setCreateUserDialogState(!createUserDialogState)}
            >
              <p>New</p>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>

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
                    <TableHead>Created</TableHead>
                    <TableHead>Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index} className="group">
                      <TableCell className="flex gap-2 items-center">
                        <User className="w-4 h-4" />
                        {user.name}
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell>{formatDate(user.modified_at)}</TableCell>
                      <TableCell className="flex gap-4 items-center group-hover:visible invisible transition-all duration-250">
                        <Pen
                          className="h-4 w-4 cursor-pointer hover:text-primary transition-colors"
                          onClick={() => [
                            setEditUserDialogState(true),
                            setSelectedUser(user),
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
                                permanently delete the user and remove data from
                                the server.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteUsers(user.id)}
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
                                <User className="h-10 w-10" />
                              </div>
                              <div className="w-full">
                                <div className="flex gap-2 mb-1 items-center">
                                  <p className="font-semibold text-lg">
                                    {user.name}
                                  </p>
                                  <p className="flex justify-center items-center text-muted-foreground capitalize border border-muted text-[12px] rounded-md px-3 py-0.5">
                                    {user.role}
                                  </p>
                                </div>

                                <div className="flex flex-col border border-muted p-2 rounded-md">
                                  {popover_icons.map((icon, index) => (
                                    <span
                                      className="flex gap-2 items-center text-xs font-light text-muted-foreground"
                                      key={index}
                                    >
                                      {icon.icon}
                                      <p>{user[icon.value as keyof Users]}</p>
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
              {users.length == 0 && (
                <div className="p-5 text-center text-xl text-muted-foreground font-semibold w-full">
                  No Users Found
                </div>
              )}
            </CardContent>
          </Card>

          <CreateUserDialog
            dialogState={createUserDialogState}
            setDialogState={() =>
              setCreateUserDialogState(!createUserDialogState)
            }
            fetchUsers={handleFetchUsers}
          />

          <EditUserDialog
            user={selectedUser}
            dialogState={editUserDialogState}
            setDialogState={() => setEditUserDialogState(!editUserDialogState)}
            fetchUsers={handleFetchUsers}
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
export default UserManagement;
