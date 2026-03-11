"use client";

import { useState } from "react";
import { UserPlus, Users, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "./_components/createUserDialog";
import { useGetMembers } from "./_hooks/useAdmin";
import TableUsers from "./_components/tableUsers";
import LoginAdmin from "./_components/loginAdmin";

export default function AdminPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: session } = useSession();
  const { data: users } = useGetMembers();
  
  if (!session) {
    return <LoginAdmin open={!session} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <span className="font-semibold text-sm">Painel Admin</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="text-muted-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Usuários</h1>
          </div>
          <Button onClick={() => setDialogOpen(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Novo usuário
          </Button>
        </div>

        <TableUsers users={users || []} />
      </main>

      <CreateUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
