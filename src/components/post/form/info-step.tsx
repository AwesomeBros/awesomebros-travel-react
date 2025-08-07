import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { PostFormSchema } from "@/lib/validations";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod/v3";
import ButtonWrap from "./button-wrap";
import ReactQuillEditor from "./react-quill-editor";
import Stepper from "./stepper";

interface Props {
  form: UseFormReturn<z.infer<typeof PostFormSchema>>;
  handleNextStep: () => Promise<void>;
  handlePrevStep: () => void;
}

export default function InfoStep({
  form,
  handleNextStep,
  handlePrevStep,
}: Props) {
  return (
    <>
      <Form {...form}>
        <form>
          <Stepper count={4} />
          <div className="space-y-4 mt-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제목</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="제목"
                      className="mt-1.5"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        field.onChange(e);
                        const slugValue = e.target.value
                          .replace(/\s+/g, "-")
                          .replace(/:/g, "");
                        form.setValue("slug", slugValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>슬러그</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="슬러그"
                      className="mt-1.5"
                      readOnly
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1.5">내용</FormLabel>
                  <FormControl>
                    <ReactQuillEditor {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <ButtonWrap
            prevOnClick={handlePrevStep}
            nextOnClick={handleNextStep}
          />
        </form>
      </Form>
    </>
  );
}
