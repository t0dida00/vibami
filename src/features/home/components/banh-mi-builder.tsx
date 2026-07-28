"use client";

import { useState } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
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

export type BuilderSelection = string | string[];
export type BuilderSelections = Record<number, BuilderSelection>;

type BanhMiBuilderProps = {
  presetSelections?: BuilderSelections | null;
};

export function BanhMiBuilder({ presetSelections }: BanhMiBuilderProps) {
  const [activeStep, setActiveStep] = useState("step-0");
  const [selections, setSelections] = useState<BuilderSelections>(() => presetSelections ?? {});

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

    const nextStep = stepIndex + 1;
    if (nextStep < builderSteps.length) {
      setActiveStep(`step-${nextStep}`);
    }
  }

  function clearSelections() {
    setSelections({});
    setActiveStep("step-0");
  }

  const summary = builderSteps
    .map((_, index) => {
      const selection = selections[index];
      return Array.isArray(selection) ? selection.join(", ") : selection;
    })
    .filter(Boolean)
    .join(" · ");

  return (
    <section className={styles.section} id="builder">
      <div className={styles.inner}>
        <SectionHeading description="Your bánh mì, your way." title="Build Your Bánh Mì" />
        <div className={styles.layout}>
          <Accordion
            className={styles.steps}
            onValueChange={setActiveStep}
            type="single"
            value={activeStep}
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
                            <span className={styles.optionImage}>IMG</span>
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
          <aside className={styles.summary}>
            <h3 className={styles.summaryTitle}>Your bánh mì</h3>
            <ImagePlaceholder className={styles.summaryImage} label="Your custom bánh mì" />
            <p className={styles.summaryDescription}>
              {summary || "Choose your bread to begin building your bánh mì."}
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
