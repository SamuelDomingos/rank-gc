"use client";

import { ChevronDownIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDate } from "@/context/DateContext";
import { useState } from "react";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface DatePickerProps {
  month?: number;
  year?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
  useContext?: boolean;
  className?: string;
}

export function DatePicker({
  month: externalMonth,
  year: externalYear,
  onMonthChange,
  onYearChange,
  useContext: useContextMode = true,
  className = "w-48",
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const contextDate = useDate();
  const month =
    externalMonth !== undefined
      ? externalMonth
      : useContextMode
        ? contextDate?.month
        : undefined;
  const year =
    externalYear !== undefined
      ? externalYear
      : useContextMode
        ? contextDate?.year
        : undefined;

  const setMonth =
    onMonthChange ?? (useContextMode ? contextDate?.setMonth : undefined);
  const setYear =
    onYearChange ?? (useContextMode ? contextDate?.setYear : undefined);

  if (month === undefined || year === undefined) {
    throw new Error(
      "DatePicker: forneça 'month' e 'year' como props ou use dentro de um DateProvider",
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

  const handlePreviousMonth = () => {
    if (month === 1) {
      setMonth?.(12);
      setYear?.(year - 1);
    } else {
      setMonth?.(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth?.(1);
      setYear?.(year + 1);
    } else {
      setMonth?.(month + 1);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-between font-normal ${className}`}
        >
          {months[month - 1]} {year}
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={handlePreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-2">
              <Select
                value={month.toString()}
                onValueChange={(value) => setMonth?.(Number(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m, i) => (
                    <SelectItem key={i} value={(i + 1).toString()}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={year.toString()}
                onValueChange={(value) => setYear?.(Number(value))}
              >
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button variant="secondary" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
