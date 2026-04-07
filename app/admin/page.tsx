import TableUsers from "./_components/tableUsers";
import HeaderAdmin from "./_components/headerAdmin";
import CreateUserButton from "./_components/createUserButton";
import { getMembers } from "./_services/admin.service";
import AdminGuard from "./_components/form/adminGuard";

export default async function AdminPage() {
  const users = await getMembers();

  return (
    <AdminGuard>
      <div className="min-h-screen bg-background">
        <HeaderAdmin />
        <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Usuários</h1>
            </div>
            <CreateUserButton />
          </div>
          <TableUsers users={users} />
        </main>
      </div>
    </AdminGuard>
  );
}
