import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RiMedalFill } from "@remixicon/react";
import { GCRanking } from "@/lib/api/types";
import { medalColors } from "../../_utils/utilsRank";
import GcCardActions from "./gcCardActions";

const GcCard = ({ gc, rank, month }: { gc: GCRanking; rank: number; month: number }) => {
  const isTopThree = rank <= 3;
  const medalColor = isTopThree ? medalColors[rank - 1] : "";

  return (
    <Card className={`border-border ${isTopThree ? "bg-primary/5 border-primary/20" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center w-6 h-6 rounded-full font-semibold text-xs ${
                isTopThree
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {rank}
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={gc.avatar || ""} alt={gc.name || "GC"} />
              <AvatarFallback className="text-lg">
                {gc.name ? gc.name.slice(0, 2).toUpperCase() : "GC"}
              </AvatarFallback>
            </Avatar>
            <span className="text-foreground font-medium text-sm">{gc.name}</span>
          </div>
          <div className="flex items-center gap-1">
            {isTopThree && <RiMedalFill className={`w-4 h-4 ${medalColor}`} />}
            <span className={`font-semibold text-sm ${isTopThree ? "text-primary" : "text-foreground"}`}>
              {gc.points}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs"><b>Membros:</b> {gc.quantityMembers}</span>
            <span className="text-xs"><b>Visitantes:</b> {gc.visitors}</span>
            <span className="text-xs"><b>Presença Cultos:</b> {gc.presenceCults}%</span>
            <span className="text-xs"><b>Servindo:</b> {gc.serving}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs"><b>Cestas:</b> {gc.baskets}</span>
            <span className="text-xs"><b>Presença GC:</b> {gc.presenceGC}%</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-border">
        <GcCardActions gc={gc} month={month} />
      </CardFooter>
    </Card>
  );
};

export default GcCard;