import { Outlet, useNavigation } from "react-router";

export default function Layout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="w-full min-h-screen">
      <main className="container mx-auto max-w-[1200px] py-10">
        {isLoading ? (
          <p className="text-xl text-green-400">Loading...</p>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}
