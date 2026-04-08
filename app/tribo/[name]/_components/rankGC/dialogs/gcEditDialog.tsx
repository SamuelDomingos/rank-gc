"use client";

import { RefObject } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import FormGc from "../../forms/formGc";
import { GCBase } from "@/services/types/rank";

const GcEditDialog = ({
  gc,
  dialogCloseRef,
}: {
  gc: GCBase;
  dialogCloseRef: RefObject<HTMLButtonElement | null>;
}) => {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
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
          onSuccess={() => dialogCloseRef.current?.click()}
        />
        <DialogClose ref={dialogCloseRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};

export default GcEditDialog;
