import z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    phone: z.string().regex(/^(0|\+84)(\d{9})$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Xác nhận không khớp",
      path: ["confirmPassword"],
    }
  );


export const loginSchema = z.object({
    email: z.string().email("Email không hợp lệ"),
    hashedPassword: z.string().min(6, "Mật khẩu phải ít nhất 6 ký tự"),
})