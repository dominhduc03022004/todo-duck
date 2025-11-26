import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Login() {
  const {handleLogin} = useAuth();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: ({email, hashedPassword}) => handleLogin(email, hashedPassword),
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
