import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useComparative } from "@/app/_hooks/useReports";
import { useDate } from "@/context/DateContext";
import { Spinner } from "@/components/ui/spinner";

interface GCWithMetrics {
  id: string;
  gc: string;
  metrics: {
    totalPoints: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
    baskets: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
    visitors: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
    gcAttendance: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
    serviceAttendance: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
    serving: {
      current: number | string;
      previous: number | string;
      comparative: number;
    };
  };
}

const formatValue = (value: number | string, isPercentage: boolean = false) => {
  if (isPercentage) {
    return `${typeof value === "string" ? value : value.toFixed(1)}%`;
  }
  return value.toString();
};

const GcSection = ({ tipo, gc }: { tipo: string; gc: GCWithMetrics[] }) => (
  <Card>
    <CardHeader>
      <CardTitle>gc {tipo}</CardTitle>
      <CardDescription>
        Análise comparativa dos gc {tipo.toLowerCase()}
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
      {gc.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          Nenhum grupo encontrado
        </p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {gc.map((gc) => (
            <AccordionItem
              key={gc.id}
              value={`gc-${gc.id}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{gc.gc}</p>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-0">
                <Table className="mt-4 border">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Métrica</TableHead>
                      <TableHead>M. Passado</TableHead>
                      <TableHead>M. Atual</TableHead>
                      <TableHead>Comparativo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        label: "Pontos Totais",
                        key: "totalPoints",
                        isPercentage: false,
                      },
                      {
                        label: "Cestas",
                        key: "baskets",
                        isPercentage: false,
                      },
                      {
                        label: "Visitantes",
                        key: "visitors",
                        isPercentage: false,
                      },
                      {
                        label: "Presença GC",
                        key: "gcAttendance",
                        isPercentage: true,
                      },
                      {
                        label: "Presença Cultos",
                        key: "serviceAttendance",
                        isPercentage: true,
                      },
                      {
                        label: "Servindo",
                        key: "serving",
                        isPercentage: true,
                      },
                    ].map((metric) => {
                      const metricData =
                        gc.metrics[metric.key as keyof typeof gc.metrics];
                      const variance = metricData.comparative;

                      return (
                        <TableRow key={metric.key}>
                          <TableCell>{metric.label}</TableCell>
                          <TableCell>
                            {formatValue(
                              metricData.previous,
                              metric.isPercentage,
                            )}
                          </TableCell>
                          <TableCell>
                            {formatValue(
                              metricData.current,
                              metric.isPercentage,
                            )}
                          </TableCell>
                          <TableCell>
                            {variance > 0 ? (
                              <Badge
                                variant="default"
                                className="gap-1 flex items-center w-fit"
                              >
                                <ArrowUp className="w-3 h-3" />+
                                {Math.abs(variance).toFixed(
                                  metric.isPercentage ? 1 : 0,
                                )}
                                {metric.isPercentage && "%"}
                              </Badge>
                            ) : variance < 0 ? (
                              <Badge
                                variant="destructive"
                                className="gap-1 flex items-center w-fit"
                              >
                                <ArrowDown className="w-3 h-3" />
                                {variance.toFixed(metric.isPercentage ? 1 : 0)}
                                {metric.isPercentage && "%"}
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                —
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </CardContent>
  </Card>
);

const Comparative = () => {
  const [previousMonth, setPreviousMonth] = useState(new Date().getMonth() + 1);
  const [previousYear, setPreviousYear] = useState(new Date().getFullYear());

  const { month: currentMonth, year: currentYear } = useDate();

  const { data: gcsData, isLoading } = useComparative(
    previousMonth,
    previousYear,
    currentMonth,
    currentYear,
  );

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Análise Comparativa</h1>

        <DatePicker
          month={previousMonth}
          year={previousYear}
          onMonthChange={setPreviousMonth}
          onYearChange={setPreviousYear}
        />
      </div>

      <div className="space-y-6">
        <GcSection tipo="Masculinos" gc={gcsData?.masculine || []} />
        <GcSection tipo="Femininos" gc={gcsData?.feminine || []} />
      </div>
    </div>
  );
};

export default Comparative;
