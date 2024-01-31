export const INTERVALS = [
  {
    label: "30 segundos",
    value: 30,
  },
  {
    label: "1 minuto",
    value: 60,
  },
  {
    label: "5 minutos",
    value: 300,
  },
  {
    label: "15 minutos",
    value: 900,
  },
  {
    label: "30 minutos",
    value: 1800,
  },
  {
    label: "1 hora",
    value: 3600,
  },
  {
    label: "2 horas",
    value: 7200,
  },
  {
    label: "4 horas",
    value: 14400,
  },
  {
    label: "8 horas",
    value: 28800,
  },
  {
    label: "12 horas",
    value: 43200,
  },
  {
    label: "24 horas",
    value: 86400,
  },
];

export interface TrendsTableData {
  name: string;
  [key: number]: number | null;
}
