import { useForm } from "react-hook-form";
import { useRegisterDay } from "../useRegister";
import z from "zod";
import { formRegister } from "../../_schema/formShemas";
import { zodResolver } from "@hookform/resolvers/zod";

const useFormRegister = ({ gcId }: { gcId: string }) => {
      const { uploadData } = useRegisterDay();

  const form = useForm<z.infer<typeof formRegister>>({
    resolver: zodResolver(formRegister),
    defaultValues: {
      date: new Date(),
      type: "presenceGC",
      members: 1,
      visitors: 0,
      membersServing: 0,
    },
  });

  const type = form.watch("type");

  const handleSubmit = async (values: z.infer<typeof formRegister>) => {
    const payload = {
      gcId,
      date: values.date.toISOString(),
      type: values.type,
      members: values.members,
      visitors: values.visitors,
      membersServing: values.membersServing!,
    };

    const result = await uploadData(payload);

    if (result) form.reset();
  };

  return {
    form,
    handleSubmit,
    type,
  };
};

export default useFormRegister;
