import img1 from "@assets/products/electronics/1.webp";
import img2 from "@assets/products/electronics/2.webp";
import img3 from "@assets/products/electronics/3.webp";
import img4 from "@assets/products/electronics/4.webp";
import img5 from "@assets/products/electronics/5.webp";
import img6 from "@assets/products/electronics/6.webp";
import img7 from "@assets/products/electronics/7.webp";
import { faker } from "@faker-js/faker";

const products = [
  {
    id: "category-1",
    name: "Folk",
    img: img1,
    category: "electronics",
    songs: 1548,
    albums: 274,
    date: faker.date.past(),
  },
  {
    id: "category-2",
    name: "Pop",
    img: img2,
    category: "electronics",
    songs: 566,
    albums: 414,
    date: faker.date.past(),
  },
  {
    id: "category-3",
    name: "V-Pop",
    img: img3,
    category: "electronics",
    songs: 2471,
    albums: 366,
    date: faker.date.past(),
  },
  {
    id: "category-4",
    name: "Rock and Roll",
    img: img4,
    category: "electronics",
    songs: 102,
    albums: 1923,
    date: faker.date.past(),
  },
  {
    id: "category-5",
    name: "Ballad",
    img: img5,
    category: "electronics",
    songs: 27,
    albums: 662,
    date: faker.date.past(),
  },
  {
    id: "category-6",
    name: "Love",
    img: img6,
    category: "electronics",
    songs: 1006,
    albums: 19874,
    date: faker.date.past(),
  },
  {
    id: "category-7",
    name: "Gym",
    img: img7,
    category: "electronics",
    songs: 5,
    albums: 15,
    date: faker.date.past(),
    status: "publish",
  },
];

export default products;
