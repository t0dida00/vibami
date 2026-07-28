export const builderSteps = [
  {
    title: "Choose size",
    options: ["19 cm", "29 cm"],
  },
  {
    title: "Choose protein",
    options: ["Grilled pork", "Grilled chicken", "Crispy pork", "Beef skewer", "Meatball", "Egg mayo", "Mixed grill"],
  },
  {
    title: "Choose sauce",
    options: ["House grilled sauce", "Egg mayo", "Vietnamese fish sauce", "Chili sauce"],
  },
  {
    title: "Choose toppings",
    options: ["Pickled carrot & daikon", "Cucumber", "Cilantro", "Spring onion", "Fresh chili"],
  },
  {
    title: "Spice level",
    options: ["No spicy", "Mild", "Medium", "Extra spicy"],
  },
] as const;

export const comboItems = [
  { name: "Vietnamese Iced Coffee", price: "€2.50" },
  { name: "Soft Drink", price: "€2.00" },
  { name: "Spring Rolls", price: "€2.50" },
  { name: "Fruit Cup", price: "€2.50" },
  { name: "Crispy Chips", price: "€1.50" },
] as const;
