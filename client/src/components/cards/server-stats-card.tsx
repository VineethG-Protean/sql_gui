import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { useSocket } from "../providers/socket-provider";
import io from "socket.io-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { connectToServerAPI, getServerStatsAPI } from "../api/serverApi";
import { convertSeconds } from "@/lib/utils";
import { Input } from "../ui/input";
import { getAllServersAPI } from "../api/userApi";
import { ServerStats } from "@/lib/interfaces";
import { Button } from "../ui/button";

const ServerStatsCard = () => {
  const { toast } = useToast();
  const { socket, setSocket } = useSocket();
  const [loading, setLoading] = useState<boolean>(false);
  const [servers, setServers] = useState<any[]>([]);
  const [serverStats, setServerStats] = useState<ServerStats>();

  const handleFetchServers = async () => {
    const response = await getAllServersAPI();
    setServers(response.data.DATA);
  };

  const handleSelectServer = async (server: any) => {
    const response = await connectToServerAPI(server);
    setLoading(true);
    if (response.status === 200) {
      toast({
        title: "Connection Status",
        description: "Successful",
      });
      handleSocketConnection(server);
      const response = await getServerStatsAPI(server);
      if (response.status === 200) {
        toast({
          title: "Data Retrival",
          description: "Successful",
        });
        setServerStats(response.data.DATA);
      } else {
        toast({
          title: "Data Retrival",
          description: "Failed",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Connection Status",
        description: "Failed",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSocketConnection = (id: string) => {
    const server = servers.find((server) => server.id == id);
    const socket = io(`${server.protocol}://${server.host}:${server.port}`);
    setSocket(socket);
  };

  const handleDisconnectServer = () => {
    setServerStats(undefined);
    socket?.disconnect();
  };

  useEffect(() => {
    handleFetchServers();
  }, []);

  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
          <CardDescription>Overall server status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-full">
            <div
              className={`flex ${
                serverStats ? `justify-between` : `justify-end`
              }`}
            >
              {serverStats && (
                <Button
                  size="default"
                  variant="destructive"
                  onClick={handleDisconnectServer}
                >
                  Disconnect
                </Button>
              )}
              <Select onValueChange={handleSelectServer}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Servers" />
                </SelectTrigger>
                <SelectContent>
                  {servers.map((server, index) => (
                    <SelectItem key={index} value={server.id}>
                      {server.name}
                    </SelectItem>
                  ))}
                  {servers.length == 0 && <p className="p-2 text-xs text-center">No Servers Found</p>}
                </SelectContent>
              </Select>
            </div>
            {serverStats && !loading ? (
              <>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center w-full">
                    <span className="flex flex-col gap-1 w-1/2">
                      <p className="text-muted-foreground text-xs font-bold">
                        VERSION
                      </p>
                      <p className="font-extrabold text-primary text-xl">
                        {serverStats.VERSION}
                      </p>
                    </span>

                    <span className="flex flex-col gap-1 w-1/2">
                      <p className="text-muted-foreground text-xs font-bold">
                        UPTIME
                      </p>
                      <p className="font-extrabold text-primary text-xl">
                        {convertSeconds(parseInt(serverStats.UPTIME)).hours} hrs
                        &nbsp;
                        {convertSeconds(parseInt(serverStats.UPTIME)).minutes}
                        min
                      </p>
                    </span>
                  </div>

                  <div className="border border-muted rounded-md p-4 flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-950">
                    <span className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-xs font-bold">
                        BASE DIR
                      </p>
                      <Input value={serverStats.BASE_DIR} />
                    </span>

                    <span className="flex flex-col gap-1">
                      <p className="text-muted-foreground text-xs font-bold">
                        DATA DIR
                      </p>
                      <Input value={serverStats.BASE_DIR} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col mt-4 border rounded-md">
                  <p className="font-semibold text-muted-foreground text-sm p-2 border-b text-center bg-neutral-100 dark:bg-neutral-950 rounded-t-md">
                    List of available databases
                  </p>
                  <div className="px-4 py-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Database</TableHead>
                          <TableHead>Size</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {serverStats.SIZE.map((database, index) => (
                          <TableRow key={index}>
                            <TableCell>{database.Database}</TableCell>
                            <TableCell>
                              {parseFloat(database.Size).toFixed(2)} MB
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </>
            ) : loading ? (
              <Skeleton className="w-full h-56 rounded-md mt-4 bg-zinc-800" />
            ) : (
              <div className="flex justify-center items-center h-56">
                <p className="font-semibold text-xl text-muted-foreground">
                  No Server Selected
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default ServerStatsCard;
