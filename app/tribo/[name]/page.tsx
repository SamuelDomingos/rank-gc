"use client";

import { use } from "react";
import GcMonth from "@/components/gcMonth";
import { Header } from "@/components/header";
import { ModeToggle } from "@/components/modeToggle";
import RankCategory from "@/components/rankCategory";
import RankGCs from "@/components/rankGCs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetGcs } from "./_hooks/useGcs";
import { useDate } from "@/context/DateContext";
import { Spinner } from "@/components/ui/spinner";

export default function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const { month, year } = useDate();
  const { data, isLoading } = useGetGcs(month, year, name);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <ModeToggle />
      <Header />
      <Tabs defaultValue="masculine">
        <TabsList>
          <TabsTrigger
            value="masculine"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
          >
            masculino
          </TabsTrigger>
          <TabsTrigger
            value="feminine"
            className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=active]:border-secondary"
          >
            feminino
          </TabsTrigger>
        </TabsList>
        <TabsContent value="masculine" className="space-y-6 mt-6">
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              <GcMonth dados={data?.masculine.gcOfTheMonth} />
              <RankGCs dados={data?.masculine.ranking} month={month} />
              <RankCategory dados={data?.masculine.categoryRankings} />
            </div>
          )}
        </TabsContent>
        <TabsContent value="feminine" className="space-y-6 mt-6">
          {isLoading ? (
            <Spinner />
          ) : (
            <div>
              <GcMonth dados={data?.feminine.gcOfTheMonth} />
              <RankGCs dados={data?.feminine.ranking} month={month} />
              <RankCategory dados={data?.feminine.categoryRankings} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}