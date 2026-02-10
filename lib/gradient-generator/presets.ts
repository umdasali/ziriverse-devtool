export interface GradientPreset {
  id: string;
  name: string;
  type: "linear" | "radial";
  angle: number;
  colors: Array<{ color: string; position: number }>;
}

export const gradientPresets: GradientPreset[] = [
  {
    id: "sunset",
    name: "Sunset",
    type: "linear",
    angle: 45,
    colors: [
      { color: "#ff6b6b", position: 0 },
      { color: "#feca57", position: 50 },
      { color: "#ee5a6f", position: 100 },
    ],
  },
  {
    id: "ocean",
    name: "Ocean",
    type: "linear",
    angle: 135,
    colors: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
  },
  {
    id: "forest",
    name: "Forest",
    type: "linear",
    angle: 90,
    colors: [
      { color: "#56ab2f", position: 0 },
      { color: "#a8e063", position: 100 },
    ],
  },
  {
    id: "fire",
    name: "Fire",
    type: "linear",
    angle: 0,
    colors: [
      { color: "#f12711", position: 0 },
      { color: "#f5af19", position: 100 },
    ],
  },
  {
    id: "purple-bliss",
    name: "Purple Bliss",
    type: "linear",
    angle: 180,
    colors: [
      { color: "#360033", position: 0 },
      { color: "#0b8793", position: 100 },
    ],
  },
  {
    id: "sky",
    name: "Sky",
    type: "linear",
    angle: 180,
    colors: [
      { color: "#2980b9", position: 0 },
      { color: "#6dd5fa", position: 50 },
      { color: "#ffffff", position: 100 },
    ],
  },
  {
    id: "candy",
    name: "Candy",
    type: "linear",
    angle: 45,
    colors: [
      { color: "#d38312", position: 0 },
      { color: "#a83279", position: 100 },
    ],
  },
  {
    id: "aurora",
    name: "Aurora",
    type: "linear",
    angle: 90,
    colors: [
      { color: "#00d2ff", position: 0 },
      { color: "#3a47d5", position: 100 },
    ],
  },
  {
    id: "peach",
    name: "Peach",
    type: "linear",
    angle: 135,
    colors: [
      { color: "#ed4264", position: 0 },
      { color: "#ffedbc", position: 100 },
    ],
  },
  {
    id: "mint",
    name: "Mint",
    type: "linear",
    angle: 90,
    colors: [
      { color: "#00b09b", position: 0 },
      { color: "#96c93d", position: 100 },
    ],
  },
  {
    id: "nebula",
    name: "Nebula",
    type: "radial",
    angle: 0,
    colors: [
      { color: "#8e2de2", position: 0 },
      { color: "#4a00e0", position: 100 },
    ],
  },
  {
    id: "rose",
    name: "Rose",
    type: "linear",
    angle: 45,
    colors: [
      { color: "#eb3349", position: 0 },
      { color: "#f45c43", position: 100 },
    ],
  },
];
