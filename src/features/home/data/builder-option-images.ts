type BuilderOptionImage = {
  image?: string;
  prompt: string;
};

export const builderOptionImageDetails: Record<string, BuilderOptionImage> = {
  "Beef skewer": {
    image: "/ingredients/ingredient-beef-skewer.svg",
    prompt: "charred beef skewer slices, dark caramelized grilled edges, glossy brown glaze",
  },
  Cilantro: {
    image: "/ingredients/topping-cilantro.svg",
    prompt: "fresh cilantro leaves, bright green leafy herb sprigs",
  },
  Cucumber: {
    image: "/ingredients/topping-cucumber.svg",
    prompt: "thin cucumber rounds, pale green centers with darker green edges",
  },
  "Fresh chili": {
    image: "/ingredients/topping-fresh-chili.svg",
    prompt: "small sliced fresh red chili rings with visible seeds",
  },
  "Grilled chicken": {
    image: "/ingredients/ingredient-grilled-chicken.svg",
    prompt: "golden grilled chicken pieces with light char marks and juicy sliced texture",
  },
  "Grilled pork": {
    image: "/ingredients/ingredient-grilled-pork.svg",
    prompt: "marinated grilled pork slices, warm golden-brown color, caramelized edges",
  },
  Meatball: {
    image: "/ingredients/ingredient-meatball.svg",
    prompt: "round pork meatballs coated in red tomato sauce",
  },
  Medium: {
    image: "/ingredients/topping-fresh-chili.svg",
    prompt: "a moderate amount of sliced fresh red chili",
  },
  "Mixed grill": {
    image: "/ingredients/ingredient-grilled-pork.svg",
    prompt: "mixed grilled pork and beef pieces with caramelized brown edges",
  },
  "No spicy": {
    prompt: "no chili peppers and no spicy garnish",
  },
  "Pickled carrot & daikon": {
    image: "/ingredients/topping-pickled-carrot-daikon.svg",
    prompt: "pickled carrot and daikon matchsticks, bright orange carrot strips and white daikon strips",
  },
  "Spring onion": {
    image: "/ingredients/topping-spring-onion.svg",
    prompt: "chopped spring onion, small green and pale white scallion pieces",
  },
  Mild: {
    image: "/ingredients/topping-fresh-chili.svg",
    prompt: "a few small sliced fresh red chili rings",
  },
  "Extra spicy": {
    image: "/ingredients/topping-fresh-chili.svg",
    prompt: "many sliced fresh red chili rings spread visibly through the sandwich",
  },
};

export const builderOptionImages = Object.fromEntries(
  Object.entries(builderOptionImageDetails)
    .filter(([, details]) => details.image)
    .map(([option, details]) => [option, details.image]),
) as Record<string, string>;

export const sampleOutputImage = "/samples/sample.svg";
