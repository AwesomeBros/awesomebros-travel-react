import { Input } from "@/components/ui/input";
import { useAuthOpenStore } from "@/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/v3";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type EmailType = { email: string };
export default function EmailForm() {
  const { setType } = useAuthOpenStore();
  // const sendMail = useSendMail();
  const form = useForm<EmailType>({
    resolver: zodResolver(
      z.object({
        email: z.string().email("이메일 형식이 아닙니다."),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: any) {
    // sendMail.mutate(
    //   { ...values, type },
    //   {
    //     onSuccess: (data) => toast.success(data.message),
    //     onError: (error) => {
    //       if (error instanceof Error) {
    //         if (error.message.includes("409")) {
    //           toast.error("이미 가입된 이메일입니다.");
    //         } else if (error.message.includes("404")) {
    //           toast.error("가입되지 않은 이메일입니다.");
    //         } else if (error.message.includes("500")) {
    //           toast.error("서버 오류입니다. 잠시 후 다시 시도해주세요.");
    //         }
    //       }
    //     },
    //   }
    // );
  }
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="이메일" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button>이메일 인증</Button>
            <div className="text-sm text-center text-muted-foreground">
              이미 계정이 있나요?{" "}
              <button
                type="button"
                onClick={() => setType("login")}
                className="cursor-pointer text-foreground link hover:underline underline-offset-2 hover:bg-transparent"
              >
                로그인
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
