import { User } from "@/app/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tribos } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { useDeleteMember } from "../_hooks/useAdmin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const TableUsers = ({ users }: { users: User[] }) => {
  const { fetchDelMember } = useDeleteMember();
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuário</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tribo</TableHead>
            <TableHead>Cargo</TableHead>

            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground py-12"
              >
                Nenhum usuário cadastrado ainda.
              </TableCell>
            </TableRow>
          ) : (
            users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <span className="text-sm font-medium">{user.name}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={
                          user.tribo
                            ? tribos.find((t) => t.name === user.tribo.toLocaleLowerCase())?.image
                            : "?"
                        }
                        alt={user.name}
                      />
                      <AvatarFallback className="text-xs font-semibold">
                        {user.tribo
                          ? tribos
                              .find((t) => t.name === user.tribo.toLocaleLowerCase())
                              ?.name.charAt(0)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm">
                      {user.tribo
                        ? tribos.find((t) => t.name === user.tribo.toLocaleLowerCase())?.name
                        : "Sem tribo"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.cargo === "ADMIN" ? "default" : "outline"}
                  >
                    {user.cargo === "ADMIN" ? "Admin" : "Membro"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2Icon />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>
                          Deseja realmente deletar o usuário {user.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Essa ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => fetchDelMember(user.id)}
                          variant="destructive"
                        >
                          Deletar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableUsers;
