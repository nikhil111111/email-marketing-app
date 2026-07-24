export default function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-10 w-64 rounded bg-zinc-800" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-36 rounded-2xl bg-zinc-900"
          />
        ))}
      </div>

      <div className="h-96 rounded-2xl bg-zinc-900" />
    </div>
  );
}