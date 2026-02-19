import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiMedalFill, RiFileList3Line, RiMoreLine } from "@remixicon/react";
import { Separator } from "@/components/ui/separator";
import { GCRanking } from "@/lib/api/types";
import FormRegister from "./formRegister";
import ListRegisters from "./listRegisters";
import { useDeleteGc } from "@/app/tribo/[name]/_hooks/useGcs";
import FormGc from "./formGc";
import { useRef } from "react";
import FormRegisterBaskets from "./FormRegisterBaskets";

const RankGCs = ({
  dados,
  month,
}: {
  dados?: GCRanking[] | null;
  month: number;
}) => {
  const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-600"];

  const { fetchDelGc } = useDeleteGc();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="mt-6 mb-6 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Rank Geral</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dados?.map((gc, idx) => {
          const rank = idx + 1;
          const isTopThree = rank <= 3;
          const medalColor = isTopThree ? medalColors[idx] : "";

          return (
            <Card
              key={gc.name + idx}
              className={`border-border ${isTopThree ? "bg-primary/5 border-primary/20" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full font-semibold text-xs ${
                        isTopThree
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={gc.avatar || ""}
                        alt={gc.name || "GC"}
                      />
                      <AvatarFallback className="text-lg">
                        {gc.name ? gc.name.slice(0, 2).toUpperCase() : "GC"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground font-medium text-sm">
                      {gc.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {isTopThree && (
                      <RiMedalFill className={`w-4 h-4 ${medalColor}`} />
                    )}
                    <span
                      className={`font-semibold text-sm ${isTopThree ? "text-primary" : "text-foreground"}`}
                    >
                      {gc.points}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs">
                      <b>Membros:</b> {gc.quantity}
                    </span>
                    <span className="text-xs">
                      <b>Visitantes:</b> {gc.visitors}
                    </span>
                    <span className="text-xs">
                      <b>Presença Cultos:</b> {gc.presenceCults}%
                    </span>
                    <span className="text-xs">
                      <b>Servindo:</b> {gc.serving}%
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs">
                      <b>Cestas:</b> {gc.baskets}
                    </span>
                    <span className="text-xs">
                      <b>Presença GC:</b> {gc.presenceGC}%
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-3 border-t border-border">
                <div className="flex items-center justify-between w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="default"
                        size="sm"
                        className="gap-1 text-xs"
                      >
                        <RiFileList3Line className="w-3 h-3" />
                        Registro
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4">
                        <Tabs defaultValue="registerDayForm">
                          <TabsList>
                            <TabsTrigger value="registerDayForm">
                              Formulario
                            </TabsTrigger>
                            <TabsTrigger value="listRegisters">
                              Registros
                            </TabsTrigger>
                            <TabsTrigger value="BasketsMonth">
                              Cestas
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="registerDayForm">
                            <DialogHeader>
                              <DialogTitle>{gc.name}</DialogTitle>
                              <DialogDescription>
                                Preencha as informações do grupo de conexão.
                                Você poderá alterar esses dados depois.
                              </DialogDescription>
                            </DialogHeader>
                            <FormRegister gcId={gc.id} />
                          </TabsContent>
                          <TabsContent value="listRegisters">
                            <DialogHeader>
                              <DialogTitle>
                                Registros do mes de {month}
                              </DialogTitle>
                              <DialogDescription>
                                Preencha as informações do grupo de conexão.
                                Você poderá alterar esses dados depois.
                              </DialogDescription>
                            </DialogHeader>
                            <ListRegisters id={gc.id} />
                          </TabsContent>

                          <TabsContent value="BasketsMonth">
                            <DialogHeader>
                              <DialogTitle>
                                Registros do mes de {month}
                              </DialogTitle>
                              <DialogDescription>
                                Preencha as informações do grupo de conexão.
                                Você poderá alterar esses dados depois.
                              </DialogDescription>
                            </DialogHeader>
                            <FormRegisterBaskets gcId={gc.id}/>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-6 w-6">
                        <RiMoreLine className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Editar
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[480px]">
                          <DialogHeader>
                            <DialogTitle>Editar Grupo de Conexão</DialogTitle>
                          </DialogHeader>
                          <FormGc
                            gcData={gc}
                            isEditing={true}
                            onSuccess={() => {
                              dialogCloseRef.current?.click();
                            }}
                          />
                          <DialogClose
                            ref={dialogCloseRef}
                            className="hidden"
                          />
                        </DialogContent>
                      </Dialog>
                      <Separator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={(e) => e.preventDefault()}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Tem certeza que deseja excluir este gc?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta ação não pode ser desfeita. Você realmente
                              deseja deletar este gc?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => fetchDelGc(gc.id)}
                            >
                              Excluir
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RankGCs;
