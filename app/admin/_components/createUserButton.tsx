"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "./createUserDialog";

export default function CreateUserButton() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <UserPlus className="w-4 h-4 mr-2" />
        Novo usuário
      </Button>
      <CreateUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
