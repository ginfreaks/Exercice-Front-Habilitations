/**
 * Fonction utilitaire pour la transformation des dates au format: dd//mm/yyyy hh:mm
 * @param date
 * @returns
 */
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
