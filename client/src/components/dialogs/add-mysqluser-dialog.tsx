import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { useToast } from "../ui/use-toast";
import { createMysqlUserAPI } from "../api/mysqlUserApi";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddMySqlUserDialogProps {
  server_id: string;
  dialogState: boolean;
  setDialogState: () => void;
  fetchMysqlUsers: () => void;
}

const TABLE_PRIVILEGES = [
  {
    name: "SELECT",
  },
  {
    name: "INSERT",
  },
  {
    name: "UPDATE",
  },
  {
    name: "DELETE",
  },
  {
    name: "CREATE",
  },
  {
    name: "ALTER",
  },
  {
    name: "INDEX",
  },
  {
    name: "REFERENCES",
  },
];

const AddMySqlUserDialog: React.FC<AddMySqlUserDialogProps> = ({
  server_id,
  dialogState,
  setDialogState,
  fetchMysqlUsers,
}) => {
  const { toast } = useToast();
  const [selectedDatabases, setSelectedDatabases] = useState<any[]>([]);
  const [privileges, setPrivileges] = useState<any[]>([]);

  const formSchema = z.object({
    server_id: z.string(),
    name: z.string().min(2).max(50).trim(),
    password: z.string().min(4).max(50).trim(),
    host: z.string().min(4).max(50).trim(),
    database: z.string(),
    privileges: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server_id: server_id,
      name: "",
      password: "",
      host: "",
      database: "",
      privileges: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await createMysqlUserAPI({ ...values });
      setDialogState();
      toast({
        title: "Server Action",
        description: "User has been created",
      });
      fetchMysqlUsers();
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
      });
    }
  };

  useEffect(() => {
    form.setValue("privileges", privileges);
    form.setValue("server_id", server_id.toString());
  }, [privileges]);

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new user</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 mt-4"
                >
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Host" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="database"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Database" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span className="flex flex-wrap gap-2">
                    {privileges.map((priv, index) => (
                      <div className="border border-muted rounded-md px-2 py-0.5 flex gap-2 items-center">
                        <p
                          key={index}
                          className=" text-[10px] font-semibold tracking-wider text-white"
                        >
                          {priv}
                        </p>

                        <X
                          onClick={() =>
                            setPrivileges(
                              privileges.filter((value, _) => value !== priv)
                            )
                          }
                          className="w-3 h-3 cursor-pointer"
                        />
                      </div>
                    ))}
                  </span>
                  <FormField
                    control={form.control}
                    name="privileges"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(e) => {
                            if (!privileges.includes(e))
                              setPrivileges((prev) => [...prev, e]);
                            field.onChange;
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Privileges" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TABLE_PRIVILEGES.map((priv, index) => (
                              <SelectItem value={priv.name} key={index}>
                                {priv.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="flex gap-2 items-center">
                    <p>Add</p>
                    <Plus className="w-4 h-4" />
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

export default AddMySqlUserDialog;
