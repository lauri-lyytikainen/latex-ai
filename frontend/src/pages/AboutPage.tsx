import { Typography, Container } from "@mui/material"

export default function AboutPage() {
  return (
    <Container>
      <Typography variant="h1">About</Typography>
      <Typography variant="body1">
        This is a simple web app that converts text to latex using a language
        model.
      </Typography>
    </Container>
  )
}
