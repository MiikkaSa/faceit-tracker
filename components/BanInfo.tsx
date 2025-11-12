"use client";

export default function BanCard({ banned }: { banned: boolean }) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border max-w-md mx-auto mt-6 ${
        banned
          ? "bg-red-50 border-red-200 text-red-800"
          : "bg-green-50 border-green-200 text-green-800"
      }`}
    >
      <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
        {banned ? "🚫 Ban Status" : "✅ Ban Status"}
      </h2>
      <p className="text-base font-medium">
        {banned ? "This player is currently banned." : "No active bans."}
      </p>
    </div>
  );
}
