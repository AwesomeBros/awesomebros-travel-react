import { Form } from "@/components/ui/form";
import type { Location, Place } from "@/lib/types";
import type { PostFormSchema } from "@/lib/validations";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod/v3";
import LocationMap from "../../map/location-map";
import LocationSearch from "../../map/location-search";
import ButtonWrap from "./button-wrap";
import Stepper from "./stepper";

interface Props {
  form: UseFormReturn<z.infer<typeof PostFormSchema>>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export default function MapMarkerStep({
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  const [selectPositions, setSelectPositions] = useState<Place[]>([]);

  useEffect(() => {
    const initialFormLocations = form.getValues("locations");
    if (
      initialFormLocations &&
      initialFormLocations.length > 0 &&
      selectPositions.length === 0
    ) {
      const convertedToPlaceType: Place[] = initialFormLocations.map(
        (loc, idx) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [loc.lng, loc.lat],
          },
          properties: {
            geocoding: {
              name: loc.name,
              label: loc.name,
              place_id: idx,
            },
          },
        })
      );
      setSelectPositions(convertedToPlaceType);
    }
  }, [form.getValues("locations")]);

  useEffect(() => {
    const coordinatesForForm: Location[] = selectPositions.map(
      (position, idx) => ({
        id: position.properties.geocoding.place_id ?? idx,
        lat: position.geometry.coordinates[1],
        lng: position.geometry.coordinates[0],
        name: position.properties.geocoding.name,
      })
    );
    form.setValue("locations", coordinatesForForm, { shouldValidate: true });
  }, [selectPositions, form.setValue]);

  // console.log("MapMarkerStep selectPositions", selectPositions);
  // console.log("form errors", form.formState.errors);

  return (
    <>
      <Form {...form}>
        <form>
          <Stepper count={5} />
          <div className="space-y-4 mt-10">
            <div className="flex w-full size-full">
              <div className="w-1/2 h-[60vh]">
                <LocationMap
                  setSelectPositions={setSelectPositions}
                  selectPositions={selectPositions}
                />
              </div>
              <div className="w-1/2 h-full">
                <LocationSearch setSelectPositions={setSelectPositions} />
              </div>
            </div>
          </div>
          <ButtonWrap
            prevOnClick={handlePrevStep}
            nextDisabled={!selectPositions.length}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
