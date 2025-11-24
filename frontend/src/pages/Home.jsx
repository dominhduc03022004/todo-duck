import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListTask from "@/components/ListTask";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskListPagination from "@/components/TaskListPagination";
import React from "react";

function Home() {
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
          {/* Header */}
          <Header />
          {/* Them task */}
          <AddTask className="text-white"/>

          {/* Loc */}
          <StatsAndFilter/>

          {/* Danh sach task */}
          <ListTask/>

          {/* Phan trang va loc date */}
          <div className="">
            <TaskListPagination/>
          <DateTimeFilter/>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
