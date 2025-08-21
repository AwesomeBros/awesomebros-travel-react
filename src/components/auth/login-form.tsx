import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/query";
import { useAuthOpenStore } from "@/lib/stores";
import { LoginFormSchema } from "@/lib/validations/auth";
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

export function LoginForm() {
  const { mutate: login } = useLogin();
  const { setType, onClose } = useAuthOpenStore();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    login(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>아이디</FormLabel>
                    <FormControl>
                      <Input placeholder="아이디" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>비밀번호</FormLabel>
                      <button
                        type="button"
                        onClick={() => setType("reset-password")}
                        className="cursor-pointer ml-auto text-sm underline-offset-4 hover:underline hover:bg-transparent"
                      >
                        비밀번호 찾기
                      </button>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="비밀번호"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button>로그인</Button>
          </form>
        </Form>
        {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SocialLogin provider="kakao" />
              <SocialLogin provider="google" />
            </div> */}
        <div className="text-sm text-center text-muted-foreground">
          계정이 없나요?{" "}
          <button
            type="button"
            onClick={() => setType("register")}
            className="cursor-pointer text-foreground link hover:underline underline-offset-2 hover:bg-transparent"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
