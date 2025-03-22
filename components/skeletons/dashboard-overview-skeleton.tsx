export function DashboardOverviewSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 bg-muted animate-pulse rounded-lg" />
      ))}
    </div>
  );
}
