import Sidebar from "@/src/components/dashboard/Sidebar";
import InterviewRoom from "@/src/components/interview/InterviewRoom";

export default function InterviewSessionPage() {
  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <InterviewRoom
            position="Frontend Developer"
            firstQuestion="Tell me about a challenging project you worked on and what you learned from it."
          />
        </div>
      </div>
    </main>
  );
}
