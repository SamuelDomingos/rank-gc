export function presenceLabel(field: string): string {
  switch (field) {
    case "presenceGC":
      return "GC";
    case "presenceCults":
      return "Culto";
    default:
      return field;
  }
}

export function mapCategoryLabel(category: string): string {
  switch (category) {
    case "FoodBaskets":
      return "Cestas Básicas";
    case "Visitors":
      return "Visitantes";
    case "GCPresence":
      return "Presença no GC";
    case "WorshipPresence":
      return "Presença nos Cultos";
    case "Serving":
      return "Servindo";
    default:
      return category;
  }
}