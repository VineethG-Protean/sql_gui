import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RefreshCcw } from "lucide-react";

import { Users } from "@/lib/interfaces";
import { updateUserAPI } from "../api/adminApi";

interface EditUserProps {
  dialogState: boolean;
  setDialogState: () => void;
  user: Users | undefined;
  fetchUsers: () => void;
}

const EditUserDialog: React.FC<EditUserProps> = ({
  user,
  dialogState,
  setDialogState,
  fetchUsers,
}) => {
  const { toast } = useToast();

  const formSchema = z.object({
    id: z.string().trim(),
    email: z.string().min(2).max(50).trim(),
    username: z.string().min(4).max(50).trim(),
    name: z.string().min(4).max(50).trim(),
    role: z.string().trim(),
    is_verified: z.boolean(),
    is_active: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      email: "",
      username: "",
      name: "",
      role: "",
      is_verified: false,
      is_active: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateUserAPI(values);
      setDialogState();
      toast({
        title: "User Action",
        description: "User details has been updated successfully",
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "User Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      form.setValue("id", user.id.toString());
      form.setValue("email", user.email);
      form.setValue("username", user.username);
      form.setValue("name", user.name);
      form.setValue("role", user.role);
      form.setValue("is_verified", user.is_verified);
      form.setValue("is_active", user.is_active);
    }
  }, [user]);

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update user data</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Email</FormLabel> */}
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_verified"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>User Verified</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>User Active</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="flex gap-2 items-center group"
                  >
                    <p>Update</p>
                    <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  </Button>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditUserDialog;
