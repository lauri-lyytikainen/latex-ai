import {
  Typography,
  Container,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material"

export default function TranslatePage() {
  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(e.target.value)
  }

  return (
    <Container>
      <Typography variant="h1">Text to Latex</Typography>
      <Stack direction={"column"} spacing={2}>
        <TextField
          id="outlined-multiline-static"
          label="Text input"
          multiline
          rows={4}
          placeholder="Integral of x^2 in range of 0 to 10"
          fullWidth={true}
          onChange={handleTextChange}
        />

        <TextField
          id="outlined-multiline-static"
          label="Latex"
          multiline
          rows={4}
          fullWidth={true}
          disabled={true}
        />
        <FormControlLabel control={<Switch />} label="Show Latex code" />
      </Stack>
    </Container>
  )
}
