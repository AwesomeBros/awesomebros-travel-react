import { PostFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod/v3";
import CitiesStep from "./cities-step";
import CountriesStep from "./countries-step";
import DistrictsStep from "./districts-step";
import InfoStep from "./info-step";
import MapMarkerStep from "./map-marker-step";
import ThumbnailStep from "./thumbnail-step";
interface WriteFormProps {
  id?: number;
  onSubmit: (data: z.infer<typeof PostFormSchema>) => void;
  defaultValues?: z.infer<typeof PostFormSchema>;
  isUpdateMode: boolean;
  onStepSave?: (data: z.infer<typeof PostFormSchema>) => void;
}

export default function PostForm({
  defaultValues,
  onSubmit,
  isUpdateMode,
  onStepSave,
}: WriteFormProps) {
  const [step, setStep] = useState<number>(1);
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues,
    mode: "onBlur",
  });

  const handleNextStep = async () => {
    const stepFieldMapping: {
      [key: number]: (keyof z.infer<typeof PostFormSchema>)[];
    } = {
      1: ["countries_id"],
      2: ["cities_id"],
      3: ["districts_id"],
      4: ["title", "content", "slug"],
      5: ["locations"],
      6: ["url"],
    };

    const fieldsForCurrentStep = stepFieldMapping[step];

    if (!fieldsForCurrentStep) {
      return;
    }

    const isValid = await form.trigger(fieldsForCurrentStep);

    if (isValid) {
      if (!isUpdateMode && onStepSave) {
        onStepSave(form.getValues());
      }
      const lastStep = 6;

      if (step < lastStep) {
        setStep(step + 1);
      } else {
        onSubmit(form.getValues());
      }
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-4">
        {step === 1 && (
          <CountriesStep
            step={step}
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 2 && (
          <CitiesStep
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 3 && (
          <DistrictsStep
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 4 && (
          <InfoStep
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 5 && (
          <MapMarkerStep
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
        {step === 6 && (
          <ThumbnailStep
            form={form}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        )}
      </div>
    </div>
  );
}
