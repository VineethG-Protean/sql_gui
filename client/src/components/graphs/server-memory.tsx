import { useSocket } from "@/components/providers/socket-provider";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label, AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

const BUFFER_SIZE = 60;

const ServerMemory = () => {
  const { socket } = useSocket();

  useEffect(() => {
    socket?.on("server_dispatch", (data: any) => {
      console.log(data);
      setMemoryUtilization((prev) => {
        const newMemoryUtilization = [
          ...prev,
          { time: data.SECONDS, memory: data.MEMORY_USAGE },
        ];
        return newMemoryUtilization.slice(-BUFFER_SIZE);
      });
    });

    return () => {
      socket?.off("server_dispatch");
    };
  }, [socket]);

  const [memoryUtilization, setMemoryUtilization] = useState<any[]>([]);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Memory Utilization</CardTitle>
          <CardDescription>
            Graph describing memory utilization of server
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={memoryUtilization}>
                <YAxis type="number" unit="%" width={40}>
                  {/* <Label value="Memory" position="insideLeft" angle={90} /> */}
                </YAxis>
                <Area
                  type="monotone"
                  strokeWidth={2}
                  dataKey="memory"
                  style={
                    {
                      stroke: "hsl(142.1 76.2% 36.3%)",
                      fill: "hsl(142.1 76.2% 36.3%)",
                    } as React.CSSProperties
                  }
                ></Area>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ServerMemory;
