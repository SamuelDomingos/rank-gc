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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useGetRoadsGc,
  useRegisterRoad,
} from "@/app/tribo/[name]/_hooks/useRegisterRoad";
import { Package } from "lucide-react";
import { useDate } from "@/context/DateContext";
import { ApplicationsFixedCreateManyInput } from "@/app/generated/prisma/models";
import { UpdateRoadPayload } from "@/lib/api/registersRoad";
import { useEffect } from "react";
import { currencyToNumber, formatCurrency } from "@/lib/utils";

export const formSchema = z.object({
  amountCollected: z.number().min(1),
});

export type FormValues = z.infer<typeof formSchema>;

const FormRegisterAmountCollected = ({ gcId }: { gcId: string }) => {
  const { month, year } = useDate();

  const { data } = useGetRoadsGc(gcId, month, year);

  const mode = data?.id ? "update" : "create";

  const { uploadData } = useRegisterRoad(mode);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountCollected: data?.amountCollected ?? 0,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    const payload: ApplicationsFixedCreateManyInput | UpdateRoadPayload =
      mode === "update"
        ? {
            id: data!.id,
            data: { amountCollected: values.amountCollected },
          }
        : {
            amountCollected: values.amountCollected,
            date: new Date(year, month - 1),
            gcId: gcId,
          };

    const result = await (
      uploadData as (p: typeof payload) => Promise<unknown>
    )(payload);

    if (result) form.reset();
  };

  useEffect(() => {
    if (data?.amountCollected !== undefined) {
      form.reset({
        amountCollected: data.amountCollected,
      });
    }
  }, [data, form]);

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
