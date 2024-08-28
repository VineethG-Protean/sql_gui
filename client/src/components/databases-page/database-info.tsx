import { useState } from "react";

import AddMySqlUserDialog from "../dialogs/add-mysqluser-dialog";

import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DatabasePageInfoProps {
  databases: any[];
  databaseInfo: {
    characterSet: string;
    collation: string;
    encryption: string;
    name: string;
  };
  databaseUsers: any[];
  handleFetchMysqlDatabaseInfo: (databaseName: string) => void;
}

export default function DatabasePageInfo({
  databases,
  databaseInfo,
  databaseUsers,
  handleFetchMysqlDatabaseInfo,
}: DatabasePageInfoProps) {
  const [selectedUser, setSelectedUser] = useState<any>();
  const [addMysqlUserDialogState, setAddMysqlUserDialogState] =
    useState<boolean>(false);

  return (
    <>
      {databaseInfo && (
        <div className="flex justify-between flex-wrap border border-muted px-4 py-6 rounded-md">
          {Object.entries(databaseInfo).map(([key, value]) => (
            <span>
              <p className="uppercase font-semibold text-muted-foreground text-md">
                {key}
              </p>
              <p className="text-sm text-primary font-bold">{value}</p>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        {databaseUsers.length !== 0 && (
          <ScrollArea className="h-[calc(100vh-25rem)] w-full rounded-md border p-4 mt-4 ">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Host</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {databaseUsers.map((user, index) => (
                  <TableRow key={index} onClick={() => setSelectedUser(user)}>
                    <TableCell>{user.User}</TableCell>
                    <TableCell>{user.Host}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-center mt-6">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-dotted border-primary text-primary flex gap-4 items-center"
                onClick={() =>
                  setAddMysqlUserDialogState(!addMysqlUserDialogState)
                }
              >
                <p>Add User</p>
                <PlusCircle className="w-4 h-4" />
              </Button>
            </div>
          </ScrollArea>
        )}

        {selectedUser && (
          <ScrollArea className="h-[calc(100vh-25rem)] w-full rounded-md border p-4 mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Privilege</TableHead>
                  <TableHead>Access</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedUser &&
                  Object.entries(selectedUser).map(
                    ([privilege, access], index) =>
                      privilege.endsWith("_priv") && (
                        <TableRow key={index}>
                          <TableCell className="uppercase">
                            {privilege + "ilege"}
                          </TableCell>
                          <TableCell>{String(access)}</TableCell>
                        </TableRow>
                      )
                  )}
              </TableBody>
            </Table>
          </ScrollArea>
        )}
      </div>

      <AddMySqlUserDialog
        dialogState={addMysqlUserDialogState}
        setDialogState={() =>
          setAddMysqlUserDialogState(!addMysqlUserDialogState)
        }
        databases={databases}
        fetchDatabaseUsers={(database: string) =>
          handleFetchMysqlDatabaseInfo(database)
        }
      />
    </>
  );
}
