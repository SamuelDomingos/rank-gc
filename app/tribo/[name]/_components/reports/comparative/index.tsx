"use client"

import { useParams } from "next/navigation";
import { ComparativeActions } from "./comparative-actions";
import { GcSection } from "./gcSection";
import { useState } from "react";
import { useDate } from "@/context/DateContext";
import { useComparative } from "../../../_hooks/useReports";

const Comparative = () => {
  const params = useParams();
  const tribo = params.name as string;

  const currentDate = new Date();
  const [previousMonth, setPreviousMonth] = useState(
    currentDate.getMonth() - 1,
  );
  const [previousYear, setPreviousYear] = useState(
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear(),
  );

  const { month: currentMonth, year: currentYear } = useDate();

  const { data: gcsData } = useComparative(
    previousMonth,
    previousYear,
    currentMonth,
    currentYear,
    tribo,
  );

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
