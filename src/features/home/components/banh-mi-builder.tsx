"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowClockwise";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { builderSteps } from "@/features/home/data/menu";
import { cn } from "@/lib/utils";

import styles from "./banh-mi-builder.module.scss";
import { SectionHeading } from "./section-heading";

const MULTI_SELECT_STEP_TITLE = "Choose toppings";
const DEFAULT_OPEN_STEPS = builderSteps.map((_, index) => `step-${index}`);
const optionImages: Record<string, string> = {
  "Beef skewer": "/ingredients/ingredient-beef-skewer.svg",
  Cilantro: "/ingredients/topping-cilantro.svg",
  Cucumber: "/ingredients/topping-cucumber.svg",
  "Fresh chili": "/ingredients/topping-fresh-chili.svg",
  "Grilled chicken": "/ingredients/ingredient-grilled-chicken.svg",
  "Grilled pork": "/ingredients/ingredient-grilled-pork.svg",
  Meatball: "/ingredients/ingredient-meatball.svg",
  Medium: "/ingredients/topping-fresh-chili.svg",
  "Mixed grill": "/ingredients/ingredient-grilled-pork.svg",
  "No spicy": "/ingredients/topping-fresh-chili.svg",
  "Pickled carrot & daikon": "/ingredients/topping-pickled-carrot-daikon.svg",
  "Spring onion": "/ingredients/topping-spring-onion.svg",
  Mild: "/ingredients/topping-fresh-chili.svg",
  "Extra spicy": "/ingredients/topping-fresh-chili.svg",
};

export type BuilderSelection = string | string[];
export type BuilderSelections = Record<number, BuilderSelection>;

type BanhMiBuilderProps = {
  presetSelections?: BuilderSelections | null;
};

export function BanhMiBuilder({ presetSelections }: BanhMiBuilderProps) {
  const [openSteps, setOpenSteps] = useState<string[]>(DEFAULT_OPEN_STEPS);
  const [selections, setSelections] = useState<BuilderSelections>(() => presetSelections ?? {});
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [illustrationError, setIllustrationError] = useState("");
  const [isIllustrating, setIsIllustrating] = useState(false);

  function selectOption(stepIndex: number, option: string, allowMultiple: boolean) {
    if (allowMultiple) {
      setSelections((current) => {
        const currentOptions = current[stepIndex];
        const selectedOptions = Array.isArray(currentOptions) ? currentOptions : [];
        const nextOptions = selectedOptions.includes(option)
          ? selectedOptions.filter((selectedOption) => selectedOption !== option)
          : [...selectedOptions, option];

        return { ...current, [stepIndex]: nextOptions };
      });
      return;
    }

    setSelections((current) => ({ ...current, [stepIndex]: option }));
  }

  function clearSelections() {
    setSelections({});
    setOpenSteps(DEFAULT_OPEN_STEPS);
    setGeneratedImage(null);
    setIllustrationError("");
  }

  const selectedParts = builderSteps
    .map((_, index) => {
      const selection = selections[index];
      return Array.isArray(selection) ? selection.join(", ") : selection;
    })
    .filter(Boolean);
  const summary = selectedParts
    .join(" · ");

  function buildIllustrationPrompt() {
    return [
      "Create an appetizing product illustration of a Vietnamese bánh mì sandwich.",
      "Use a clean menu-style food photography composition on a light warm background.",
      "Show the sandwich clearly with crisp bread and visible selected fillings.",
      `Customer selections: ${summary}.`,
      "No text, no logo, no hands, no packaging.",
    ].join(" ");
  }

  async function illustrateBanhMi() {
    if (!summary || isIllustrating) {
      return;
    }

    setIsIllustrating(true);
    setIllustrationError("");

    try {
      const response = await fetch("/api/illustrate-banh-mi", {
        body: JSON.stringify({ prompt: buildIllustrationPrompt() }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = (await response.json()) as { imageUrl?: string; error?: string };

      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || "Could not generate the illustration.");
      }

      setGeneratedImage(data.imageUrl);
    } catch (error) {
      setIllustrationError(error instanceof Error ? error.message : "Could not generate the illustration.");
    } finally {
      setIsIllustrating(false);
    }
  }

  return (
    <section className={styles.section} id="builder">
      <div className={styles.inner}>
        <SectionHeading description="Your bánh mì, your way." title="Build Your Bánh Mì" />
        <div className={styles.layout}>
          <div className={styles.builderColumn}>
            <Accordion
              className={styles.steps}
              onValueChange={setOpenSteps}
              type="multiple"
              value={openSteps}
            >
              {builderSteps.map((step, stepIndex) => {
                const allowMultiple = step.title === MULTI_SELECT_STEP_TITLE;
                const selectedOption = selections[stepIndex];
                const stepSelection = Array.isArray(selectedOption)
                  ? selectedOption.join(", ")
                  : selectedOption;

                return (
                  <AccordionItem key={step.title} value={`step-${stepIndex}`}>
                    <AccordionTrigger className={styles.stepTrigger}>
                      <span className={styles.stepIdentity}>
                        <span className={styles.stepNumber}>{stepIndex + 1}</span>
                        <span className={styles.stepTitle}>{step.title}</span>
                      </span>
                      {stepSelection ? (
                        <span className={styles.stepSelection}>{stepSelection}</span>
                      ) : null}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className={styles.options}>
                        {step.options.map((option) => {
                          const optionImage = optionImages[option];
                          const isSelected = Array.isArray(selectedOption)
                            ? selectedOption.includes(option)
                            : selectedOption === option;

                          return (
                            <button
                              aria-pressed={isSelected}
                              className={cn(styles.option, isSelected && styles.selected)}
                              key={option}
                              onClick={() => selectOption(stepIndex, option, allowMultiple)}
                              type="button"
                            >
                              <span className={styles.optionImage}>
                                {optionImage ? (
                                  <Image
                                    alt=""
                                    className={styles.optionArtwork}
                                    fill
                                    sizes="32px"
                                    src={optionImage}
                                  />
                                ) : (
                                  "IMG"
                                )}
                              </span>
                              <span className={styles.optionLabel}>{option}</span>
                              <span className={cn(styles.radio, isSelected && styles.radioSelected)}>
                                {isSelected ? <CheckIcon size={10} weight="bold" /> : null}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
          <aside className={styles.summary}>
            <h3 className={styles.summaryTitle}>Your bánh mì</h3>
            <div className={styles.summaryImage}>
              {generatedImage ? (
                <Image
                  alt="Generated illustration of your custom bánh mì"
                  className={styles.generatedImage}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  src={generatedImage}
                  unoptimized
                />
              ) : (
                <ImagePlaceholder className={styles.summaryPlaceholder} label="Your custom bánh mì" />
              )}
              <button
                className={styles.illustrate}
                disabled={!summary || isIllustrating}
                onClick={illustrateBanhMi}
                type="button"
              >
                <ArrowClockwiseIcon size={17} weight="bold" />
                {isIllustrating ? "Illustrating..." : "Illustrate your bánh mì"}
              </button>
            </div>
            {illustrationError ? <p className={styles.illustrationError}>{illustrationError}</p> : null}
            <p className={styles.summaryDescription}>
              {summary || "Choose your size to begin building your bánh mì."}
            </p>
            <p className={styles.summaryPrice}>€6.50</p>
            <button className={styles.add} type="button">
              <ShoppingCartIcon size={17} weight="bold" />
              Add to cart
            </button>
            <button className={styles.clear} onClick={clearSelections} type="button">
              Clear
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
