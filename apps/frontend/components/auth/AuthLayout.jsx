import Logo from "@/components/ui/Logo";

export default function AuthLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-120px] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl">
        {/* Left Side */}
        <div className="hidden w-1/2 flex-col justify-between border-r border-zinc-800 p-14 lg:flex">
          <div>
            <Logo size="large" />
          </div>

          <div>
            <h1 className="max-w-md text-5xl font-bold leading-tight text-white">
              Reach the right audience at the right time.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
              Manage contacts, create smart audiences, schedule campaigns,
              and monitor analytics from one modern dashboard.
            </p>
          </div>

          <p className="text-sm text-zinc-500">
            Built with ❤️ using Next.js & Express
          </p>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}