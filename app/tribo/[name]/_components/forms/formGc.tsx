import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Plus } from "lucide-react";
import { GC } from "@/app/generated/prisma/client";
import useFormGC from "../../_hooks/forms/useFormGC";

const FormGc = ({
  onSuccess,
  gcData,
  isEditing = false,
}: {
  onSuccess?: () => void;
  gcData?: GC & { quantityMembers: number };
  isEditing?: boolean;
}) => {
  const {
    form,
    handleAvatarFileChange,
    handleSubmit,
    avatarPreviewUrl,
    isLoading,
    fileInputRef,
  } = useFormGC({ gcData, isEditing, onSuccess });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="avatar"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center">
                  <div className="relative w-fit">
                    <Avatar className="w-28 h-28 bg-cyan-100 text-foreground text-2xl">
                      <AvatarImage
                        src={avatarPreviewUrl ?? ""}
                        alt="Avatar do GC"
                      />
                      <AvatarFallback>
                        {gcData?.name
                          ? gcData.name.slice(0, 2).toUpperCase()
                          : "GC"}
                      </AvatarFallback>
                    </Avatar>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarFileChange}
                    />
                    <button
                      type="button"
                      className="
                                                    absolute
                                                    right-0 bottom-0
                                                    w-10 h-10
                                                    flex items-center justify-center
                                                    rounded-full
                                                    bg-secondary
                                                    border-4 border-background
                                                    shadow
                                                    transition
                                                    hover:bg-secondary/80
                                                    focus:outline-none
                                                    focus:ring-2 
                                                    focus:ring-secondary
                                                "
                      aria-label="Adicionar imagem"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                    >
                      <Plus className="text-white" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 text-center">
                    <p className="text-sm font-medium text-foreground">
                      Avatar do GC
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Opcional. Use uma imagem ou deixe as iniciais do grupo.
                    </p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do GC</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Grupo Fé" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo do GC</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value || "masculine"}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="masculine" id="r1" />
                    <Label htmlFor="r1">Masculino</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="feminine" id="r2" />
                    <Label htmlFor="r2">Feminino</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantityMembers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total de membros</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={50}
                  placeholder="Ex: 12"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormGc;
