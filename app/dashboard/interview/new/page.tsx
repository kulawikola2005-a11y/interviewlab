import Sidebar from "@/src/components/dashboard/Sidebar";
import NewInterviewForm from "@/src/components/dashboard/NewInterviewForm";

export default function NewInterviewPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 px-8 py-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium text-blue-400">
            New Interview
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Prepare for a real interview
          </h1>

          <p className="mt-3 text-slate-400">
            Tell InterviewLab what role you're applying for. AI will generate
            personalized interview questions based on your CV and the job offer.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
            <NewInterviewForm />
          </div>
        </div>
      </div>
    </main>
  );
}
