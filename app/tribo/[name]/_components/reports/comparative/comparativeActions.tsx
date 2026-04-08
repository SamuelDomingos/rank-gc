import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Download } from "lucide-react";
import {
  copyToWhatsApp,
  exportAsExcel,
  exportAsPDF,
} from "../../../_services/export";
import { ComparativeData } from "@/lib/api/types/reports.types";

export const ComparativeActions = ({
  previousMonth,
  previousYear,
  setPreviousMonth,
  setPreviousYear,
  gcsData,
}: {
  previousMonth: number;
  previousYear: number;
  setPreviousMonth: (month: number) => void;
  setPreviousYear: (year: number) => void;
  gcsData: ComparativeData;
}) => {
  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="flex items-center gap-2">
            <Download className="mr-2" />
            Exportar
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => exportAsPDF(gcsData)}>
            PDF
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAsExcel(gcsData)}>
            Excel
          </DropdownMenuItem>
          <Separator />
          <DropdownMenuItem onClick={() => copyToWhatsApp(gcsData)}>
            Copiar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DatePicker
        month={previousMonth}
        year={previousYear}
        onMonthChange={setPreviousMonth}
        onYearChange={setPreviousYear}
        updateUrl={false}
      />
    </div>
  );
};
