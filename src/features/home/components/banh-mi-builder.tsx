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

export function BanhMiBuilder() {
  const [activeStep, setActiveStep] = useState("step-0");
  const [selections, setSelections] = useState<Record<number, string>>({});

  function selectOption(stepIndex: number, option: string) {
    setSelections((current) => ({ ...current, [stepIndex]: option }));

    const nextStep = stepIndex + 1;
    if (nextStep < builderSteps.length) {
      setActiveStep(`step-${nextStep}`);
    }
  }

  const summary = builderSteps
    .map((_, index) => selections[index])
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
              const selectedOption = selections[stepIndex];

              return (
                <AccordionItem key={step.title} value={`step-${stepIndex}`}>
                  <AccordionTrigger className={styles.stepTrigger}>
                    <span className={styles.stepIdentity}>
                      <span className={styles.stepNumber}>{stepIndex + 1}</span>
                      <span className={styles.stepTitle}>{step.title}</span>
                    </span>
                    {selectedOption ? (
                      <span className={styles.stepSelection}>{selectedOption}</span>
                    ) : null}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={styles.options}>
                      {step.options.map((option) => {
                        const isSelected = selectedOption === option;

                        return (
                          <button
                            className={cn(styles.option, isSelected && styles.selected)}
                            key={option}
                            onClick={() => selectOption(stepIndex, option)}
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
          </aside>
        </div>
      </div>
    </section>
  );
}
