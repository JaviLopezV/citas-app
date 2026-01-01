"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    //

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciales incorrectas");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-4">Iniciar sesión</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        <input
          className="form-control"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="form-control"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary" type="submit">
          Entrar
        </button>

        <a className="btn btn-link" href="/register">
          No tengo cuenta → Registrarme
        </a>
      </form>
    </div>
  );
}
