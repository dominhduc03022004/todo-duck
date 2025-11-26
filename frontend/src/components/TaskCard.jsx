import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function TaskCard({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const queryclient = useQueryClient();

  // Xóa
  const mutation = useMutation({
    mutationFn: async (taskId) => {
      await api.delete(`/api/tasks/${taskId}`);
      return taskId;
    },
    onSuccess: (taskId) => {
      toast.success("Xóa thành công");
      queryclient.invalidateQueries(["tasks"], (tasks) => {
        return tasks.filter((task) => task.id != taskId);
      });
    },
    onError: () => {
      toast.error("Xóa thất bại");
    },
  });

  // Sửa
  const editMutation = useMutation({
    mutationFn: async ({ taskId, title }) => {
      const { data } = await api.put(`/api/tasks/${taskId}`, { title });
      return data;
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      queryclient.invalidateQueries(["tasks"]);
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Cập nhật thất bại");
    },
  });

  // set hoan thanh
  const updateTask = useMutation({
    mutationFn: async ({ taskId, status, completedAt }) => {
      const { data } = await api.put(`/api/tasks/${taskId}`, {
        status,
        completedAt,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Nhiệm vụ đã hoàn thành");
      queryclient.invalidateQueries(["tasks"]);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra!");
    },
  });

  const deleteTask = (taskId) => {
    mutation.mutate(taskId);
  };

  return (
    <Card
      className={cn(
        "p-4 border-0 transition-all duration-200 group",
        task.status === "complete" && "opacity-75"
      )}
    >
      <div className="flex items-center gap-4">
        {/* nut tron */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200 cursor-pointer",
            task.status === "complete"
              ? "hover:text-gray-700"
              : "hover:text-blue-700"
          )}
          onClick={() => {
            if (task.status !== "complete") {
              updateTask.mutate({
                taskId: task._id,
                status: "complete",
                completedAt: new Date().toISOString(),
              });
            }
          }}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5" />
          ) : (
            <Circle className="size-5" />
          )}
        </Button>

        {/* hien thi hoac chinh sua */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editMutation.mutate({ taskId: task._id, title: editedTitle });
              }}
            >
              <Input
                className="flex-1 h-10 text-base"
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
            </form>
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete" ? "line-through" : ""
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngay tao va ngay hoan thanh */}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3" />
            <span className="text-xs">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs"> - </span>
                <Calendar className="size-3" />
                <span className="text-xs">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nut sua xoa */}
        <div className="hidden gap-2 group-hover:inline-flex">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 hover:text-yellow-700 cursor-pointer"
            onClick={() => {
              if(task.status === 'complete') return;
              setIsEditing(!isEditing)
            }}
            
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 hover:text-red-600 cursor-pointer"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TaskCard;
