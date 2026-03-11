"use client";

import { Loader2, Mail, Lock } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useFormLogin from "@/hooks/useFormLogin";

const FormLogin = ({
  triboSlug,
  triboNome,
  open,
  onOpenChange,
}: {
  triboSlug: string;
  triboNome?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { form, onSubmit, isLoading, error } = useFormLogin({ triboSlug });

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (!open) form.reset();
        onOpenChange(open);
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={`/tribos/${triboSlug.toLowerCase()}.jpeg`}
              />
              <AvatarFallback className="text-2xl font-bold">
                {(triboNome ?? triboSlug).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

          <div className="text-center space-y-1">
            <DialogTitle className="text-2xl font-semibold tracking-tight">
              Tribo{" "}
              <span className="text-primary">{triboNome ?? triboSlug}</span>
            </DialogTitle>
            <DialogDescription>Acesso exclusivo para membros</DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="seu@email.com"
                        disabled={isLoading}
                        className="pl-9"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        disabled={isLoading}
                        className="pl-9"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
        </Form>

        <DialogFooter className="justify-center sm:justify-center">
          <p className="text-muted-foreground text-xs">
            Problemas para entrar? Fale com o líder da sua tribo.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FormLogin;
