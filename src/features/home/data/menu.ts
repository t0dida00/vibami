export const signatureItems = [
  {
    name: "Grilled Pork Bánh Mì",
    description: "Marinated grilled pork with pickled veggies, cucumber & herbs.",
    price: "€6.50",
  },
  {
    name: "Grilled Chicken Bánh Mì",
    description: "Lemongrass chicken with fresh veggies & house sauce.",
    price: "€6.50",
  },
  {
    name: "Beef Skewer Bánh Mì",
    description: "Grilled beef skewers with pickled veggies, herbs & chili sauce.",
    price: "€6.80",
  },
  {
    name: "Meatball Bánh Mì",
    description: "Juicy pork meatballs in tomato sauce with fresh vegetables.",
    price: "€6.50",
  },
  {
    name: "Egg Mayo Bánh Mì",
    description: "Creamy egg mayo with pickled vegetables and cucumber.",
    price: "€5.50",
  },
  {
    name: "Mixed Grill Bánh Mì",
    description: "Pork and beef with fresh vegetables and signature sauce.",
    price: "€7.20",
  },
] as const;

export const builderSteps = [
  {
    title: "Choose bread",
    options: ["Vietnamese baguette", "Soft sub roll"],
  },
  {
    title: "Choose size",
    options: ["19 cm", "29 cm"],
  },
  {
    title: "Choose protein",
    options: ["Grilled pork", "Grilled chicken", "Beef skewer", "Meatball", "Egg mayo"],
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
