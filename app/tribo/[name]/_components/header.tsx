"use client";

import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import FormGc from "./forms/formGc";
import { useState } from "react";
import { ModeToggle } from "./modeToggle";
import { signOut } from "next-auth/react";
import Reports from "./reports";

export const Header = ({ name }: { name: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const typesPoints = [
    {
      id: "1",
      title: "IVV (Cestas Básicas)",
      descriptions: "Cada cesta = 100 pontos",
    },
    {
      id: "2",
      title: "V (Visitantes)",
      descriptions: "Cada visitante = 50 pontos",
    },
    {
      id: "3",
      title: "P (Presença no GC)",
      descriptions: "Pontuação = % de presença",
    },
    {
      id: "4",
      title: "D (Presença Domingo)",
      descriptions: "Pontuação = % de presença × 2",
    },
    {
      id: "5",
      title: "S (Servir)",
      descriptions: "Pontuação = % de pessoas servindo",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <ModeToggle />
        <Button
          variant="outline"
          size="sm"
          onClick={() => signOut()}
          className="text-muted-foreground"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Ranking dos GCs</h2>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <DatePicker />
          <ButtonGroup>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar GC
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Novo</DialogTitle>
                  <DialogDescription>
                    Preencha as informações do grupo de conexão. Você poderá
                    alterar esses dados depois.
                  </DialogDescription>
                </DialogHeader>
                <FormGc onSuccess={() => setIsDialogOpen(false)} />
              </DialogContent>
            </Dialog>

            <Reports isReportDialogOpen={isReportDialogOpen} setIsReportDialogOpen={setIsReportDialogOpen}  />
          </ButtonGroup>
        </div>
      </div>

      <Card className="w-full bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">
            Sistema de Pontuação
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entenda como os pontos são calculados para cada categoria
          </CardDescription>
        </CardHeader>
        <CardContent
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          {typesPoints.map((item) => (
            <Card
              key={item.id}
              className="border-border bg-card hover:bg-secondary/20 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-foreground">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.descriptions}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
