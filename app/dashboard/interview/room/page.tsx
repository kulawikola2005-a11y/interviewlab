import Sidebar from "@/src/components/dashboard/Sidebar";
import InterviewRoom from "@/src/components/dashboard/InterviewRoom";

export default function InterviewRoomPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 p-8">
        <InterviewRoom />
      </div>
    </main>
  );
}
