import { Skeleton } from "~/components/ui/skeleton";

const AnimeDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          <div className="space-y-6">
            <Skeleton className="w-[300px] h-[450px]" />
            <div className="space-y-4 bg-card p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rating</span>
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>

              <div className="flex items-center justify-between">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>
            </div>

            <Skeleton className="w-32 h-8" />
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-32 h-8" />
            </div>

            <div className="mt-6">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-full h-52" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-32 h-8" />
                <Skeleton className="w-32 h-8" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Array.from({ length: 10 }, (_, index) => index).map((item) => (
                  <Skeleton key={item} className="h-80 w-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailSkeleton;
