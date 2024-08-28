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
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getServerCharSet } from "../api/serverApi";
import { createMysqlDatabaseAPI } from "../api/mysqlDatabaseApi";

interface AddMySqlDatabaseDialogProps {
  dialogState: boolean;
  setDialogState: () => void;
  fetchMysqlDatabases: () => void;
}

const AddMySqlDatabaseDialog: React.FC<AddMySqlDatabaseDialogProps> = ({
  dialogState,
  setDialogState,
  fetchMysqlDatabases,
}) => {
  const { toast } = useToast();

  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [chartSet, setChartSet] = useState<any[]>([]);
  const [collation, setCollations] = useState<any[]>([]);

  const formSchema = z.object({
    server_id: z.number(),
    name: z.string(),
    characterSet: z.string().min(2).max(50).trim(),
    collation: z.string().min(4).max(50).trim(),
    encryption: z.string(),
    engine: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      server_id: activeServer.id!,
      name: "",
      characterSet: "utf8mb4",
      collation: "utf8mb4_0900_ai_ci",
      encryption: "N",
      engine: "InnoDB",
    },
  });

  async function handleCreateDatabase(values: z.infer<typeof formSchema>) {
    try {
      form.setValue("server_id", activeServer.id!);
      await createMysqlDatabaseAPI(values);
      fetchMysqlDatabases();
      form.reset();
      toast({
        title: "Server Action",
        description: "Database created successfully.",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong while creating database.",
        variant: "destructive",
      });
    }
  }

  async function handleFetchCharSet() {
    try {
      const response = await getServerCharSet(activeServer.id!);
      setChartSet(response.data.DATA.CHARACTER_SET[0]);
      setCollations(response.data.DATA.COLLATION[0]);
    } catch (error) {
      toast({
        title: "Server Action",
        description:
          "Something went wrong while fetching charset and collat list.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (activeServer.id && dialogState) handleFetchCharSet();
  }, [dialogState]);

  useEffect(() => {
    form.setValue("server_id", activeServer.id!);
  }, [activeServer]);

  return (
    <>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Database</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleCreateDatabase)}
                  className="flex flex-col gap-3 mt-4"
                >
                  <FormField
                    control={form.control}
                    name="server_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Server" {...field} disabled />
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
                    name="characterSet"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="CharSet" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {chartSet.map((val, index) => (
                              <SelectItem value={val.Charset} key={index}>
                                <p>{val.Charset}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  {val.Description}
                                </p>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="collation"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Collation" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {collation.map((val, index) => (
                              <SelectItem value={val.Collation} key={index}>
                                <p>{val.Collation}</p>
                                <p className="text-[10px] text-muted-foreground">
                                  {val.Charset}
                                </p>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="encryption"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Encryption" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Y">Yes</SelectItem>
                            <SelectItem value="N">No</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engine"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Engine" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="InnoDB">InnoDB</SelectItem>
                            <SelectItem value="MyISAM">MyISAM</SelectItem>
                            <SelectItem value="Memory">Memory</SelectItem>
                            <SelectItem value="CSV">CSV</SelectItem>
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

export default AddMySqlDatabaseDialog;
