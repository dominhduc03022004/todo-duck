import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import DropDownProfile from "@/components/DropDownProfile";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListTask from "@/components/ListTask";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskListPagination from "@/components/TaskListPagination";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function Home() {
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [filter, dateQuery]);

  // list task
  const { data, isLoading, isError } = useQuery({
    queryKey: ["tasks", dateQuery],
    queryFn: async () => {
      const { data } = await api.get(`/api/tasks?filter=${dateQuery}`);
      return data;
    },
    staleTime: Infinity,
  });

  // loc theo trang thai
  const filteredTasks = data?.tasks.filter((task) => {
    switch (filter) {
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const visibleTasks = filteredTasks?.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if (visibleTasks?.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks?.length / visibleTaskLimit);

  if (isError) {
    toast.error("Lỗi khi truy xuất dữ liệu");
  }

  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* X Organizations Black Background with Top Glow */}{" "}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
        }}
      />
      {/* Your Content/Components */}
      <div className="pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl mx-auto px-4 space-y-6">
          {/* dropdown profile */}
          <div className="flex justify-end">
            <DropDownProfile />
          </div>
          {/* Header */}
          <Header />
          {/* Them task */}
          <AddTask className="text-white" />

          {/* Loc */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeCount={data?.activeCount}
            completeCount={data?.completeCount}
          />

          {/* Danh sach task */}
          {isLoading ? (
            <div className="text-white py-10 text-center opacity-70">
              Đang tải danh sách nhiệm vụ...
            </div>
          ) : (
            <ListTask tasks={visibleTasks} filter={filter} />
          )}

          {/* Phan trang va loc date */}
          <div className="flex justify-between">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          {/* Footer */}
          <Footer
            activeCount={data?.activeCount}
            completeCount={data?.completeCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
