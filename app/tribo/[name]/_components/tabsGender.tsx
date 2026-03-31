"use client"

import { TabsContent } from "@/components/ui/tabs";
import GcMonth from "./gcMonth";
import RankGCs from "./rankGCs";
import RankCategory from "./rankCategory";

const TabsGender = ({
  data,
  month,
}: {
  data: any;
  month: number;
}) => {
  return (
    <>
      <TabsContent value="masculine" className="space-y-6 mt-6">
        <GcMonth dados={data?.masculine.gcOfTheMonth} />
        <RankGCs dados={data?.masculine.ranking} month={month} />
        <RankCategory dados={data?.masculine.categoryRankings} />
      </TabsContent>

      <TabsContent value="feminine" className="space-y-6 mt-6">
        <GcMonth dados={data?.feminine.gcOfTheMonth} />
        <RankGCs dados={data?.feminine.ranking} month={month} />
        <RankCategory dados={data?.feminine.categoryRankings} />
      </TabsContent>
    </>
  );
};

export default TabsGender;