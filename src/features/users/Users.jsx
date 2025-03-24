import Error from "../../components/Error";
import { useUsers } from "./useUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Spinner from "../../components/Spinner";
import { Button } from "../../components/ui/button";
import { useMakeAdmin } from "./useMakeAdmin";
import { useRemoveAdmin } from "./useRemoveAdmin";

function Users() {
  const { isPending, error, users } = useUsers();

  const { pendingMakeAdmin, makeAdmin } = useMakeAdmin();
  const { pendingRemoveAdmin, removeAdmin } = useRemoveAdmin();

  function handleMakeAdminClick(email) {
    console.log(email);
    makeAdmin(email);
  }

  function handleRemoveAdminClick(email) {
    console.log(email);
    removeAdmin(email);
  }

  if (isPending || pendingMakeAdmin || pendingRemoveAdmin) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className="pt-6 px-26">
      <h1 className="text-center text-3xl mb-10 ">Users</h1>
      <div className="px-50">
        <Table>
          <TableHeader>
            <TableRow className="bg-purple-500 dark:bg-background hover:bg-purple-700">
              <TableHead className="w-[50px] text-white dark:text-muted-foreground">
                ID
              </TableHead>
              <TableHead className="w-[175px] text-white dark:text-muted-foreground">
                Firstname
              </TableHead>
              <TableHead className="w-[200px] text-white dark:text-muted-foreground">
                Lastname
              </TableHead>
              <TableHead className="w-[150px] text-white dark:text-muted-foreground">
                Email
              </TableHead>

              <TableHead className="w-[150px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                className="bg-white dark:bg-background hover:dark:bg-muted"
              >
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell className="p-2">{user.email}</TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleMakeAdminClick(user.email)}
                    >
                      Make Admin
                    </Button>
                    <Button
                      size="sm"
                      variant={"destructive"}
                      onClick={() => handleRemoveAdminClick(user.email)}
                    >
                      Remove Admin
                    </Button>
                    <Button size="sm" variant={"outline"}>
                      Block User
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="p-4"></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}

export default Users;
