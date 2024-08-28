import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { setActiveServer } from "@/store/slices/activeServerSlice";

import AddMySqlDatabaseDialog from "../dialogs/add-mysqldatabase-dialog";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface DatabasePageHeaderProps {
  handleFetchMysqlDatabases: () => void;
}

export default function DatabasePageHeader({
  handleFetchMysqlDatabases,
}: DatabasePageHeaderProps) {
  const activeServer = useSelector((state: RootState) => state.activeServer);
  const servers = useSelector((state: RootState) => state.servers);
  const dispatch = useDispatch();

  const [addMysqlDatabaseDialogState, setAddMysqlDatabaseDialogState] =
    useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <Input placeholder="Search database ... " className="w-1/3" />
        <div className="flex gap-2">
          <Select
            defaultValue={activeServer.id?.toString()}
            onValueChange={(e) => {
              const server = servers.find(
                (server, _) => server.id?.toString() === e
              );
              if (server) dispatch(setActiveServer(server));
            }}
          >
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Please select a server" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((server, index) => (
                <SelectItem key={index} value={server.id!.toString()}>
                  {server.name}
                </SelectItem>
              ))}
              {servers.length == 0 && (
                <p className="p-2 text-xs text-center">No Servers Found</p>
              )}
            </SelectContent>
          </Select>
          <Button
            className="flex gap-2 items-center"
            onClick={() =>
              setAddMysqlDatabaseDialogState(!addMysqlDatabaseDialogState)
            }
          >
            <p>New</p>
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <AddMySqlDatabaseDialog
        dialogState={addMysqlDatabaseDialogState}
        setDialogState={() =>
          setAddMysqlDatabaseDialogState(!addMysqlDatabaseDialogState)
        }
        fetchMysqlDatabases={handleFetchMysqlDatabases}
      />
    </>
  );
}
