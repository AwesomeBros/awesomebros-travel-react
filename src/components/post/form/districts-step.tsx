import { Form } from "@/components/ui/form";
import { Loader } from "@/components/ui/loader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFindDistrictsByCitiesId } from "@/lib/query";
import type { District } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { PostFormSchema } from "@/lib/validations";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod/v3";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  form: UseFormReturn<z.infer<typeof PostFormSchema>>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export default function DistrictsStep({
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const { data, isLoading } = useFindDistrictsByCitiesId(
    form.getValues("cities_id") || 0
  );
  const [selectedDistrict, setSelectedDistrict] = useState<number>(
    form.getValues("districts_id") || 0
  );

  useEffect(() => {
    form.setValue("districts_id", selectedDistrict ?? 0);
  }, [selectedDistrict, form.setValue]);

  return (
    <>
      <Stepper count={3} />
      <Form {...form}>
        <form className="mb-20 md:mb-0 flex flex-col gap-4">
          <h1 className="font-semibold text-lg md:text-2xl text-center">
            지역 선택
          </h1>
          {isLoading ? (
            <div className="w-full h-[500px] flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <ScrollArea className="w-full h-[600px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-5 px-10">
                {data.map((district: District) => (
                  <button
                    type="button"
                    key={district.id}
                    onClick={() => {
                      setSelectedDistrict(district.id ?? 0);
                      if (district.id) {
                        form.setValue("districts_id", district.id);
                      }
                    }}
                    className={cn(
                      "hover:bg-purple-50 rounded-md px-6 py-4 flex flex-col gap-2 cursor-pointer",
                      {
                        "border-2 border-primary":
                          selectedDistrict === district.id,
                        "border-2 border-purple-300":
                          selectedDistrict !== district.id,
                      }
                    )}
                  >
                    <h1 className="font-semibold text-xs md:text-lg">
                      {district.name}
                    </h1>
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
          <ButtonWrap
            prevOnClick={handlePrevStep}
            nextDisabled={!selectedDistrict}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
