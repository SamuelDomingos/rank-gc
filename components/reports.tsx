import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralReports from "./reports/generalReports";
import ComparativeReport from "./reports/comparative";

const Reports = () => {
  return (
    <Tabs defaultValue="generalReports">
      <TabsList>
        <TabsTrigger
          value="generalReports"
          className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
        >
          relatório geral
        </TabsTrigger>
        <TabsTrigger
          value="comparative"
          className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
        >
          comparativo
        </TabsTrigger>
      </TabsList>
      <TabsContent value="generalReports" className="space-y-6 mt-6">
        <GeneralReports />
      </TabsContent>
      <TabsContent value="comparative" className="space-y-6 mt-6">
        <ComparativeReport />
      </TabsContent>
    </Tabs>
  );
};

export default Reports;
