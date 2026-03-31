"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GeneralReports from "./generalReports";
import Comparative from "./comparative";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Reports = ({
  isReportDialogOpen,
  setIsReportDialogOpen,
}: {
  isReportDialogOpen: boolean;
  setIsReportDialogOpen: (value: boolean) => void;
}) => {
  return (
    <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Relatórios</Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl! max-h-[90vh]! overflow-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>Relatorio</DialogTitle>
          <DialogDescription>
            Visualize os relatórios de desempenho dos gcs de conexão.
          </DialogDescription>
        </DialogHeader>
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
            <Comparative />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default Reports;
