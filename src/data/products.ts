// data/products.ts — every screen reads products from here
import type { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: ImageSourcePropType;
  description: string;
  specs: { label: string; value: string }[];
};

// Edit names, prices, images and descriptions to match your real products.
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "PEUGEOT - LR01",
    category: "Road Bike",
    price: 1999.99,
    image: require("@/assets/images/bicycleRed.png"),
    description:
      "The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles' 130-year history and combines it with agile, dynamic performance that's perfectly suited to navigating today's cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.",
    specs: [
      { label: "Frame", value: "Lugged steel" },
      { label: "Drivetrain", value: "Shimano Claris, 16-speed" },
      { label: "Type", value: "City / road" },
    ],
  },
  {
    id: "2",
    name: "SMITH - Trade",
    category: "Road Helmet",
    price: 120,
    image: require("@/assets/images/helmet.png"),
    description:
      "A lightweight road helmet with adjustable fit and ventilation built for daily commuting.",
    specs: [
      { label: "Type", value: "Road helmet" },
      { label: "Fit", value: "Adjustable" },
    ],
  },
  {
    id: "3",
    name: "PILOT - CHROMOLY 520",
    category: "Road Bike",
    price: 3999.99,
    image: require("@/assets/images/darkbicycle.png"),
    description:
      "A chromoly steel road bike with a smooth ride and a stiff, responsive frame.",
    specs: [
      { label: "Frame", value: "Chromoly 520" },
      { label: "Type", value: "Road" },
    ],
  },
  {
    id: "4",
    name: "VOLTA - E1",
    category: "Electric Bike",
    price: 2499.99,
    image: require("@/assets/images/Electric.png"),
    description:
      "An electric assist bike for longer commutes and hilly routes, with a quiet motor and a removable battery.",
    specs: [
      { label: "Motor", value: "Rear hub, pedal assist" },
      { label: "Type", value: "Electric" },
    ],
  },
];

export const getProduct = (id?: string) => PRODUCTS.find((p) => p.id === id);
