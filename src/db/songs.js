import img1 from "@assets/products/electronics/1.webp";
import img2 from "@assets/products/electronics/2.webp";
import img3 from "@assets/products/electronics/3.webp";
import img4 from "@assets/products/electronics/4.webp";
import img5 from "@assets/products/electronics/5.webp";
import img6 from "@assets/products/electronics/6.webp";
import img7 from "@assets/products/electronics/7.webp";
import { faker } from "@faker-js/faker";

const sonsgs = [
  {
    id: "song-1",
    name: "Chúng ta của tương lai",
    img: img1,
    artists: "Sơn Tùng MTP",
    duration: "3:24",
    date: faker.date.past(),
  },
  {
    id: "song-2",
    name: "Pop",
    img: img2,
    artists: "electronics",
    duration: 566,
    date: faker.date.past(),
  },
  {
    id: "song-3",
    name: "V-Pop",
    img: img3,
    artists: "electronics",
    duration: 2471,
    date: faker.date.past(),
  },
  {
    id: "song-4",
    name: "Rock and Roll",
    img: img4,
    artists: "electronics",
    duration: 102,
    date: faker.date.past(),
  },
  {
    id: "song-5",
    name: "Ballad",
    img: img5,
    artists: "electronics",
    duration: 27,
    date: faker.date.past(),
  },
  {
    id: "song-6",
    name: "Love",
    img: img6,
    artists: "electronics",
    duration: 1006,
    date: faker.date.past(),
  },
  {
    id: "song-7",
    name: "Gym",
    img: img7,
    artists: "electronics",
    duration: 5,
    date: faker.date.past(),
    status: "publish",
  },
];

export default sonsgs;
