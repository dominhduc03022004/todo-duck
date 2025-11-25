import { LoginForm } from "@/components/login-form";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => api.post('/api/auth/signin', data),
    onError: (err) => {
      console.log(err);
      
      toast.error("Tài khoản hoặc mật khẩu không chính xác")
    },
    onSuccess: () => {
      toast.success("Đăng nhập thành công")
      navigate('/')
    }
  })
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative z-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm onSubmit={mutation.mutate}/>
      </div>
    </div>
  );
}

export default Login;
