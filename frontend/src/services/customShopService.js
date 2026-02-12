import AcousticEbano from "../img/AcousticEbano.png";
import AcousticMogano from "../img/AcousticMogano.png";
import AcousticPalissandro from "../img/AcousticPalissandro.png";
import AcousticNoce from "../img/AcousticNoce.png";
import AcousticRosso from "../img/AcousticRosso.png";
import AcousticBlu from "../img/AcousticBlu.png";
import AcousticVerde from "../img/AcousticVerde.png";
import AcousticTurchese from "../img/AcousticTurchese.png";

import ClassicEbano from "../img/ClassicEbano.png";
import ClassicMogano from "../img/ClassicMogano.png";
import ClassicPalissandro from "../img/ClassicPalissandro.png";
import ClassicNoce from "../img/ClassicNoce.png";
import ClassicRosso from "../img/ClassicRosso.png";
import ClassicBlu from "../img/ClassicBlu.png";
import ClassicVerde from "../img/ClassicVerde.png";
import ClassicTurchese from "../img/ClassicTurchese.png";

import ElectricEbano from "../img/ElectricEbano.png";
import ElectricMogano from "../img/ElectricMogano.png";
import ElectricPalissandro from "../img/ElectricPalissandro.png";
import ElectricNoce from "../img/ElectricNoce.png";
import ElectricRosso from "../img/ElectricRosso.png";
import ElectricBlu from "../img/ElectricBlu.png";
import ElectricVerde from "../img/ElectricVerde.png";
import ElectricTurchese from "../img/ElectricTurchese.png";

import HollowEbano from "../img/HollowEbano.png";
import HollowMogano from "../img/HollowMogano.png";
import HollowPalissandro from "../img/HollowPalissandro.png";
import HollowNoce from "../img/HollowNoce.png";
import HollowRosso from "../img/HollowRosso.png";
import HollowBlu from "../img/HollowBlu.png";
import HollowVerde from "../img/HollowVerde.png";
import HollowTurchese from "../img/HollowTurchese.png";

export const guitarBodies = [
  { name: "Acoustic", price: 240 },
  { name: "Classic", price: 200 },
  { name: "Electric", price: 360 },
  { name: "Hollow", price: 410 },
];
export const materials = [
  { name: "Palissandro", price: 410 },
  { name: "Ebano", price: 240 },
  { name: "Mogano", price: 350 },
  { name: "Noce", price: 370 },
];
export const colors = [
  { name: "Naturale", colorCode: "#f6c28720", price: 0 },
  { name: "Rosso", colorCode: "#8D0506", price: 230 },
  { name: "Verde", colorCode: "#18902A", price: 260 },
  { name: "Blu", colorCode: "#0F458B", price: 230 },
  { name: "Turchese", colorCode: "#05858A", price: 230 },
];
export const pickups = [
  { name: "Senza", price: 0 },
  { name: "P-90", price: 370 },
  { name: "Single", price: 380 },
  { name: "Humbucker", price: 260 },
  { name: "LR Baggs Anthem", price: 600 },
];
export const imgs = {
  AcousticPalissandro: AcousticPalissandro,
  AcousticEbano: AcousticEbano,
  AcousticMogano: AcousticMogano,
  AcousticNoce: AcousticNoce,
  AcousticRosso: AcousticRosso,
  AcousticVerde: AcousticVerde,
  AcousticBlu: AcousticBlu,
  AcousticTurchese: AcousticTurchese,

  ClassicPalissandro: ClassicPalissandro,
  ClassicEbano: ClassicEbano,
  ClassicMogano: ClassicMogano,
  ClassicNoce: ClassicNoce,
  ClassicRosso: ClassicRosso,
  ClassicVerde: ClassicVerde,
  ClassicBlu: ClassicBlu,
  ClassicTurchese: ClassicTurchese,

  ElectricPalissandro: ElectricPalissandro,
  ElectricEbano: ElectricEbano,
  ElectricMogano: ElectricMogano,
  ElectricNoce: ElectricNoce,
  ElectricRosso: ElectricRosso,
  ElectricVerde: ElectricVerde,
  ElectricBlu: ElectricBlu,
  ElectricTurchese: ElectricTurchese,

  HollowPalissandro: HollowPalissandro,
  HollowEbano: HollowEbano,
  HollowMogano: HollowMogano,
  HollowNoce: HollowNoce,
  HollowRosso: HollowRosso,
  HollowVerde: HollowVerde,
  HollowBlu: HollowBlu,
  HollowTurchese: HollowTurchese,
};

export const getActiveImg = (body, material, color) => {
  let activeImg;
  if (color === "Naturale") {
    activeImg = imgs[`${body}${material}`];
  } else {
    activeImg = imgs[`${body}${color}`];
  }
  return activeImg;
};
