import { useSocket } from "@/components/providers/socket-provider";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const BUFFER_SIZE = 60;

const ServerMemory = () => {
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("server_dispatch", (data: any) => {
      console.log(data);
      setMemoryUtilization((prev) => {
        const newMemoryUtilization = [
          ...prev,
          {
            time: data.SECONDS,
            memory: parseFloat(data.MEMORY_USAGE).toFixed(2),
          },
        ];
        return newMemoryUtilization.slice(-BUFFER_SIZE);
      });
    });

    return () => {
      socket?.off("server_dispatch");
    };
  }, []);

  const [memoryUtilization, setMemoryUtilization] = useState<any[]>([]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Utilization</CardTitle>
        <CardDescription>
          Graph describing memory utilization of server
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={memoryUtilization}>
              <defs>
                <linearGradient id="colorgreen" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="#16a34a"
                    stopOpacity={0.8}
                  ></stop>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}></stop>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ServerMemory;
