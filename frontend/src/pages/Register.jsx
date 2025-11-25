import { SignupForm } from "@/components/signup-form";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Register() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (data) => api.post('/api/auth/signup', data),
    onError: () => {
      toast.error("Email đã tồn tại");
    },
    onSuccess: () => {
      toast.success("Đăng ký thành công")
      navigate('/login')
    }
  })
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm onSubmit={mutation.mutate}/>
      </div>
    </div>
  );
}

export default Register;
