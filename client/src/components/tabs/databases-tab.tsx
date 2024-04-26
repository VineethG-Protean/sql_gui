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
import { useToast } from "../ui/use-toast";
import { getMysqlDatabaseSchemaAPI, getMysqlDatabasesAPI } from "../api/mysqlDatabaseApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

const DatabaseTab = () => {
  const { toast } = useToast();
  const activeServer = useSelector((state: RootState) => state.activeServer);
  const [mysqlDatabases, setMysqlDatabases] = useState<any[]>([]);
  const [databaseSchema, setDatabaseSchema] = useState<{ characterSet: string, collation: string, encryption: string, name: string }>();

  const handleFetchMysqlDatabases = async () => {
    try {
      const response = await getMysqlDatabasesAPI({ server_id: activeServer.id });
      setMysqlDatabases(response.data.DATA[0]);
      toast({
        title: "Server Action",
        description: "Databases has been fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleFetchMysqlDatabaseSchema = async (dbName: string) => {
    try {
      const response = await getMysqlDatabaseSchemaAPI({ server_id: activeServer.id, dbName })
      setDatabaseSchema(response.data.DATA);
      toast({
        title: "Server Action",
        description: "Schema has been fetched successfully",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    if (activeServer.id) handleFetchMysqlDatabases();
  }, [activeServer]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MySQL Users</CardTitle>
        <CardDescription>List of MySQL users</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <Input placeholder="Search database ... " className="w-48" />
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
            {mysqlDatabases.length != 0 ? (
              mysqlDatabases.map((db, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-primary rounded-md cursor-pointer transition-colors"
                  onClick={() => handleFetchMysqlDatabaseSchema(db.Database)}
                >{db.Database}</div>
              ))
            ) : (
              <p className="h-full w-full flex justify-center items-center text-muted-foreground text-3xl">
                No databases found
              </p>
            )}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={85}
            minSize={40}
            className="p-4"
          >
            <div className="flex justify-between flex-wrap border border-muted px-4 py-6 rounded-md">
              {databaseSchema && Object.entries(databaseSchema).map(([key, value]) => (
                <span >
                  <p className="uppercase font-semibold text-muted-foreground text-md">{key}</p>
                  <p className="text-sm text-primary font-bold">{value}</p>
                </span>
              ))}
            </div>

          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default DatabaseTab;
