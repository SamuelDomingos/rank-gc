import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const useFormLogin = ({ triboSlug }: { triboSlug: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      triboSlug,
      redirect: false,
    });
    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
      return;
    }

    if (triboSlug) {
      router.push(`/tribo/${triboSlug}`);
    }
    router.refresh();
  };

  return { form, onSubmit, isLoading, error };
};

export default useFormLogin;
