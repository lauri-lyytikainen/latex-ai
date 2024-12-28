import { Container, AppBar, Stack } from "@mui/material"

export default function Footer() {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0 }}>
      <Container
        maxWidth="xl"
        sx={{ minHeight: "6rem", alignContent: "center" }}>
        <Stack
          direction="row"
          spacing={5}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}>
          <p>
            Made with ❤️ by{" "}
            <a
              style={{ color: "white" }}
              href="http://laurilyytikainen.me/portfolio">
              Lauri Lyytikäinen
            </a>
          </p>
          <p>
            Source code available on{" "}
            <a
              style={{ color: "white" }}
              href="https://github.com/lauri-lyytikainen/latex-ai">
              GitHub
            </a>
          </p>
        </Stack>
      </Container>
    </AppBar>
  )
}
