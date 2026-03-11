import { useDate } from "@/context/DateContext";
import { useGetRoadsGc, useRegisterRoad } from "../useRegisterRoad";
import { useForm } from "react-hook-form";
import z from "zod";
import { formRegisterAmountCollected } from "../../_schema/formShemas";
import { ApplicationsFixedCreateManyInput } from "@/app/generated/prisma/models";
import { UpdateRoadPayload } from "@/lib/api/registersRoad";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormRegisterAmountCollected = (gcId: string) => {
  const { month, year } = useDate();

  const { data } = useGetRoadsGc(gcId, month, year);

  const mode = data?.id ? "update" : "create";

  const { uploadData } = useRegisterRoad(mode);

  const form = useForm<z.infer<typeof formRegisterAmountCollected>>({
    resolver: zodResolver(formRegisterAmountCollected),
    defaultValues: {
      amountCollected: data?.amountCollected ?? 0,
    },
  });

  const handleSubmit = async (
    values: z.infer<typeof formRegisterAmountCollected>,
  ) => {
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
        amountCollected: data.amountCollected ?? 0,
      });
    }
  }, [data, form]);

  return {
    form,
    handleSubmit,
  };
};

export default useFormRegisterAmountCollected;
