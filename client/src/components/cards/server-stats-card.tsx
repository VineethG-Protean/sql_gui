import { useEffect, useState } from "react";

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

import { getDBServerStatusAPI } from "../api/dbServerApi";
import { convertSeconds } from "@/lib/utils";
import { Input } from "../ui/input";

interface ServerStatsInterface {
  BASE_DIR: string;
  DATA_DIR: string;
  SIZE: any[];
  UPTIME: string;
  VERSION: string;
}

const ServerStatsCard = () => {
  const [serverStats, setServerStats] = useState<ServerStatsInterface>();

  const handleDBServerStatus = async () => {
    const response = await getDBServerStatusAPI();
    setServerStats(response.data.DATA);
  };

  useEffect(() => {
    handleDBServerStatus();
  }, []);
  return (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle>Server Status</CardTitle>
          <CardDescription>Overall server status</CardDescription>
        </CardHeader>
        <CardContent>
          {serverStats && (
            <>
              <div className="flex flex-col gap-3">
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
                      {convertSeconds(parseInt(serverStats.UPTIME)).minutes} min
                    </p>
                  </span>
                </div>

                <div className="border border-muted rounded-md p-4 flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-950">
                  <span className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-xs font-bold">
                      BASE DIR
                    </p>
                    <Input value={serverStats.BASE_DIR}/>
                  </span>

                  <span className="flex flex-col gap-1">
                    <p className="text-muted-foreground text-xs font-bold">
                      DATA DIR
                    </p>
                    <Input value={serverStats.BASE_DIR}/>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default ServerStatsCard;
