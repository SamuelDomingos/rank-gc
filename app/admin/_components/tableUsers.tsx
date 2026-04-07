import { User } from "@/app/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tribos } from "@/lib/utils";
import DeleteUser from "./deleteUser";

const TableUsers = async ({ users }: { users: User[] }) => {
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
                            ? tribos.find(
                                (t) =>
                                  t.name === user.tribo.toLocaleLowerCase(),
                              )?.image
                            : "?"
                        }
                        alt={user.name}
                      />
                      <AvatarFallback className="text-xs font-semibold">
                        {user.tribo
                          ? tribos
                              .find(
                                (t) =>
                                  t.name === user.tribo.toLocaleLowerCase(),
                              )
                              ?.name.charAt(0)
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 text-sm">
                      {user.tribo
                        ? tribos.find(
                            (t) => t.name === user.tribo.toLocaleLowerCase(),
                          )?.name
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
                  <DeleteUser user={user} />
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
