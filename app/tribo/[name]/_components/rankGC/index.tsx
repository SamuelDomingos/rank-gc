import { GCBase } from "@/services/types/rank";
import GcCard from "./gcCard";

const RankGCs = ({
  dados,
  month,
}: {
  dados?: GCBase[];
  month: number;
}) => {
  return (
    <div className="mt-6 mb-6 space-y-6">
      <h2 className="text-2xl font-semibold text-foreground">Rank Geral</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dados?.map((gc, idx) => (
          <GcCard key={gc.name + idx} gc={gc} rank={idx + 1} month={month} />
        ))}
      </div>
    </div>
  );
};

export default RankGCs;
