"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RiFileList3Line } from "@remixicon/react";
import FormRegister from "../../forms/formRegister";
import ListRegisters from "../listRegisters";
import FormRegisterBaskets from "../../forms/formRegisterAmountCollected";
import { GCBase } from "@/services/types/rank";

const GcRegisterDialog = ({ gc, month }: { gc: GCBase; month: number }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-1 text-xs">
          <RiFileList3Line className="w-3 h-3" />
          Registro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
          <Tabs defaultValue="registerDayForm">
            <TabsList>
              <TabsTrigger value="registerDayForm">Formulário</TabsTrigger>
              <TabsTrigger value="listRegisters">Registros</TabsTrigger>
              <TabsTrigger value="BasketsMonth">Cestas</TabsTrigger>
            </TabsList>

            <TabsContent value="registerDayForm">
              <DialogHeader>
                <DialogTitle>{gc.name}</DialogTitle>
                <DialogDescription>
                  Preencha as informações do grupo de conexão.
                </DialogDescription>
              </DialogHeader>
              <FormRegister gcId={gc.id} />
            </TabsContent>

            <TabsContent value="listRegisters">
              <DialogHeader>
                <DialogTitle>Registros do mês de {month}</DialogTitle>
                <DialogDescription>
                  Visualize os registros do mês atual.
                </DialogDescription>
              </DialogHeader>
              <ListRegisters id={gc.id} />
            </TabsContent>

            <TabsContent value="BasketsMonth">
              <DialogHeader>
                <DialogTitle>Cestas do mês de {month}</DialogTitle>
                <DialogDescription>
                  Registre a quantidade de cestas coletadas.
                </DialogDescription>
              </DialogHeader>
              <FormRegisterBaskets gcId={gc.id} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GcRegisterDialog;
