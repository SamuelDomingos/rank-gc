"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useDeleteRegister, useGetAllRegistersGc } from "@/app/_hooks/useRegister";
import { useDate } from "@/context/DateContext";
import { formatDate, presenceLabel } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { RiMoreLine } from "@remixicon/react";
import { Separator } from "@/components/ui/separator";

const ListRegisters = ({ id }: { id: string }) => {

    const { month, year } = useDate();
    const { data, isLoading } = useGetAllRegistersGc(id, month, year);
    const { fetchDelRegister } = useDeleteRegister(id);

    return (
        <Table className="mt-4 border">
            <TableHeader>
                <TableRow>
                    <TableHead>data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Q. Membros</TableHead>
                    <TableHead>Q. Visitantes</TableHead>
                    <TableHead>Servirao</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <Spinner />
                        </TableCell>
                    </TableRow>
                ) : (
                    data && data.length > 0 ? (
                        data.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{formatDate(reg.date)}</TableCell>
                                <TableCell>{presenceLabel(reg.type)}</TableCell>
                                <TableCell>{reg.members}</TableCell>
                                <TableCell>{reg.visitors}</TableCell>
                                <TableCell>{reg.membersServing}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="sm" className="h-6 w-6">
                                                <RiMoreLine className="w-3 h-3" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Editar
                                            </DropdownMenuItem>
                                            <Separator />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
                                                        Excluir
                                                    </DropdownMenuItem>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Tem certeza que deseja excluir este registro?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Esta ação não pode ser desfeita. Você realmente deseja deletar este registro?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => fetchDelRegister(reg.id)}>Excluir</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Nenhum registro encontrado.
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </Table >
    )
}

export default ListRegisters