import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import HeaderActions from "./headerActions";
import { typesPoints } from "@/constants";

export const Header = () => {
  return (
    <header className="space-y-4">
      <HeaderActions />

      <Card className="w-full bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">
            Sistema de Pontuação
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entenda como os pontos são calculados para cada categoria
          </CardDescription>
        </CardHeader>
        <CardContent
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          {typesPoints.map((item) => (
            <Card
              key={item.id}
              className="border-border bg-card hover:bg-secondary/20 transition-colors"
            >
              <CardHeader>
                <CardTitle className="text-foreground">{item.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {item.descriptions}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </header>
  );
};
