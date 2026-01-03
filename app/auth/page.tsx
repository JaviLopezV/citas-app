import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function AuthLanding() {
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
              <Stack direction="row" spacing={1.2} alignItems="center">
                <FavoriteRoundedIcon fontSize="medium" />
                <Typography variant="h5" fontWeight={800}>
                  Bienvenido
                </Typography>
              </Stack>

              <Typography color="text.secondary">
                Crea una cuenta o inicia sesión para empezar a descubrir
                perfiles.
              </Typography>

              <Stack spacing={1.5} sx={{ pt: 1 }}>
                <Button
                  component={Link}
                  href="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  Crear cuenta
                </Button>

                <Button
                  component={Link}
                  href="/login"
                  variant="outlined"
                  size="large"
                >
                  Iniciar sesión
                </Button>
              </Stack>

              <Typography variant="caption" color="text.secondary">
                Al continuar aceptas nuestras políticas (luego las añadimos).
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
