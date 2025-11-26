import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

function AddTask() {
  const { register, handleSubmit, reset, watch } = useForm();
  const titleValue = watch('title', '') 

  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (taskData) => {
      const { data } = await api.post("/api/tasks", taskData);
      return data;
    },
    onSuccess: () => {
      toast.success("Thêm mới nhiệm vụ thành công");
      queryclient.invalidateQueries(['tasks']);
      reset();
    },
    onError: () => {
      toast.error("Thêm thất bại");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Card className="p-6 border-0 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 md:flex-col">
          <Input
            type="text"
            placeholder="Muốn làm gì?"
            className="h-10 text-base "
            {...register("title")}
          />
          <Button size="lg" className="px-6 cursor-pointer" type="submit" disabled={!titleValue.trim()}>
            <Plus />
            Thêm
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default AddTask;
