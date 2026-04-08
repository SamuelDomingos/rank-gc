import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { toast } from "sonner";

interface Metric {
  current: number | string;
  previous: number | string;
  comparative: number;
}

interface GC {
  id: string;
  gc: string;
  metrics: {
    amountCollected: Metric;
    visitors: Metric;
    gcAttendance: Metric;
    serviceAttendance: Metric;
    serving: Metric;
  };
}

interface GCData {
  masculine: GC[];
  feminine: GC[];
}

export const exportAsPDF = (data: GCData): void => {
  try {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 15;
    const margin = 10;

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("", "bold");
    doc.text("RELATÓRIO DE GCs", margin, yPosition);
    yPosition += 6;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.setFont("", "normal");
    doc.text(
      `Data: ${new Date().toLocaleDateString("pt-BR")}`,
      margin,
      yPosition,
    );
    yPosition += 8;

    const adicionarGC = (gc: GC): void => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = 10;
      }

      doc.setFontSize(11);
      doc.setFont("", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${gc.gc}`, margin, yPosition);
      yPosition += 5;

      doc.setFontSize(9);
      doc.setFont("", "normal");
      doc.setTextColor(60, 60, 60);

      const metricas = [
        {
          label: "Cestas",
          current: parseInt(String(gc.metrics.amountCollected.current)),
          previous: parseInt(String(gc.metrics.amountCollected.previous)),
        },
        {
          label: "Visitantes",
          current: parseInt(String(gc.metrics.visitors.current)),
          previous: parseInt(String(gc.metrics.visitors.previous)),
        },
        {
          label: "Freq. GC",
          current: parseInt(String(gc.metrics.gcAttendance.current)),
          previous: parseInt(String(gc.metrics.gcAttendance.previous)),
        },
        {
          label: "Freq. Serviço",
          current: parseInt(String(gc.metrics.serviceAttendance.current)),
          previous: parseInt(String(gc.metrics.serviceAttendance.previous)),
        },
        {
          label: "Servindo",
          current: parseInt(String(gc.metrics.serving.current)),
          previous: parseInt(String(gc.metrics.serving.previous)),
        },
      ];

      metricas.forEach((m) => {
        const diferenca = m.current - m.previous;
        const seta = diferenca > 0 ? "↑" : diferenca < 0 ? "↓" : "→";
        const simbolo = diferenca > 0 ? "+" : "";

        const texto = `${m.label}: ${m.current} (ant: ${m.previous} ${simbolo}${diferenca}) ${seta}`;
        doc.text(texto, margin + 3, yPosition);
        yPosition += 4;
      });

      yPosition += 3;
    };

    if (data.masculine && data.masculine.length > 0) {
      doc.setFontSize(12);
      doc.setFont("", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("GCs MASCULINOS", margin, yPosition);
      yPosition += 5;

      data.masculine.forEach((gc: GC) => {
        adicionarGC(gc);
      });
    }

    if (data.feminine && data.feminine.length > 0) {
      doc.setFontSize(12);
      doc.setFont("", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("GCs FEMININOS", margin, yPosition);
      yPosition += 5;

      data.feminine.forEach((gc: GC) => {
        adicionarGC(gc);
      });
    }

    doc.save("relatorio_gcs.pdf");
    toast.success("PDF gerado!");
  } catch (error) {
    console.error("Erro:", error);
    toast.error("Erro ao gerar PDF");
  }
};

export const exportAsExcel = (data: GCData): void => {
  try {
    const workbook = XLSX.utils.book_new();

    // ═══ PLANILHA 1: RESUMO GERAL ═══
    const resumoGeral: Record<string, string | number>[] = [];

    const adicionarResumo = (grupos: GC[], genero: string): void => {
      grupos.forEach((grupo: GC) => {
        resumoGeral.push({
          Gênero: genero,
          GC: grupo.gc,
          Cestas: parseInt(String(grupo.metrics.amountCollected.current)),
          Visitantes: parseInt(String(grupo.metrics.visitors.current)),
          "Freq. GC": parseInt(String(grupo.metrics.gcAttendance.current)),
          "Freq. Serviço": parseInt(
            String(grupo.metrics.serviceAttendance.current),
          ),
          Servindo: parseInt(String(grupo.metrics.serving.current)),
        });
      });
    };

    adicionarResumo(data.masculine, "Masculino");
    adicionarResumo(data.feminine, "Feminino");

    const worksheetResumo = XLSX.utils.json_to_sheet(resumoGeral);
    worksheetResumo["!cols"] = [
      { wch: 12 },
      { wch: 15 },
      { wch: 10 },
      { wch: 10 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
      { wch: 10 },
    ];

    XLSX.utils.book_append_sheet(workbook, worksheetResumo, "Resumo");

    // ═══ PLANILHA 2: COMPARATIVO ═══
    const comparativo: Record<string, string | number>[] = [];

    const adicionarComparativo = (grupos: GC[], genero: string): void => {
      grupos.forEach((grupo: GC) => {
        comparativo.push({
          Gênero: genero,
          GC: grupo.gc,
          "Cestas Atual": parseInt(
            String(grupo.metrics.amountCollected.current),
          ),
          "Cestas Anterior": parseInt(
            String(grupo.metrics.amountCollected.previous),
          ),
          "Cestas Diferença":
            parseInt(String(grupo.metrics.amountCollected.current)) -
            parseInt(String(grupo.metrics.amountCollected.previous)),
          "Visitantes Atual": parseInt(String(grupo.metrics.visitors.current)),
          "Visitantes Anterior": parseInt(
            String(grupo.metrics.visitors.previous),
          ),
          "Visitantes Diferença":
            parseInt(String(grupo.metrics.visitors.current)) -
            parseInt(String(grupo.metrics.visitors.previous)),
        });
      });
    };

    adicionarComparativo(data.masculine, "Masculino");
    adicionarComparativo(data.feminine, "Feminino");

    const worksheetComparativo = XLSX.utils.json_to_sheet(comparativo);
    worksheetComparativo["!cols"] = [
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
      { wch: 12 },
      { wch: 12 },
      { wch: 14 },
    ];

    XLSX.utils.book_append_sheet(workbook, worksheetComparativo, "Comparativo");

    XLSX.writeFile(workbook, "relatorio_gcs.xlsx");
    toast.success("Excel gerado!");
  } catch (error) {
    console.error("Erro:", error);
    toast.error("Erro ao gerar Excel");
  }
};

// ╔═══════════════════════════════════════════════════════════════╗
// ║                 COPIAR PARA WHATSAPP                          ║
// ╚═══════════════════════════════════════════════════════════════╝

export const copyToWhatsApp = (data: GCData): void => {
  const formatarDados = (dados: GCData): string => {
    let texto = "📊 RELATÓRIO DE GCs\n";
    texto += "════════════════════════════════════\n\n";

    const obterSeta = (current: number, previous: number): string => {
      if (current > previous) return "📈 ↑";
      if (current < previous) return "📉 ↓";
      return "➡️ ";
    };

    const formatarMetrica = (
      label: string,
      current: number,
      previous: number,
    ): string => {
      const seta = obterSeta(current, previous);
      const diferenca = current - previous;
      const simbolo = diferenca > 0 ? "+" : "";
      return `   ${label}: ${current} ${seta} (mês ant: ${previous} ${simbolo}${diferenca})`;
    };

    if (dados.masculine && dados.masculine.length > 0) {
      texto += "👨 GRUPOS MASCULINOS:\n";
      texto += "═══════════════════════════════════\n";
      dados.masculine.forEach((grupo: GC) => {
        texto += `\n🔹 ${grupo.gc.toUpperCase()}\n`;
        texto += "   ───────────────────────\n";
        texto +=
          formatarMetrica(
            "Cestas",
            parseInt(String(grupo.metrics.amountCollected.current)),
            parseInt(String(grupo.metrics.amountCollected.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Visitantes",
            parseInt(String(grupo.metrics.visitors.current)),
            parseInt(String(grupo.metrics.visitors.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Freq. GC",
            parseInt(String(grupo.metrics.gcAttendance.current)),
            parseInt(String(grupo.metrics.gcAttendance.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Freq. Serviço",
            parseInt(String(grupo.metrics.serviceAttendance.current)),
            parseInt(String(grupo.metrics.serviceAttendance.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Servindo",
            parseInt(String(grupo.metrics.serving.current)),
            parseInt(String(grupo.metrics.serving.previous)),
          ) + "\n";
      });
    }

    if (dados.feminine && dados.feminine.length > 0) {
      texto += "\n\n👩 GRUPOS FEMININOS:\n";
      texto += "═══════════════════════════════════\n";
      dados.feminine.forEach((grupo: GC) => {
        texto += `\n🔹 ${grupo.gc.toUpperCase()}\n`;
        texto += "   ───────────────────────\n";
        texto +=
          formatarMetrica(
            "Cestas",
            parseInt(String(grupo.metrics.amountCollected.current)),
            parseInt(String(grupo.metrics.amountCollected.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Visitantes",
            parseInt(String(grupo.metrics.visitors.current)),
            parseInt(String(grupo.metrics.visitors.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Freq. GC",
            parseInt(String(grupo.metrics.gcAttendance.current)),
            parseInt(String(grupo.metrics.gcAttendance.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Freq. Serviço",
            parseInt(String(grupo.metrics.serviceAttendance.current)),
            parseInt(String(grupo.metrics.serviceAttendance.previous)),
          ) + "\n";
        texto +=
          formatarMetrica(
            "Servindo",
            parseInt(String(grupo.metrics.serving.current)),
            parseInt(String(grupo.metrics.serving.previous)),
          ) + "\n";
      });
    }

    texto += "\n═══════════════════════════════════\n";
    texto += "Legenda: 📈 Crescimento | 📉 Queda | ➡️ Sem alteração\n";

    return texto;
  };

  const textoFormatado = formatarDados(data);

  navigator.clipboard
    .writeText(textoFormatado)
    .then(() => {
      toast.success("Texto copiado para a área de transferência");
    })
    .catch((err) => {
      console.error("Erro ao copiar:", err);
      toast.error("Erro ao copiar o texto");
    });
};
