import { Users, Gift, User, UserRoundPlus, Church } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDashboardStats } from "@/app/tribo/[name]/_hooks/useReports";
import { useDate } from "@/context/DateContext";
import { Spinner } from "@/components/ui/spinner";
import { useParams } from "next/navigation";

const GeneralReports = () => {
  const params = useParams();
  const tribo = params.name as string;
  const { month, year } = useDate();
  const { data, isLoading } = useDashboardStats(month, year, tribo);

  const stats = [
    { icon: Users, label: "GCs", value: data?.totalGcs },
    { icon: User, label: "Membros", value: data?.totalMembers },
    { icon: Gift, label: "Valor Arrecadado", value: data?.totalamountCollected },
    { icon: UserRoundPlus, label: "Visitantes", value: data?.totalVisitors },
    { icon: Church, label: "Membros Servindo", value: data?.membersServing },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Relatório Geral - {month}/{year}
      </h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.slice(0, 3).map((stat, idx) => {
              const Icon = stat.icon;
              const colors = ["bg-secondary", "bg-primary"];
              const colorsIcon = [
                "text-secondary-foreground",
                "text-primary-foreground",
              ];
              const bgColor = colors[idx % 2];
              const textColor = colorsIcon[idx % 2];
              return (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-lg ${bgColor}`}>
                        <Icon className={`w-6 h-6 ${textColor}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.slice(3).map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Card key={idx + 3}>
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`p-3 rounded-lg bg-primary`}>
                        <Icon className={`w-6 h-6 text-primary-foreground`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralReports;
