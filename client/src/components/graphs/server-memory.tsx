import { useSocket } from "@/components/providers/socket-provider";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { Memory_Utilization } from "@/lib/interfaces";

const BUFFER_SIZE = 60;

const ServerMemory = () => {
  const { socket } = useSocket();
  const [memoryUtilization, setMemoryUtilization] = useState<
    Memory_Utilization[]
  >([]);

  const handleServerDispatch = useCallback((data: any) => {
    setMemoryUtilization((prev) => {
      const newMemoryUtilization = [
        ...prev,
        {
          time: data.SECONDS,
          memory: parseFloat(data.MEMORY_USAGE).toFixed(0),
        },
      ];
      return newMemoryUtilization.slice(-BUFFER_SIZE);
    });
  }, []);

  const onServerDispatch = useMemo(
    () => handleServerDispatch,
    [handleServerDispatch]
  );

  useEffect(() => {
    socket?.on("server_dispatch", onServerDispatch);
    return () => {
      socket?.off("server_dispatch");
    };
  }, [socket]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Utilization</CardTitle>
        <CardDescription>
          Graph describing memory utilization of server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-64">
          {memoryUtilization.length == 0 ? (
            <div className="flex justify-center items-center h-56">
              <p className="font-semibold text-xl text-muted-foreground">
                No Server Selected
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryUtilization}>
                <defs>
                  <linearGradient id="colorgreen" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#16a34a"
                      stopOpacity={0.8}
                    ></stop>
                    <stop
                      offset="95%"
                      stopColor="#16a34a"
                      stopOpacity={0}
                    ></stop>
                  </linearGradient>
                </defs>
                <Tooltip />
                <Area
                  type="monotone"
                  strokeWidth={2}
                  dataKey="memory"
                  fillOpacity={1}
                  fill="url(#colorgreen)"
                ></Area>
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerMemory;
