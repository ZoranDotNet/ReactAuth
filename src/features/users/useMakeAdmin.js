import { makeUserAdmin } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useMakeAdmin() {
  const { mutate: makeAdmin, isPending: pendingMakeAdmin } = useMutation({
    mutationFn: (data) => makeUserAdmin(data),
    onSuccess: () => {
      toast.success("User is now Admin");
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || "Something went fel";
      console.log("error", err);

      toast.error(errorMessage); // Visar det i toast
    },
  });

  return { pendingMakeAdmin, makeAdmin };
}
