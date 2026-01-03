"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setOk(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data?.error?.formErrors?.[0] ?? data?.error ?? "Error registrando"
        );
        return;
      }

      setOk("Cuenta creada. Redirigiendo a iniciar sesión…");
      setTimeout(() => router.push("/login"), 700);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "radial-gradient(1200px circle at 20% 10%, rgba(255,0,128,0.10), transparent 55%), radial-gradient(900px circle at 80% 30%, rgba(0,120,255,0.10), transparent 50%)",
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Stack spacing={2.5}>
              <Stack spacing={0.5}>
                <Typography variant="h5" fontWeight={800}>
                  Crear cuenta
                </Typography>
                <Typography color="text.secondary">
                  Crea tu perfil y empieza a descubrir gente.
                </Typography>
              </Stack>

              {error && <Alert severity="error">{error}</Alert>}
              {ok && <Alert severity="success">{ok}</Alert>}

              <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={2}>
                  <TextField
                    label="Nombre (opcional)"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineRoundedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    autoComplete="email"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineRoundedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    label="Password (mín 8)"
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                    autoComplete="new-password"
                    helperText="Usa al menos 8 caracteres."
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    endIcon={
                      loading ? (
                        <CircularProgress size={18} color="inherit" />
                      ) : (
                        <ArrowForwardRoundedIcon />
                      )
                    }
                  >
                    {loading ? "Creando cuenta…" : "Registrarme"}
                  </Button>

                  <Divider />

                  <Button component={Link} href="/login" variant="text">
                    Ya tengo cuenta → Iniciar sesión
                  </Button>
                </Stack>
              </Box>

              <Typography variant="caption" color="text.secondary">
                Al registrarte aceptas nuestras políticas (luego las añadimos).
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
