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

import { formatCurrency, formatValue } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp } from "lucide-react";
import { GCWithMetrics } from "@/lib/api/types/reports.types";

export const GcSection = ({
  tipo,
  gc,
}: {
  tipo: string;
  gc: GCWithMetrics[];
}) => (
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
          {gc.map((gcItem) => (
            <AccordionItem
              key={gcItem.id}
              value={`gc-${gcItem.id}`}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center min-w-0">
                  <p className="font-semibold text-foreground truncate">
                    {gcItem.gc}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pt-4 pb-0">
                <div className="overflow-x-auto">
                  <Table className="mt-4 mb-4 border min-w-[480px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Métrica</TableHead>
                        <TableHead className="w-[110px]">M. Passado</TableHead>
                        <TableHead className="w-[110px]">M. Atual</TableHead>
                        <TableHead className="w-[120px]">Comparativo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          label: "Valor Arrecadado",
                          key: "amountCollected",
                          isPercentage: false,
                          isCurrency: true,
                        },
                        {
                          label: "Visitantes",
                          key: "visitors",
                          isPercentage: false,
                          isCurrency: false,
                        },
                        {
                          label: "Presença GC",
                          key: "gcAttendance",
                          isPercentage: true,
                          isCurrency: false,
                        },
                        {
                          label: "Presença Cultos",
                          key: "serviceAttendance",
                          isPercentage: true,
                          isCurrency: false,
                        },
                        {
                          label: "Servindo",
                          key: "serving",
                          isPercentage: true,
                          isCurrency: false,
                        },
                      ].map((metric) => {
                        const metricData =
                          gcItem.metrics[
                            metric.key as keyof typeof gcItem.metrics
                          ];
                        const variance = metricData.comparative;

                        return (
                          <TableRow key={metric.key}>
                            <TableCell className="font-medium">
                              {metric.label}
                            </TableCell>
                            <TableCell>
                              {formatValue(
                                metricData.previous,
                                metric.isPercentage,
                                metric.isCurrency,
                              )}
                            </TableCell>
                            <TableCell>
                              {formatValue(
                                metricData.current,
                                metric.isPercentage,
                                metric.isCurrency,
                              )}
                            </TableCell>
                            <TableCell>
                              {variance > 0 ? (
                                <Badge
                                  variant="default"
                                  className="gap-1 flex items-center w-fit whitespace-nowrap"
                                >
                                  <ArrowUp className="w-3 h-3 shrink-0" />+
                                  {metric.isCurrency
                                    ? formatCurrency(Math.abs(variance))
                                    : Math.abs(variance).toFixed(
                                        metric.isPercentage ? 1 : 0,
                                      )}
                                  {metric.isPercentage && "%"}
                                </Badge>
                              ) : variance < 0 ? (
                                <Badge
                                  variant="destructive"
                                  className="gap-1 flex items-center w-fit whitespace-nowrap"
                                >
                                  <ArrowDown className="w-3 h-3 shrink-0" />
                                  {metric.isCurrency
                                    ? formatCurrency(variance)
                                    : variance.toFixed(
                                        metric.isPercentage ? 1 : 0,
                                      )}
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
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </CardContent>
  </Card>
);
