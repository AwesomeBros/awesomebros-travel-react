import z from "zod/v3";

export const UserFormSchema = z.object({
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }).trim(),
  url: z.string().optional(),
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email()
    .trim(),
});

export const PasswordChangeFormSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "현재 비밀번호를 입력해주세요." })
      .trim(),
    newPassword: z
      .string()
      .min(8, { message: "비밀번호는 8글자 이상이어야 합니다." })
      .regex(/[a-zA-Z]/, { message: "비밀번호는 알파벳이 포함되어야 합니다." })
      .regex(/[0-9]/, { message: "비밀번호는 숫자가 포함되어야 합니다." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "비밀번호는 특수문자가 포함되어야 합니다.",
      })
      .trim(),
    confirmNewPassword: z
      .string()
      .min(1, { message: "비밀번호를 재입력하세요." })
      .trim(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "새로운 비밀번호가 일치하지 않습니다.",
        path: ["confirmNewPassword"],
      });
    }
  });
