import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8">
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          placeholder="Search campaigns, contacts..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-white outline-none transition focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-zinc-300 transition hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            N
          </div>

          <div>
            <p className="font-semibold text-white">
              Nikhil Garg
            </p>

            <p className="text-sm text-zinc-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}