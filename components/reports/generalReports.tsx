import { Users, Gift, Trophy, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GeneralReports = () => {
  const stats = [
    { icon: Users, label: "Grupos", value: 5 },
    { icon: Users, label: "Membros", value: 0 },
    { icon: Gift, label: "Cestas", value: 0 },
  ];

  const gruposMasculinos = [
    { id: 1, avatar: "https://example.com/avatar1.jpg", name: "Grupo Fé", points: 0 },
    { id: 2, avatar: "https://example.com/avatar2.jpg", name: "Grupo Amor", points: 0 },
    { id: 3, avatar: "https://example.com/avatar3.jpg", name: "Grupo Alegria", points: 0 },
  ];

  const gruposFemininos = [
    { id: 1, avatar: "https://example.com/avatar4.jpg", name: "Grupo Esperança", points: 0 },
    { id: 2, avatar: "https://example.com/avatar5.jpg", name: "Grupo Paz", points: 0 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Relatório Geral - outubro de 2025
        </h1>
        <Button variant="default" size="sm" className="gap-2">
          <Copy className="w-4 h-4" />
          Copiar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-lg bg-secondary">
                    <Icon className="w-6 h-6 text-secondary-foreground" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-lg font-semibold text-primary">
              Grupos Masculinos ({gruposMasculinos.length})
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Pontos: 0</p>
                <p className="text-muted-foreground">Cestas: 0</p>
              </div>
              <div>
                <p className="text-muted-foreground">Membros: 0</p>
                <p className="text-muted-foreground">Visitantes: 0</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {gruposMasculinos.map((gc, idx) => (
                <div
                  key={gc.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={gc.avatar || ""}
                        alt={gc.name || "GC"}
                      />
                      <AvatarFallback className="text-sm">
                        {gc.name ? gc.name.slice(0, 2).toUpperCase() : "GC"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{gc.name}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {gc.points} pts
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <h2 className="text-lg font-semibold text-primary">
              Grupos Femininos ({gruposFemininos.length})
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Pontos: 0</p>
                <p className="text-muted-foreground">Cestas: 0</p>
              </div>
              <div>
                <p className="text-muted-foreground">Membros: 0</p>
                <p className="text-muted-foreground">Visitantes: 0</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {gruposFemininos.map((gc, idx) => (
                <div
                  key={gc.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={gc.avatar || ""}
                        alt={gc.name || "GC"}
                      />
                      <AvatarFallback className="text-sm">
                        {gc.name ? gc.name.slice(0, 2).toUpperCase() : "GC"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{gc.name}</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {gc.points} pts
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GeneralReports;
