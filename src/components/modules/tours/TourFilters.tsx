import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDriversQuery } from "@/redux/features/driver/driver.api";
import { useGetTourTypesQuery } from "@/redux/features/ride/ride.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  // get and set search params from url for filtering
  const [searchParams, setSearchParams] = useSearchParams();

  // extract selected division and tourType from search params
  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  // fetch divisions and tour types for filter options
  const { data: divisionData, isLoading: divisionIsLoading } =
    useGetDriversQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeIsLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id,name" });

  // map fetched data to select division options
  const divisionOption = divisionData?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  // map fetched data to select tour type options
  const tourTypeOptions = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  // division change handler for select dropdown
  const handleDivisionChange = (value: string) => {
    // create new URLSearchParams object from existing search params
    const params = new URLSearchParams(searchParams);

    // set or update division param
    params.set("division", value);

    // update url search params
    setSearchParams(params);
  };

  // tour type change handler for select dropdown
  const handleTourTypeChange = (value: string) => {
    // create new URLSearchParams object from existing search params
    const params = new URLSearchParams(searchParams);

    // set or update tourType param
    params.set("tourType", value);

    // update url search params
    setSearchParams(params);
  };

  // clear all filters handler for "Clear Filter" button
  const handleClearFilter = () => {
    // create new URLSearchParams object from existing search params
    const params = new URLSearchParams(searchParams);

    // remove division and tourType params
    params.delete("division");
    params.delete("tourType");

    // update url search params
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-4">
      <div className="flex justify-between items-center">
        <h1>Filters</h1>

        {/* Clear Filter Button */}
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          // value change handler for select dropdown division change
          onValueChange={(value) => handleDivisionChange(value)}
          // selected value from url search params
          value={selectedDivision ? selectedDivision : ""}
          // disable select when loading
          disabled={divisionIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOption?.map((item: { value: string; label: string }) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour Type</Label>
        <Select
          // value change handler for select dropdown tour type change
          onValueChange={handleTourTypeChange}
          // selected value from url search params
          value={selectedTourType ? selectedTourType : ""}
          // disable select when loading
          disabled={tourTypeIsLoading}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {tourTypeOptions?.map(
                (item: { value: string; label: string }) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
