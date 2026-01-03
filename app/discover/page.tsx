import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { db } from "../lib/db";

export default async function DiscoverPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth");

  const me = session.user.id;

  const { rows: users } = await db.query(
    `
    SELECT id,name,city,gender,bio
    FROM "User"
    LEFT JOIN "Profile" ON "Profile"."userId"="User".id
    WHERE "User".id != $1
      AND "User".id NOT IN (
        SELECT "toUserId" FROM "Like" WHERE "fromUserId"=$1
      )
    LIMIT 1
  `,
    [me]
  );

  const user = users[0];

  if (!user) {
    return <div className="container py-5">No hay más perfiles 😢</div>;
  }

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <div className="card text-center p-4">
        <h3>{user.name}</h3>
        <p className="text-muted">{user.city}</p>
        <p>{user.bio}</p>

        <div className="d-flex justify-content-between mt-4">
          <form action="/api/like" method="post">
            <input type="hidden" name="to" value={user.id} />
            <button className="btn btn-outline-secondary">❌ Pass</button>
          </form>

          <form action="/api/like" method="post">
            <input type="hidden" name="to" value={user.id} />
            <input type="hidden" name="like" value="1" />
            <button className="btn btn-danger">❤️ Like</button>
          </form>
        </div>
      </div>
    </div>
  );
}
