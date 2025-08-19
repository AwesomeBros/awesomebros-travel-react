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
import { Separator } from "@/components/ui/separator";
import { PasswordChangeFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod/v3";

export default function PasswordChangeForm({
  onSubmit,
  onClose,
  disabled,
  defaultValues,
}: {
  onSubmit: (values: z.infer<typeof PasswordChangeFormSchema>) => void;
  onClose: () => void;
  disabled?: boolean;
  defaultValues: z.infer<typeof PasswordChangeFormSchema>;
}) {
  const form = useForm<z.infer<typeof PasswordChangeFormSchema>>({
    resolver: zodResolver(PasswordChangeFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-full mt-10 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>현재 비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-4" />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새로운 비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="새로운 비밀번호를 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>새로운 비밀번호 확인</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="새로운 비밀번호를 한번 더 입력하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse mt-4 gap-4">
          <Button disabled={disabled}>{"변경"}</Button>
          <Button variant={"outline"} type="button" onClick={onClose}>
            {"닫기"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
