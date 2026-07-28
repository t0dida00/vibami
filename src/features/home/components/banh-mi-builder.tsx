"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { ArrowClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowClockwise";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/csr/CircleNotch";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import {
  builderOptionImageDetails,
  builderOptionImages,
  sampleOutputImage,
} from "@/features/home/data/builder-option-images";
import { builderSteps } from "@/features/home/data/menu";
import { cn } from "@/lib/utils";

import styles from "./banh-mi-builder.module.scss";
import { SectionHeading } from "./section-heading";

const MULTI_SELECT_STEP_TITLE = "Choose toppings";
const DEFAULT_OPEN_STEPS = builderSteps.map((_, index) => `step-${index}`);

export type BuilderSelection = string | string[];
export type BuilderSelections = Record<number, BuilderSelection>;

type BanhMiBuilderProps = {
  onAddToCart?: (item: { id: string; ingredients?: string[]; name: string; price: number }) => void;
  presetSelections?: BuilderSelections | null;
};

export function BanhMiBuilder({ onAddToCart, presetSelections }: BanhMiBuilderProps) {
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
  const selectedIngredients = [
    "Vietnamese baguette",
    ...builderSteps.flatMap((step, index) => {
      if (step.title === "Choose size" || step.title === "Spice level") {
        return [];
      }

      const selection = selections[index];
      return Array.isArray(selection) ? selection : selection ? [selection] : [];
    }),
  ];

  function buildIllustrationPayload() {
    const selectedOptions = builderSteps.flatMap((step, index) => {
      const selection = selections[index];
      const values = Array.isArray(selection) ? selection : selection ? [selection] : [];

      return values.map((value) => ({
        image: builderOptionImages[value],
        prompt: builderOptionImageDetails[value]?.prompt,
        step: step.title,
        value,
      }));
    });

    return {
      sampleOutput: sampleOutputImage,
      selections: selectedOptions,
      summary,
    };
  }

  async function illustrateBanhMi() {
    if (!summary || isIllustrating) {
      return;
    }

    setIsIllustrating(true);
    setIllustrationError("");

    try {
      const response = await fetch("/api/illustrate-banh-mi", {
        body: JSON.stringify(buildIllustrationPayload()),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const responseText = await response.text();
      const data = responseText
        ? (JSON.parse(responseText) as { imageUrl?: string; error?: string })
        : {};

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

  function addCustomBanhMiToCart() {
    if (!summary) {
      return;
    }

    onAddToCart?.({
      id: `custom-${summary.toLowerCase()}`,
      ingredients: selectedIngredients,
      name: "Custom Bánh Mì",
      price: 6.5,
    });
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
                          const optionImage = builderOptionImages[option];
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
              {!generatedImage ? (
                <button
                  className={styles.illustrate}
                  disabled={!summary || isIllustrating}
                  onClick={illustrateBanhMi}
                  type="button"
                >
                  {isIllustrating ? (
                    <CircleNotchIcon className={styles.loadingIcon} size={17} weight="bold" />
                  ) : (
                    <ArrowClockwiseIcon size={17} weight="bold" />
                  )}
                  {isIllustrating ? "Illustrating..." : "Illustrate your bánh mì"}
                </button>
              ) : null}
            </div>
            {illustrationError ? <p className={styles.illustrationError}>{illustrationError}</p> : null}
            <p className={styles.summaryDescription}>
              {summary || "Choose your size to begin building your bánh mì."}
            </p>
            <p className={styles.summaryPrice}>€6.50</p>
            <button className={styles.add} disabled={!summary} onClick={addCustomBanhMiToCart} type="button">
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
