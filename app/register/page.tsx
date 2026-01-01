"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data?.error?.formErrors?.[0] ?? data?.error ?? "Error registrando");
      return;
    }

    setOk("Cuenta creada. Ahora inicia sesión.");
    setTimeout(() => router.push("/login"), 600);
  }

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-4">Crear cuenta</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {ok && <div className="alert alert-success">{ok}</div>}

      <form onSubmit={onSubmit} className="d-grid gap-3">
        <input
          className="form-control"
          placeholder="Nombre (opcional)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
          placeholder="Password (mín 8)"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-primary" type="submit">
          Registrarme
        </button>
        <a className="btn btn-link" href="/login">
          Ya tengo cuenta → Iniciar sesión
        </a>
      </form>
    </div>
  );
}
