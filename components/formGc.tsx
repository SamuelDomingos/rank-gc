"use client"

import {
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Plus } from "lucide-react"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useCreatedGcs, useUpdateGcs } from "@/app/_hooks/useGcs"
import { GC } from "@/app/generated/prisma/client"

const formSchema = z.object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").max(50, "Nome deve ter no máximo 50 caracteres"),
    avatar: z.any().optional(),
    type: z.union([
        z.literal("masculine"),
        z.literal("feminine")
    ], { message: "Selecione o tipo" }),
    quantity: z.number().min(1, "Quantidade deve ser maior que zero").max(50, "Quantidade máxima é 50")
})

type FormValues = z.infer<typeof formSchema>

const FormGc = ({ onSuccess, gcData, isEditing = false }: {
    onSuccess?: () => void
    gcData?: GC
    isEditing?: boolean
}) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const { uploadData } = useCreatedGcs()
    const { updateData } = useUpdateGcs()

    const handlePickAvatar = () => {
        fileInputRef.current?.click()
    }

    const handleAvatarFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (avatarPreviewUrl && avatarPreviewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(avatarPreviewUrl)
        }

        const url = URL.createObjectURL(file)
        setAvatarPreviewUrl(url)
        form.setValue('avatar', file)
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: gcData?.name || "",
            avatar: undefined,
            type: (gcData?.type === "feminine" ? "feminine" : "masculine") as "masculine" | "feminine",
            quantity: gcData?.quantity || 1
        },
    })

    useEffect(() => {
        if (isEditing && typeof gcData?.avatar === "string" && gcData.avatar) {
            setAvatarPreviewUrl(gcData.avatar)
        }
    }, [isEditing, gcData?.id, gcData?.avatar])

    const handleSubmit = async (values: FormValues) => {
        setIsLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("type", values.type)
            formData.append("quantity", values.quantity.toString())

            if (values.avatar) {
                formData.append("avatar", values.avatar)
            }

            let result

            if (isEditing && gcData?.id) {
                result = await updateData(gcData.id, formData)
            } else {
                result = await uploadData(formData)
            }

            if (result) {
                form.reset()
                if (avatarPreviewUrl?.startsWith("blob:")) {
                    URL.revokeObjectURL(avatarPreviewUrl)
                }
                setAvatarPreviewUrl(null)
                onSuccess?.()
            }
        } catch (error) {
            console.error("Erro ao salvar:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        return () => {
            if (avatarPreviewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreviewUrl)
            }
        }
    }, [avatarPreviewUrl])

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
                                            <AvatarImage src={avatarPreviewUrl ?? ""} alt="Avatar do GC" />
                                            <AvatarFallback>
                                                {gcData?.name ? gcData.name.slice(0, 2).toUpperCase() : "GC"}
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
                                            onClick={handlePickAvatar}
                                        >
                                            <Plus className="text-white" />
                                        </button>
                                    </div>
                                    <div className="mt-3 space-y-1 text-center">
                                        <p className="text-sm font-medium text-foreground">Avatar do GC</p>
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
                    name="quantity"
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
                        <Button variant="outline" type="button" disabled={isLoading}>Cancelar</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Salvando..." : isEditing ? "Atualizar" : "Salvar"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default FormGc