import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/ride/ride.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function AddTourType() {
  //state to manage current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  //state to manage limit per page
  const [limit] = useState(5);

  //fetching tour types with current page as param
  const { data } = useGetTourTypesQuery({ page: currentPage, limit: limit });

  //delete tour type mutation
  const [removeTourType] = useRemoveTourTypeMutation();

  //function to handle the deletion of a tour type
  const handleRemoveTourType = async (tourTypeId: string) => {
    // Show loading toast
    const toastId = toast.loading("Deleting tour type...");

    //try catch block to handle the async operation on removeTourType
    try {
      const res = await removeTourType(tourTypeId).unwrap();

      if (res.success) {
        toast.success("Tour type deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete the tour type", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  //* Total page 2 => [0, 0]

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddTourTypeModal></AddTourTypeModal>
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: { _id: string; name: string }) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium w-full">
                  {item?.name}
                </TableCell>
                <TableCell>
                  {/* Delete Confirmation Component who take onConfirm prop with two arguments */}
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTourType(item._id)}
                  >
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPage > 1 && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  //disable previous button if we are on first page
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {/* create array for pagination items with page numbers  where length < totalPage  and use map for every single page*/}
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem></PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  //disable next button if we are on last page
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
