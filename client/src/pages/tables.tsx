import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getMysqlTableInfoAPI,
  getMysqlTablesAPI,
} from "@/components/api/mysqlTableApi";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pencil, Trash } from "lucide-react";

const TablesTab = () => {
  const { name } = useParams();
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [tables, setTables] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  async function handleFetchTables() {
    if (name)
      try {
        const response = await getMysqlTablesAPI({
          server_id: activeServer.id!,
          databaseName: name,
        });
        setTables(response.data.DATA[0]);
      } catch (error) {
        console.log(error);
      }
  }

  async function handleFetchTableInfo(tableName: string) {
    if (name)
      try {
        const response = await getMysqlTableInfoAPI({
          server_id: activeServer.id!,
          databaseName: name,
          tableName,
        });
        setColumns(response.data.DATA[0]);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    if (activeServer.id && name) handleFetchTables();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tables</CardTitle>
        <CardDescription>List of tables found in '{name}'</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[480px] rounded-md border"
        >
          <ResizablePanel defaultSize={25} className="p-2">
            <ScrollArea className="h-[calc(100vh-14.5rem)] pe-3">
              {tables.map((table, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleFetchTableInfo(table[`Tables_in_${name!}`])
                  }
                  className="px-4 py-2 flex justify-between items-center group hover:bg-primary rounded-md cursor-pointer transition-colors"
                >
                  <p>{table[`Tables_in_${name!}`]}</p>

                  <div className="hidden group-hover:flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Pencil
                            className="h-4 w-4"
                            onClick={(e) => [e.stopPropagation()]}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-muted text-muted-foreground"
                        >
                          <p>Update Table</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Trash
                            className="h-4 w-4 group-hover:block hidden"
                            onClick={(e) => [e.stopPropagation()]}
                          />
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="bg-muted text-muted-foreground"
                        >
                          <p>Drop Table</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="p-2">
            <ScrollArea className="h-[450px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Field</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Null</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead>Extra</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columns.map((column, index) => (
                    <TableRow key={index}>
                      <TableCell>{column.Field}</TableCell>
                      <TableCell>{column.Type}</TableCell>
                      <TableCell>{column.Key}</TableCell>
                      <TableCell>{column.Null}</TableCell>
                      <TableCell>{column.Default}</TableCell>
                      <TableCell>{column.Extra}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default TablesTab;
