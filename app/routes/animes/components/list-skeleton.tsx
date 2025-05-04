import { Skeleton } from "~/components/ui/skeleton";

const ListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {Array.from({ length: 10 }, (_, index) => index).map((item) => (
        <Skeleton key={item} className="h-80 w-full" />
      ))}
    </div>
  );
};

export default ListSkeleton;
