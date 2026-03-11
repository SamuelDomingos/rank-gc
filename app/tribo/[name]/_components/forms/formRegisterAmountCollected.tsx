import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package } from "lucide-react";
import { currencyToNumber, formatCurrency } from "@/lib/utils";
import useFormRegisterAmountCollected from "../../_hooks/forms/useFormRegisterAmountCollected";

const FormRegisterAmountCollected = ({ gcId }: { gcId: string }) => {
  const { form, handleSubmit } = useFormRegisterAmountCollected(gcId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex justify-center mt-6 mb-6">
          <div className="bg-primary/10 text-primary rounded-full p-6 mb-6 mt-2 mr-6 w-fit">
            <Package className="w-10 h-10" />
          </div>

          <FormField
            control={form.control}
            name="amountCollected"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cestas Basicas</FormLabel>
                <FormControl>
                  <Input
                    type="numberic"
                    min={0}
                    value={formatCurrency(field.value)}
                    onChange={(e) =>
                      field.onChange(currencyToNumber(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DialogFooter className="col-span-2 mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" onClick={() => form.reset}>
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default FormRegisterAmountCollected;
