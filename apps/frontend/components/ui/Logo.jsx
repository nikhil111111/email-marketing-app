import { Mail } from "lucide-react";

export default function Logo({ size = "default" }) {
  const iconSize = size === "large" ? 32 : 22;
  const titleSize = size === "large" ? "text-3xl" : "text-xl";
  const subtitleSize = size === "large" ? "text-base" : "text-xs";

  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 shadow-lg shadow-blue-600/20">
        <Mail size={iconSize} className="text-white" />
      </div>

      <div>
        <h1
          className={`font-bold tracking-tight text-white ${titleSize}`}
        >
          EmailFlow
        </h1>

        <p className={`text-zinc-400 ${subtitleSize}`}>
          Marketing Platform
        </p>
      </div>
    </div>
  );
}