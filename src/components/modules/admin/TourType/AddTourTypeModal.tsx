// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useAddTourTypeMutation } from "@/redux/features/ride/ride.api";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// interface AddTourTypeModalProps {
//   name: string;
// }

// export function AddTourTypeModal() {
//   const form = useForm<AddTourTypeModalProps>();
//   const [addTourType] = useAddTourTypeMutation();

//   const onSubmit = async (data: AddTourTypeModalProps) => {
//     const res = await addTourType({ name: data.name }).unwrap();
//     if (res.success) {
//       toast.success("Tour Type Added");
//     }
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>Add Tour Type</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add Tour Type</DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             id="add-tour-type"
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-4"
//           >
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tour Type Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Tour Type Name"
//                       {...field}
//                       value={field.value || ""}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <DialogClose asChild>
//             <Button type="submit" form="add-tour-type">
//               Save changes
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }
