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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface AddMySqlDatabaseDialogProps {
  server_id: string;
  dialogState: boolean;
  setDialogState: () => void;
  fetchMysqlDatabases: () => void;
}

const AddMySqlDatabaseDialog: React.FC<AddMySqlDatabaseDialogProps> = ({
  server_id,
  dialogState,
  setDialogState,
  fetchMysqlDatabases,
}) => {
  const { toast } = useToast();

  const formSchema = z.object({
    server_id: z.string(),
    name: z.string(),
    characterSet: z.string().min(2).max(50).trim(),
    collat: z.string().min(4).max(50).trim(),
    encryption: z.string(),
    engine: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server_id: server_id,
      name: "",
      characterSet: "",
      collat: "",
      encryption: "",
      engine: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Database</DialogTitle>
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
                    name="characterSet"
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
                    name="collat"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Collat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="encryption"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Encryption" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engine"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Engine" {...field} />
                        </FormControl>
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

export default AddMySqlDatabaseDialog;
