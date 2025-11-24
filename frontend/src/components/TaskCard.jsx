import React from "react";
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

function TaskCard({ task }) {
  let isEditing = false;
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
            "shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === "complete"
              ? "hover:text-gray-700"
              : "hover:text-blue-700"
          )}
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
            <Input className="flex-1 h-10 text-base" type="text" />
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
            className="shrink-0 transition-colors size-8"
          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default TaskCard;
