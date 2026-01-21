import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GCRanking } from "@/lib/api/types";

const GcMonth = ({ dados }: { dados?: GCRanking | null }) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>GC do Mês</CardTitle>
            </CardHeader>
            <CardContent className="flex items-start gap-6 p-6">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={dados?.avatar || ""} alt={dados?.name || "GC"} />
                    <AvatarFallback className="text-lg">
                        {dados?.name ? dados.name.slice(0, 2).toUpperCase() : "GC"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-3 text-foreground">{dados?.name || "-"}</h2>
                        <span className="text-3xl font-extrabold text-primary">{dados?.points ?? 0} pontos</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Membros:</b> {dados?.quantity ?? 0}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Cestas:</b> {dados?.baskets ?? 0}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Visitantes:</b> {dados?.visitors ?? 0}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Presença GC:</b> {dados?.presenceGC ?? 0}%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Presença Cultos:</b> {dados?.presenceCults ?? 0}%
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm text-muted-foreground block">
                                <b className="text-foreground">Servindo:</b> {dados?.serving ?? 0}%
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GcMonth