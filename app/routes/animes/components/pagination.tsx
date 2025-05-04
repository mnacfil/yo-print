import clsx from "clsx";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { GetAnimesRes } from "~/api/services/types";
import { Button } from "~/components/ui/button";
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

type Props = {
  pagination: GetAnimesRes["pagination"];
  currentPage: number;
  onClick: (page: number) => void;
};

const NUM_BUTTONS = 10;

const Pagination = ({ currentPage, pagination, onClick }: Props) => {
  const start =
    pagination.current_page <= NUM_BUTTONS ? 1 : pagination.current_page - 1;
  const end =
    pagination.current_page < NUM_BUTTONS
      ? NUM_BUTTONS
      : pagination.current_page + 9;

  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            disabled={currentPage === 1}
            onClick={() => {
              onClick(currentPage - 1);
            }}
          >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </Button>
        </PaginationItem>
        {list.map((item) => (
          <PaginationItem key={item}>
            <Button
              type="button"
              variant="outline"
              className={clsx(
                "cursor-pointer",
                item === currentPage ? "bg-primary text-primary-foreground" : ""
              )}
              onClick={() => {
                onClick(item);
              }}
            >
              {item}
            </Button>
          </PaginationItem>
        ))}
        {pagination.has_next_page && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            disabled={!pagination.has_next_page}
            onClick={() => {
              onClick(currentPage + 1);
            }}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
