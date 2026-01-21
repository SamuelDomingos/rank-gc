import { Card, CardContent } from "@/components/ui/card";
import { RiMedalFill } from "@remixicon/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CategoryRankings } from "@/lib/api/types";
import { mapCategoryLabel } from "@/lib/utils";

const RankCategory = ({ dados }: { dados?: CategoryRankings | null }) => {
  const medalColors = ["text-yellow-500", "text-gray-400", "text-orange-600"];

  return (
    <div className="space-y-6">
      {dados?.map((category) => (
        <div key={category.category} className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground">
            {mapCategoryLabel(category.category)}
          </h3>
          <div className="space-y-2">
            {category.ranks.map((rank: typeof category.ranks[0], index: number) => {
              const isVisitors = category.category === "Visitors";

              return (
                <Card
                  key={`${category.category}-${rank.id}`}
                  className="border-border"
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={rank.avatar ?? undefined}
                          alt={rank.name}
                        />
                        <AvatarFallback className="text-lg">{rank.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <RiMedalFill
                        className={`w-6 h-6 ${medalColors[index] ?? ""}`}
                      />
                      <span className="text-foreground font-medium">
                        {rank.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-foreground">
                        {isVisitors
                          ? `${rank.value} visitantes`
                          : `${rank.value}%`}{" "}
                        ({rank.points} pts)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankCategory;
