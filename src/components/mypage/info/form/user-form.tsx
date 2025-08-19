import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { imageUpload } from "@/lib/api";
import type { Session } from "@/lib/types";
import { UserFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAddAPhoto } from "react-icons/md";
import type z from "zod/v3";

export default function UserForm({
  onSubmit,
  onClose,
  disabled,
  defaultValues,
  user,
}: {
  onSubmit: (values: z.infer<typeof UserFormSchema>) => void;
  onClose: () => void;
  disabled?: boolean;
  defaultValues: z.infer<typeof UserFormSchema>;
  user: Session;
}) {
  const [image, setImage] = useState<string | null>(user.url || null);
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues,
  });

  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      formData.append("file", files[0]);
      const data = await imageUpload(formData);
      form.setValue("url", data || "");
      setImage(data || null);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    form.setValue("url", "");
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full mt-10 gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="gap-4 flex items-center justify-center">
          <div className="relative overflow-hidden size-[150px] rounded-full">
            {image ? (
              <img
                src={image}
                alt={`Profile`}
                className="object-cover cursor-pointer"
                onClick={handleImageRemove}
              />
            ) : (
              <Label
                id="image"
                className="cursor-pointer gap-4 border flex justify-center items-center overflow-hidden size-[150px] rounded-full"
              >
                <div className="text-center">
                  <MdAddAPhoto className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <span>클릭하여 업로드</span>
                    <input
                      type="file"
                      id={"image"}
                      accept="image/*"
                      className="sr-only"
                      onChange={handleImagesChange}
                    />
                  </div>
                </div>
              </Label>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="닉네임을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="이메일을 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-row-reverse mt-4 gap-4">
          <Button disabled={disabled}>{"수정"}</Button>
          <Button variant={"outline"} type="button" onClick={onClose}>
            {"닫기"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
