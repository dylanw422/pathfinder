export function InfoCard({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl bg-white w-[250px] py-6 shadow-xl text-primary">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-primary/50">{sub}</p>
    </div>
  );
}
