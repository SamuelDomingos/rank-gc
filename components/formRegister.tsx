import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarPicker } from "./ui/calendar-picker"
import { useRegisterDay } from "@/app/tribo/[name]/_hooks/useRegister"

export const formSchema = z.object({
    date: z.date({ message: "A data é obrigatória" }),
    type: z.enum(["presenceGC", "presenceCults"]),
    members: z.number().min(1),
    visitors: z.number().min(0),
    membersServing: z.number().min(0).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

const FormRegister = ({ gcId }: { gcId: string }) => {

    const { uploadData } = useRegisterDay();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date(),
            type: "presenceGC",
            members: 1,
            visitors: 0,
            membersServing: 0
        },
    })

    const type = form.watch("type")

    const handleSubmit = async (values: FormValues) => {
        const payload = {
            gcId,
            date: values.date.toISOString(),
            type: values.type,
            members: values.members,
            visitors: values.visitors,
            membersServing: values.membersServing!
        };

        const result = await uploadData(payload);

        if (result) form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-2 gap-4"
            >
                <div className="col-span-2 flex gap-4 mb-2">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Data</FormLabel>
                                <FormControl>
                                    <CalendarPicker
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="presenceGC">Dia de GC</SelectItem>
                                            <SelectItem value="presenceCults">Culto de domingo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="members"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total de membros</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="visitors"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visitantes</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    value={field.value}
                                    onChange={(e) =>
                                        field.onChange(Number(e.target.value))
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {type === "presenceCults" && (
                    <FormField
                        control={form.control}
                        name="membersServing"
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Membros servindo</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange(Number(e.target.value))
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

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
    )
}

export default FormRegister
