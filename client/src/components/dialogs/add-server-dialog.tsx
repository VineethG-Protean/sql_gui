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
import { Server } from "lucide-react";
import { addServerAPI } from "../api/adminApi";
import { useToast } from "../ui/use-toast";

interface AddServerDialogProps {
  dialogState: boolean;
  setDialogState: () => void;
  fetchServers: () => void;
}

const AddServerDialog: React.FC<AddServerDialogProps> = ({
  dialogState,
  setDialogState,
  fetchServers,
}) => {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().max(50).trim(),
    protocol: z.string().trim(),
    host: z.string().min(2).max(50).trim(),
    port: z.string().trim(),
    username: z.string().min(4).max(50).trim(),
    password: z.string().min(4).max(50).trim(),
    type: z.string().trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      await addServerAPI(values);
      setDialogState();
      toast({
        title: "Server Action",
        description: "Server has been added successfully",
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

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new server</DialogTitle>
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
                          <Input placeholder="Server name" {...field} />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Server protocol" />
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
                        <FormControl>
                          <Input placeholder="Host address" {...field} />
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
                        <FormControl>
                          <Input placeholder="Username" {...field} />
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
                          <Input
                            placeholder="Password"
                            {...field}
                            type="password"
                          />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Server Type" />
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

                  <Button type="submit" className="flex gap-2 items-center">
                    <p>Add</p>
                    <Server className="w-4 h-4" />
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

export default AddServerDialog;
