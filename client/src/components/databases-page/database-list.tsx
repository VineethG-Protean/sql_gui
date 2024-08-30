import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import { dropMysqlDatabaseAPI } from "../api/mysqlDatabaseApi";

import { LucideTable, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useToast } from "../ui/use-toast";

interface DatabasePageListProps {
  databases: any[];
  handleFetchMysqlDatabases: () => void;
  handleFetchMysqlDatabaseInfo: (databaseName: string) => void;
}

export default function DatabasePageList({
  databases,
  handleFetchMysqlDatabases,
  handleFetchMysqlDatabaseInfo,
}: DatabasePageListProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const activeServer = useSelector((state: RootState) => state.activeServer);

  const [dropDatabaseAlertState, setDropDatabaseAlertState] =
    useState<boolean>(false);
  const [selectedDatabase, setSelectedDatabase] = useState<string>("");

  async function handleDropDatabase(databaseName: string) {
    try {
      await dropMysqlDatabaseAPI({
        server_id: activeServer.id!,
        databaseName,
      });
      handleFetchMysqlDatabases();
      toast({
        title: "Server Action",
        description: "Database has been dropped successfully.",
      });
    } catch (error) {
      toast({
        title: "Server Action",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-17rem)] pe-3">
        {databases.length != 0 ? (
          <div className="flex flex-col gap-1">
            {databases.map((db, index) => (
              <div
                key={index}
                className="px-4 py-2 flex justify-between items-center group hover:bg-muted rounded-md cursor-pointer transition-colors"
                onClick={() => handleFetchMysqlDatabaseInfo(db.Database)}
              >
                <p className="text-xs">{db.Database}</p>

                <div className="flex gap-2 items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Trash
                          className="h-4 w-4 group-hover:block hidden"
                          onClick={(e) => [
                            e.stopPropagation(),
                            setDropDatabaseAlertState(!dropDatabaseAlertState),
                            setSelectedDatabase(db.Database),
                          ]}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-muted text-muted-foreground"
                      >
                        <p>Drop Database</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <LucideTable
                          className="h-4 w-4 group-hover:block hidden"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/database/${db.Database}`);
                          }}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-muted text-muted-foreground"
                      >
                        <p>View Tables</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="h-full w-full flex justify-center items-center text-muted-foreground text-2xl">
            No databases found
          </p>
        )}
      </ScrollArea>
      <AlertDialog
        open={dropDatabaseAlertState}
        onOpenChange={() => setDropDatabaseAlertState(!dropDatabaseAlertState)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              database and the data present in database from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDropDatabase(selectedDatabase)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
