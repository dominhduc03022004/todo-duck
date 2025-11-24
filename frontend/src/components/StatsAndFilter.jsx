import React from "react";
import { Badge } from "./ui/badge";
import { FilterType } from "@/lib/data";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

function StatsAndFilter({
  completedTaskCount = 0,
  activeTaskCount = 0,
  filter = "all",
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
      {/* thong ke */}
      <div className="flex gap-3">
        <Badge className="bg-white/50">
          {activeTaskCount} {FilterType.active}
        </Badge>
        <Badge className="bg-white/50">
          {completedTaskCount} {FilterType.completed}
        </Badge>
      </div>

      {/* Phan filter */}
      <div className="flex gap-2">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "secondary" : "default"}
            size="sm"
            className="capitalize"
          >
            <Filter className="size-4" />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default StatsAndFilter;
