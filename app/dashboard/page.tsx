import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <p>Hola, {session.user.email}</p>
      <p>Sesión activa ✅</p>
    </div>
  );
}
