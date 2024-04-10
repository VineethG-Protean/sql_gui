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
import { CPU_Utilization } from "@/lib/interfaces";

const BUFFER_SIZE = 60;

const ServerCpu = () => {
  const { socket } = useSocket();
  const [cpuUtilization, setCpuUtilization] = useState<CPU_Utilization[]>([]);

  const handleServerDispatch = useCallback((data: any) => {
    setCpuUtilization((prev) => {
      const newCpuUtilization = [
        ...prev,
        { time: data.SECONDS, cpu: parseFloat(data.CPU_USAGE).toFixed(0) },
      ];
      return newCpuUtilization.slice(-BUFFER_SIZE);
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
        <CardTitle>CPU Utilization</CardTitle>
        <CardDescription>
          Graph describing CPU utilization of server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          {cpuUtilization.length == 0 ? (
            <div className="flex justify-center items-center h-56">
              <p className="font-semibold text-xl text-muted-foreground">
                No Server Selected
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cpuUtilization}>
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
                  dataKey="cpu"
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
export default ServerCpu;
