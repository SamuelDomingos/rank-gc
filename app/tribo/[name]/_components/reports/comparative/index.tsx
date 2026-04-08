import { ComparativeActions } from "./comparativeActions";
import { GcSection } from "./gcSection";
import { useComparative } from "../../../_hooks/useReports";

const Comparative = () => {
  
  const {
    data: gcsData,
    previousMonth,
    previousYear,
    setPreviousMonth,
    setPreviousYear,
  } = useComparative();

  if (!gcsData) return null;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Análise Comparativa</h1>
        <ComparativeActions
          previousMonth={previousMonth}
          previousYear={previousYear}
          setPreviousMonth={setPreviousMonth}
          setPreviousYear={setPreviousYear}
          gcsData={gcsData}
        />
      </div>

      <div className="space-y-6">
        <GcSection tipo="Masculinos" gc={gcsData?.masculine || []} />
        <GcSection tipo="Femininos" gc={gcsData?.feminine || []} />
      </div>
    </div>
  );
};

export default Comparative;
