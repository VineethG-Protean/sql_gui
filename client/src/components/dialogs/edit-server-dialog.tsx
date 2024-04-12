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
import { RefreshCcw } from "lucide-react";

import { Servers } from "@/lib/interfaces";
import { updateServerAPI } from "../api/adminApi";

interface EditUserProps {
  dialogState: boolean;
  setDialogState: () => void;
  server: Servers | undefined;
  fetchServers: () => void;
}

const EditServerDialog: React.FC<EditUserProps> = ({
  server,
  dialogState,
  setDialogState,
  fetchServers,
}) => {
  const { toast } = useToast();

  const formSchema = z.object({
    id: z.string().trim(),
    name: z.string().trim(),
    protocol: z.string().trim(),
    host: z.string().min(2).max(50).trim(),
    port: z.string().max(4).trim(),
    username: z.string().min(4).max(50).trim(),
    password: z.string().min(8).max(50).trim(),
    type: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      protocol: "",
      host: "",
      port: "",
      username: "",
      password: "",
      type: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateServerAPI(values);
      setDialogState();
      toast({
        title: "Server Action",
        description: "Server details has been updated successfully",
      });
      fetchServers();
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (server) {
      form.setValue("id", server.id.toString());
      form.setValue("name", server.name);
      form.setValue("protocol", server.protocol);
      form.setValue("host", server.host);
      form.setValue("port", server.port.toString());
      form.setValue("username", server.username);
      form.setValue("password", server.password);
      form.setValue("type", server.type);
    }
  }, [server]);

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update server details</DialogTitle>
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
                        <FormLabel>Server Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="protocol"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Protocol</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Protocol" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="http">http</SelectItem>
                            <SelectItem value="https">https</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Host" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port</FormLabel>
                        <FormControl>
                          <Input placeholder="Port" {...field} />
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Server Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mysql">MySQL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
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

export default EditServerDialog;
