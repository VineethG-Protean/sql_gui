import { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getMysqlTableInfoAPI,
  getMysqlTablesAPI,
} from "@/components/api/mysqlTableApi";
import {
  dropMysqlTableDataAPI,
  getMysqlTableDataAPI,
} from "@/components/api/mysqlTableDataApi";

import { Pencil, PlusCircle, Trash } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Button } from "@/components/ui/button";

const TablesTab = () => {
  const { name } = useParams();
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [tables, setTables] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");

  const [tab, setTab] = useState<string>("schema");

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

  async function handleFetchTableData(tableName: string) {
    if (name)
      try {
        const response = await getMysqlTableDataAPI({
          server_id: activeServer.id!,
          databaseName: name,
          tableName,
        });

        setTableData(response.data.DATA[0]);
      } catch (error) {
        console.log(error);
      }
  }

  async function handleDropRow(column: string, value: string) {
    if (name)
      try {
        await dropMysqlTableDataAPI({
          server_id: activeServer.id!,
          databaseName: name,
          tableName: selectedTable,
          row: {
            name: column,
            value,
          },
        });
        handleFetchTableData(selectedTable);
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    if (activeServer.id && name) handleFetchTables();
  }, []);

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Tables</CardTitle>
        <CardDescription>List of tables found in '{name}'</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className=" rounded-md border"
        >
          <ResizablePanel defaultSize={25} className="p-2">
            <ScrollArea className="h-[calc(100vh-14.5rem)] pe-3">
              {tables.length !== 0 ? (
                <div className="flex flex-col gap-1">
                  {tables.map((table, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleFetchTableInfo(table[`Tables_in_${name!}`]);
                        handleFetchTableData(table[`Tables_in_${name!}`]);
                        setSelectedTable(table[`Tables_in_${name!}`]);
                      }}
                      className={`px-4 py-2 flex justify-between items-center group hover:bg-muted rounded-md cursor-pointer transition-colors ${
                        selectedTable === table[`Tables_in_${name!}`]
                          ? "bg-muted"
                          : ""
                      }`}
                    >
                      <p className="text-xs">{table[`Tables_in_${name!}`]}</p>

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
                </div>
              ) : (
                <p className="h-full w-full flex justify-center items-center text-muted-foreground text-2xl">
                  No tables found
                </p>
              )}
            </ScrollArea>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="p-2 overflow-x-auto">
            <div className="flex justify-between items-center pb-2">
              <div className="flex gap-2">
                <p
                  className={`px-4 py-1 rounded-md cursor-pointer border ${
                    tab === "schema" ? "bg-muted" : ""
                  }`}
                  onClick={() => setTab("schema")}
                >
                  Schema
                </p>
                <p
                  className={`px-4 py-1 rounded-md cursor-pointer border ${
                    tab === "data" ? "bg-muted" : ""
                  }`}
                  onClick={() => setTab("data")}
                >
                  Data
                </p>
              </div>
              {tab === "data" && (
                <Button className="flex gap-2">
                  <p>Add Column</p>
                  <PlusCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            <ScrollArea className="h-[calc(100vh-17rem)] border rounded-md p-2">
              {tab === "schema" ? (
                columns.length !== 0 ? (
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
                ) : (
                  <p className="text-center text-muted-foreground text-2xl mt-[25%]">
                    Please select a table
                  </p>
                )
              ) : tableData.length !== 0 ? (
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      {Object.entries(tableData[0]).map(([key, _]: any) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.map((data, index) => (
                      <TableRow key={index} className="relative group">
                        {Object.entries(data).map(([key, value]: any) => (
                          <TableCell key={key} className="">
                            {value}
                          </TableCell>
                        ))}

                        <span
                          className="absolute right-0 top-2 bg-muted p-1 rounded-md hidden group-hover:flex cursor-pointer hover:bg-destructive"
                          onClick={() => {
                            const [firstKey, firstValue] =
                              Object.entries(data)[index];
                            handleDropRow(firstKey, firstValue as any);
                          }}
                        >
                          <Trash className="h-3 w-3" />
                        </span>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-center text-muted-foreground text-2xl mt-[25%]">
                  Please select a table
                </p>
              )}
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default TablesTab;
