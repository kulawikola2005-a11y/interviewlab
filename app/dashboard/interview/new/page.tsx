import {
  Clock3,
  FileText,
  MessageSquare,
  Sparkles,
  Star,
  Target,
} from "lucide-react";

import Sidebar from "@/src/components/dashboard/Sidebar";
import NewInterviewForm from "@/src/components/dashboard/NewInterviewForm";

export default function NewInterviewPage() {
  return (
    <main className="min-h-screen bg-[#f1f1ec] text-[#202522]">
      <Sidebar />

      <div className="px-5 py-7 sm:px-8 lg:ml-[248px] lg:px-10 lg:py-9">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <header className="mb-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#397268]">
                  New interview
                </p>

                <h1 className="mt-2 text-[32px] font-semibold tracking-[-0.04em] text-[#202522]">
                  Prepare for a real interview
                </h1>

                <p className="mt-3 max-w-2xl text-[15px] leading-6 text-[#6f7772]">
                  Tell InterviewLab what role you&apos;re applying for.
                  We&apos;ll prepare personalized questions based on your CV
                  and the job offer.
                </p>
              </header>

              <NewInterviewForm />
            </div>

            <aside className="rounded-[18px] border border-[#d7dad5] bg-[#f7f6f2] p-6 xl:sticky xl:top-8 xl:self-start">
              <div>
                <h2 className="text-[17px] font-semibold text-[#202522]">
                  Your interview session
                </h2>

                <div className="mt-3 h-[3px] w-7 rounded-full bg-[#3e8a7d]" />
              </div>

              <div className="mt-7 space-y-6">
                <InfoItem
                  icon={MessageSquare}
                  title="10 personalized questions"
                  text="Questions tailored to the role and your experience."
                />

                <InfoItem
                  icon={FileText}
                  title="CV context"
                  text="Your latest resume context can be used to make questions more relevant."
                />

                <InfoItem
                  icon={Target}
                  title="Role-specific feedback"
                  text="Get detailed feedback after every answer."
                />
              </div>

              <div className="my-7 border-t border-[#dedfd9]" />

              <div>
                <h2 className="text-[17px] font-semibold text-[#202522]">
                  Tips for a great session
                </h2>

                <div className="mt-3 h-[3px] w-7 rounded-full bg-[#3e8a7d]" />
              </div>

              <div className="mt-6 space-y-6">
                <InfoItem
                  icon={Star}
                  title="Use examples"
                  text="Support your answers with real situations from your experience."
                />

                <InfoItem
                  icon={Clock3}
                  title="Be concise"
                  text="Clear, structured answers make a stronger impression."
                />

                <InfoItem
                  icon={Sparkles}
                  title="Stay authentic"
                  text="Answer naturally instead of trying to sound perfect."
                />
              </div>

              <div className="mt-8 overflow-hidden rounded-[16px] bg-[#e8efeb] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#52736b]">
                  Session goal
                </p>

                <p className="mt-2 text-sm leading-6 text-[#5e6964]">
                  Practice the way you&apos;d answer in a real interview,
                  then use the feedback to improve the next response.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoItem({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MessageSquare;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e8eeea] text-[#17685d]">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-sm font-semibold text-[#202522]">
          {title}
        </p>

        <p className="mt-1 text-sm leading-5 text-[#6f7772]">
          {text}
        </p>
      </div>
    </div>
  );
}
