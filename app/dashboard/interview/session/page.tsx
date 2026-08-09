import Sidebar from "@/src/components/dashboard/Sidebar";
import InterviewSessionLoader from "@/src/components/interview/InterviewSessionLoader";

export default function InterviewSessionPage() {
  return (
    <main className="min-h-screen text-white">
      <Sidebar />

      <div className="px-5 py-6 sm:px-6 lg:ml-64 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <InterviewSessionLoader />
        </div>
      </div>
    </main>
  );
}
