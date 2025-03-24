import { removeAdminStatus } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useRemoveAdmin() {
  const { mutate: removeAdmin, isPending: pendingRemoveAdmin } = useMutation({
    mutationFn: (data) => removeAdminStatus(data),
    onSuccess: () => {
      toast.success("AdminRole removed");
    },
    onError: (err) => {
      const errorMessage = err.response?.data?.message || "Something went fel";
      console.log("error", err);

      toast.error(errorMessage);
    },
  });

  return { pendingRemoveAdmin, removeAdmin };
}
