import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

function ListTask() {
  let filter = "all";
  const filterTasks = [
    {
      _id: "1",
      title: "hoc reacte",
      status: "actice",
      completedAt: null,
      createdAt: new Date(),
    },
    {
      _id: "1",
      title: "hoc jd",
      status: "complete",
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];
  if (!filterTasks || filterTasks.length === 0) {
    return <TaskEmptyState filter={filter} />;
  }
  return (
    <div className="space-y-3">
      {filterTasks.map((task, index) => (
        <TaskCard key={task._id ?? index} task={task} />
      ))}
    </div>
  );
}

export default ListTask;
