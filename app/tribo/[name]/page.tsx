import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsGender from "./_components/tabsGender";
import getGcs from "./_services/getGcs";
import { Header } from "./_components/header";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ month?: string; year?: string }>;
}) {
  const { name } = await params;
  const { month: m, year: y } = await searchParams;

  const month = Number(m) || new Date().getMonth() + 1;
  const year = Number(y) || new Date().getFullYear();

  const result = await getGcs(month, year, name);

  if (!result.success || !result.data) {
    return <div>Erro ao carregar dados.</div>;
  }

  const { data } = result;

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
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
        <TabsGender data={data} month={month} />
      </Tabs>
    </div>
  );
}
