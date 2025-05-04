import { Search } from "lucide-react";

const ListEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No anime found</h3>
      <p className="text-muted-foreground mb-6">
        We couldn't find any anime matching your search criteria. Try adjusting
        your filters or search terms.
      </p>
    </div>
  );
};

export default ListEmpty;
