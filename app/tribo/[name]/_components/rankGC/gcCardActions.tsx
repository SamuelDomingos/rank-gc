"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { RiMoreLine } from "@remixicon/react";
import { GCRanking } from "@/lib/api/types";
import GcRegisterDialog from "./dialogs/gcRegisterDialog";
import GcEditDialog from "./dialogs/gcEditDialog";
import GcDeleteDialog from "./dialogs/gcDeleteDialog";

const GcCardActions = ({ gc, month }: { gc: GCRanking; month: number }) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center justify-between w-full">
      <GcRegisterDialog gc={gc} month={month} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-6 w-6">
            <RiMoreLine className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <GcEditDialog gc={gc} dialogCloseRef={dialogCloseRef} />
          <Separator />
          <GcDeleteDialog gcId={gc.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GcCardActions;
