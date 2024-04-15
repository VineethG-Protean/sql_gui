import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { getAllServersAPI } from "@/components/api/userApi";
import DatabaseTab from "@/components/tabs/databases-tab";
import TablesTab from "@/components/tabs/tables-tab";

const Database = () => {
  const user = useSelector((state: RootState) => state.user);
  const [authorized, setAuthorized] = useState<boolean>(true);
  const [servers, setServers] = useState<any[]>([]);
  const [tab, setTab] = useState<string>("databases");

  const handleFetchServers = async () => {
    const response = await getAllServersAPI();
    setServers(response.data.DATA);
  };

  const handleFetchDatabases = () => {};

  useEffect(() => {
    const checkAuthorization = async () => {
      if (
        user.role == "admin" ||
        user.role == "server_admin" ||
        user.role == "database_admin"
      ) {
        setAuthorized(true);
        handleFetchServers();
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
            <Tabs
              defaultValue="databases"
              className="w-[400px]"
              onValueChange={(e) => {
                setTab(e);
              }}
            >
              <TabsList>
                <TabsTrigger value="databases">Databases</TabsTrigger>
                <TabsTrigger value="tables">Tables</TabsTrigger>
              </TabsList>
            </Tabs>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Servers" />
              </SelectTrigger>
              <SelectContent>
                {servers.map((server, index) => (
                  <SelectItem key={index} value={server.id}>
                    {server.name}
                  </SelectItem>
                ))}
                {servers.length == 0 && (
                  <p className="p-2 text-xs text-center">No Servers Found</p>
                )}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue={tab} value={tab}>
            <TabsContent value="databases">
              <DatabaseTab />
            </TabsContent>
            <TabsContent value="tables">
              <TablesTab />
            </TabsContent>
          </Tabs>
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
export default Database;
