import { InfoCard } from "./ui/info-card";

export function Stats() {
  return (
    <div className="absolute flex gap-4 bottom-0 translate-y-1/2 right-1/2 translate-x-1/2">
      <InfoCard title="10K+" sub="Total Users" />
      <InfoCard title="14K+" sub="Total Bookings" />
      <InfoCard title="2400+" sub="Total Destinations" />
      <InfoCard title="5.0" sub="Average Rating" />
    </div>
  );
}
