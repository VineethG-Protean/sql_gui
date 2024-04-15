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

const TablesTab = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Tables</CardTitle>
        <CardDescription>List of tables</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[620px] rounded-md border"
        >
          <ResizablePanel defaultSize={25} className="p-2">
            TABLES LIST
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="p-2">
            TABLES INFORMATION
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default TablesTab;
