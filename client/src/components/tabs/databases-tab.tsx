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

const DatabaseTab = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Databases</CardTitle>
        <CardDescription>List of databases</CardDescription>
      </CardHeader>
      <CardContent>
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[620px] rounded-md border"
        >
          <ResizablePanel defaultSize={25} className="p-2">
            DATABASES LIST
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75} className="p-2">
            DATABASE INFORMATION
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
};

export default DatabaseTab;
