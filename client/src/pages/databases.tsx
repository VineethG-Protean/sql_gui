import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";

import {
  getMysqlDatabaseInfoAPI,
  getMysqlDatabasesAPI,
  getMysqlDatabaseUsersAPI,
} from "@/components/api/mysqlDatabaseApi";

import DatabasePageHeader from "@/components/databases-page/header";
import DatabasePageList from "@/components/databases-page/database-list";

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
import { useToast } from "@/components/ui/use-toast";
import DatabasePageInfo from "@/components/databases-page/database-info";

const Databases = () => {
  const { toast } = useToast();
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [mysqlDatabases, setMysqlDatabases] = useState<any[]>([]);
  const [databaseInfo, setDatabaseInfo] = useState<{
    characterSet: string;
    collation: string;
    encryption: string;
    name: string;
  }>();
  const [databaseUsers, setDatabaseUsers] = useState<any[]>([]);

  const handleFetchMysqlDatabases = async () => {
    try {
      const response = await getMysqlDatabasesAPI({
        server_id: activeServer.id!,
      });
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

  const handleFetchMysqlDatabaseInfo = async (databaseName: string) => {
    try {
      const schema = await getMysqlDatabaseInfoAPI({
        server_id: activeServer.id!,
        databaseName,
      });
      setDatabaseInfo(schema.data.DATA);
      const users = await getMysqlDatabaseUsersAPI({
        server_id: activeServer.id!,
        databaseName,
      });
      setDatabaseUsers(users.data.DATA);
      toast({
        title: "Server Action",
        description: "Schema has been fetched successfully.",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (activeServer.id) handleFetchMysqlDatabases();
  }, [activeServer]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MySQL Databases</CardTitle>
        <CardDescription>List of MySQL databases</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 h-full">
        <DatabasePageHeader
          handleFetchMysqlDatabases={handleFetchMysqlDatabases}
        />

        <ResizablePanelGroup
          direction="horizontal"
          className="h-[calc(100vh-14.5rem)] rounded-md border"
        >
          <ResizablePanel
            defaultSize={15}
            className="p-2"
            minSize={0}
            maxSize={25}
          >
            <DatabasePageList
              databases={mysqlDatabases}
              handleFetchMysqlDatabaseInfo={handleFetchMysqlDatabaseInfo}
              handleFetchMysqlDatabases={handleFetchMysqlDatabases}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={85} minSize={40} className="p-4">
            <DatabasePageInfo
              databaseInfo={databaseInfo!}
              databaseUsers={databaseUsers}
              databases={mysqlDatabases}
              handleFetchMysqlDatabaseInfo={handleFetchMysqlDatabaseInfo}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default Databases;
