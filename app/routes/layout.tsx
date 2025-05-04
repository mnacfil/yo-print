import { Outlet, useNavigation } from "react-router";
import AnimeDetailSkeleton from "./animes/anime/components/skeleton";
import { Loader2 } from "lucide-react";

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="w-full min-h-screen">
      <main className="container mx-auto max-w-[1200px] py-10">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <Loader2 className="animate-spin size-20" />
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
