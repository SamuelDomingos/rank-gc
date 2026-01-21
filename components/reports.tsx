import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spinner } from "@/components/ui/spinner";
import GeneralReports from "./reports/generalReports";

const Reports = ({ onSuccess }: { onSuccess?: () => void }) => {
  const isLoading = false;

  return (
    <Tabs defaultValue="generalReports">
      <TabsList>
        <TabsTrigger
          value="generalReports"
          className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
        >
          masculino
        </TabsTrigger>
        <TabsTrigger
          value="comparative"
          className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
        >
          feminino
        </TabsTrigger>
        <TabsTrigger
          value="categoryReports"
          className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
        >
          feminino
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generalReports" className="space-y-6 mt-6">
        {isLoading ? <Spinner /> : <GeneralReports />}
      </TabsContent>
      <TabsContent value="comparative" className="space-y-6 mt-6">
        {isLoading ? <Spinner /> : <div></div>}
      </TabsContent>
      <TabsContent value="categoryReports" className="space-y-6 mt-6">
        {isLoading ? <Spinner /> : <div></div>}
      </TabsContent>
    </Tabs>
  );
};

export default Reports;
