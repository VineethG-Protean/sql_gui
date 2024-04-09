import { getAllServersAPI } from "@/components/api/adminApi";
import AddServerDialog from "@/components/dialogs/add-server-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RootState } from "@/store/store";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ServerManagement = () => {
  const user = useSelector((state: RootState) => state.user);
  const [addServerDialogState, setAddServerDialogState] =
    useState<boolean>(false);
  const [severs, setServers] = useState<any[]>([]);

  const fetchServers = async () => {
    const response = await getAllServersAPI();
    setServers(response.data.DATA);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          {/* <p className="font-bold">Filters</p> */}
          <Input placeholder="Search" />
        </div>
        <Button
          className="flex gap-2 items-center"
          onClick={() => setAddServerDialogState(!addServerDialogState)}
        >
          <p>New</p>
          <PlusCircle className="h-4 w-4" />
        </Button>
      </div>

      <AddServerDialog
        dialogState={addServerDialogState}
        setDialogState={() => setAddServerDialogState(!addServerDialogState)}
      />
    </>
  );
};

export default ServerManagement;
