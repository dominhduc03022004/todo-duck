import React from "react";
import TaskEmptyState from "./TaskEmptyState";
import TaskCard from "./TaskCard";

function ListTask({tasks, filter}) {
  const filterTasks = tasks;
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
