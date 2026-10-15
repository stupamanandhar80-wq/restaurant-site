import hummusImage from "../assets/dishes/hummus.jpg";
import saladImage from "../assets/dishes/salad.jpg";
import chickenRiceImage from "../assets/dishes/chicken-rice.jpg";
import flatbreadImage from "../assets/dishes/flatbread.jpg";
import cakeImage from "../assets/dishes/pistachio-cake.jpg";
import yogurtImage from "../assets/dishes/yogurt-bowl.jpg";

const menuItems = [
  {
    id: 1,
    name: "Roasted Pepper Hummus",
    description: "Creamy chickpeas, roasted peppers, and warm flatbread.",
    category: "Starters",
    price: 350,
    vegetarian: true,

    image: hummusImage,
    imageAlt: "Roasted pepper hummus served with flatbread",

    ingredients: [
      "Chickpeas",
      "Roasted red peppers",
      "Tahini",
      "Lemon",
      "Olive Oil",
      "Flatbread",
    ],
  },
  {
    id: 2,
    name: "Lemon Herb Salad",
    description: "Fresh greens, cucumber, olives, and lemon dressing.",
    category: "Starters",
    price: 320,
    vegetarian: true,

    image: saladImage,
    imageAlt: "Lemon herb salad with mixed greens and cucumber",

    ingredients: ["Mixed greens", "Cucumber", "Olives", "Lemon", "Fresh herbs"],
  },
  {
    id: 3,
    name: "Saffron Chicken Rice",
    description: "Grilled chicken served over fragrant saffron rice.",
    category: "Mains",
    price: 650,
    vegetarian: false,
    image: chickenRiceImage,
    imageAlt: "Saffron chicken rice with grilled chicken and saffron rice",
    ingredients: ["Chicken", "Rice", "Saffron", "Garlic", "Olive oil"],
  },
  {
    id: 4,
    name: "Roasted Vegetable Flatbread",
    description: "Seasonal vegetables, feta, and herbs on crisp flatbread.",
    category: "Mains",
    price: 550,
    vegetarian: true,

    image: flatbreadImage,
    imageAlt: "Roasted vegetable flatbread with feta and herbs",

    ingredients: [
      "Flatbread",
      "Seasonal vegetables",
      "Feta",
      "Olive oil",
      "Herbs",
    ],
  },
  {
    id: 5,
    name: "Honey Pistachio Cake",
    description: "A soft pistachio cake finished with honey.",
    category: "Desserts",
    price: 280,
    vegetarian: true,

    image: cakeImage,
    imageAlt: "Honey pistachio cake with a drizzle of honey",

    ingredients: ["Flour", "Pistachios", "Honey", "Eggs", "Butter"],
  },
  {
    id: 6,
    name: "Orange Yogurt Bowl",
    description: "Thick yogurt with orange, toasted nuts, and honey.",
    category: "Desserts",
    price: 250,
    vegetarian: true,

    image: yogurtImage,
    imageAlt: "Orange yogurt bowl with mixed nuts and honey",

    ingredients: ["Yogurt", "Orange", "Mixed nuts", "Honey"],
  },
];

export default menuItems;
