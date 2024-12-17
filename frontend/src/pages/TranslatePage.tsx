import {
  Typography,
  Container,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import LatexResponse from "../Interfaces/types"
import TranslateStringToLatex from "../services/TranslateService"

export default function TranslatePage() {
  const [text, setText] = useState("")
  const [latexResponse, setLatexResponse] = useState<LatexResponse>({
    latex_string: "",
    valid_response: false,
  })

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  function translate(text: string) {
    TranslateStringToLatex(text).then(response => {
      console.log(response)
      setLatexResponse(response)
    })
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      translate(text)
    }, 2000)

    return () => {
      clearTimeout(handler)
    }
  }, [text])

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
          value={latexResponse.latex_string}
        />
        <FormControlLabel control={<Switch />} label="Show Latex code" />
      </Stack>
    </Container>
  )
}
