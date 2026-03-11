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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Mail, Lock, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreatedMember } from "../_hooks/useAdmin";
import { tribos } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CreateUserDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  const { form, onSubmit, isLoading, error } = useCreatedMember();

  return (
    <Dialog
      open={open}
      onOpenChange={(v: boolean) => {
        if (!v) {
          form.reset();
        }
        onOpenChange(v);
      }}
    >
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center space-y-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center space-y-1">
            <DialogTitle className="text-xl font-semibold">
              Novo usuário
            </DialogTitle>
            <DialogDescription>
              Crie um membro e vincule a uma tribo
            </DialogDescription>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
                <p className="text-destructive text-sm">{error.message}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        {...field}
                        type="text"
                        placeholder="John Doe"
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
                        placeholder="membro@email.com"
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

            <FormField
              control={form.control}
              name="tribo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tribo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a tribo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["School", "JR"].map((min) => (
                        <div key={min}>
                          <p className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            {min}
                          </p>
                          {tribos
                            .filter((t) => t.ministerio === min)
                            .map((t) => (
                              <SelectItem key={t.id} value={t.name}>
                                <Avatar>
                                  <AvatarImage
                                    src={t.image}
                                  />
                                  <AvatarFallback className="text-2xl font-bold">
                                    {(t.name ?? t.image)
                                      .charAt(0)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                {t.name}
                              </SelectItem>
                            ))}
                        </div>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                "Criar usuário"
              )}
            </Button>
          </form>
        </Form>

        <DialogFooter className="justify-center sm:justify-center">
          <p className="text-muted-foreground text-xs">
            O cargo padrão será Membro.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
