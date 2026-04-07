"use client"

import { Button } from "@/components/ui/button";
import { LogOut, Users } from "lucide-react";
import { signOut } from "next-auth/react";

const HeaderAdmin = () => {
  return (
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
  );
};

export default HeaderAdmin;
