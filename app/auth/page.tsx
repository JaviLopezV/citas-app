export default function AuthLanding() {
  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h1 className="mb-3">Bienvenido</h1>
      <p className="text-muted">
        Crea una cuenta o inicia sesión para continuar.
      </p>

      <div className="d-grid gap-2">
        <a className="btn btn-primary" href="/register">
          Crear cuenta
        </a>
        <a className="btn btn-outline-primary" href="/login">
          Iniciar sesión
        </a>
      </div>
    </div>
  );
}
