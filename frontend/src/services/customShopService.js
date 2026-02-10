import AcousticImg from "../img/Acoustic.png";
import ClassicImg from "../img/Classic.png";
import ElectricImg from "../img/Electric.png";
import HollowImg from "../img/Hollow.png";

export const guitarBodies = [
  { body: "Acoustic", price: 240 },
  { body: "Classic", price: 200 },
  { body: "Electric", price: 360 },
  { body: "Hollow", price: 410 },
];
export const materials = [
  { name: "Ebano", price: 240 },
  { name: "Mogano", price: 350 },
  { name: "Palissandro", price: 410 },
  { name: "Noce", price: 370 },
];
export const colors = [
  { name: "Naturale", price: 0 },
  { name: "Colore1", price: 230 },
  { name: "Colore2", price: 260 },
  { name: "Colore3", price: 230 },
  { name: "Colore4", price: 230 },
];
export const pickups = [
  { name: "Senza", price: 0 },
  { name: "Pickup1", price: 370 },
  { name: "Pickup2", price: 380 },
  { name: "Pickup3", price: 260 },
  { name: "Pickup4", price: 600 },
];
export const imgs = {
  Acoustic: AcousticImg,
  Classic: ClassicImg,
  Electric: ElectricImg,
  Hollow: HollowImg,
};
