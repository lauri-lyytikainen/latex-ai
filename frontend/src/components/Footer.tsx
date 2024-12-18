import { Container, AppBar, Stack } from "@mui/material"

export default function Footer() {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0 }}>
      <Container
        maxWidth="xl"
        sx={{ minHeight: "6rem", alignContent: "center" }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}>
          <p>
            <a href="" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </a>
          </p>
          <p>
            <a href="" style={{ color: "inherit", textDecoration: "none" }}>
              Terms of Service
            </a>
          </p>
          <p>
            <a href="" style={{ color: "inherit", textDecoration: "none" }}>
              Contact
            </a>
          </p>
        </Stack>
      </Container>
    </AppBar>
  )
}
