import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { formGC } from "../../_schema/formShemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDate } from "@/context/DateContext";
import { useCreatedGcs, useUpdateGcs } from "../useGcs";
import { useParams } from "next/navigation";
import { GCBase } from "@/services/types/rank";

const useFormGC = ({
  gcData,
  isEditing,
  onSuccess,
}: {
  gcData?: GCBase;
  isEditing?: boolean;
  onSuccess?: () => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const triboName = params.name as string;

  const { month, year } = useDate();

  const { uploadData } = useCreatedGcs();
  const { updateData } = useUpdateGcs();

  const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (avatarPreviewUrl && avatarPreviewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }

    const url = URL.createObjectURL(file);
    setAvatarPreviewUrl(url);
    form.setValue("avatar", file);
  };

  const form = useForm<z.infer<typeof formGC>>({
    resolver: zodResolver(formGC),
    defaultValues: {
      name: gcData?.name || "",
      avatar: undefined,
      type: (gcData?.type === "feminine" ? "feminine" : "masculine") as
        | "masculine"
        | "feminine",
      quantityMembers: gcData?.quantityMembers || 1,
    },
  });

  useEffect(() => {
    if (isEditing && typeof gcData?.avatar === "string" && gcData.avatar) {
      setAvatarPreviewUrl(gcData.avatar);
    }
  }, [isEditing, gcData?.id, gcData?.avatar]);

  const handleSubmit = async (values: z.infer<typeof formGC>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("quantityMembers", values.quantityMembers.toString());
      formData.append("tribo", triboName);

      formData.append("month", month.toString());
      formData.append("year", year.toString());

      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      let result;

      if (isEditing && gcData?.id) {
        result = await updateData(gcData.id, formData);
      } else {
        result = await uploadData(formData);
      }

      if (result) {
        form.reset();
        if (avatarPreviewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(avatarPreviewUrl);
        }
        setAvatarPreviewUrl(null);
        onSuccess?.();
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  return {
    form,
    handleAvatarFileChange,
    handleSubmit,
    avatarPreviewUrl,
    isLoading,
    fileInputRef
  };
};

export default useFormGC;
