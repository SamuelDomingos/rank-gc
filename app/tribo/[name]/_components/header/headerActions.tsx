"use client";

import { useState } from "react";
import { ModeToggle } from "../modeToggle";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut, Plus } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormGc from "../forms/formGc";
import Reports from "../reports";

const HeaderActions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
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

            <Reports
              isReportDialogOpen={isReportDialogOpen}
              setIsReportDialogOpen={setIsReportDialogOpen}
            />
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default HeaderActions;
