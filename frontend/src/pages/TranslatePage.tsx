import {
  Typography,
  Container,
  TextField,
  Stack,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material"
// copy icon
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import React, { useEffect, useState } from "react"
import LatexResponse from "../Interfaces/types"
import TranslateStringToLatex from "../services/TranslateService"
import katex from "katex"
import "katex/dist/katex.min.css"

export default function TranslatePage() {
  const [text, setText] = useState("")
  const [showLatex, setShowLatex] = useState(false)
  const [latexResponse, setLatexResponse] = useState<LatexResponse>({
    latex_string: "",
    valid_response: false,
  })

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
  }

  function translate(text: string) {
    if (text === "") {
      setLatexResponse({ latex_string: "", valid_response: false })
      return
    }
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
      <br />
      <Typography variant="h1">Text to Latex converter</Typography>
      <br />
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

        <FormControlLabel
          control={
            <Switch
              checked={showLatex}
              onChange={() => setShowLatex(!showLatex)}
            />
          }
          label="Show Latex code"
        />
        <Card
          variant="outlined"
          sx={{ width: "100%", height: "100%", minHeight: "100px" }}>
          <CardContent sx={{ position: "relative" }}>
            {/* Copy chip */}
            <Chip
              label="Copy Latex"
              icon={<ContentCopyIcon fontSize="small" />}
              size="small"
              sx={{ position: "absolute", top: 8, right: 8, padding: "10px" }}
              onClick={() => {
                navigator.clipboard.writeText(latexResponse.latex_string)
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(latexResponse.latex_string, {
                  throwOnError: false,
                  displayMode: true,
                }),
              }}
            />
          </CardContent>
          {showLatex ? (
            <>
              <Divider />
              <CardContent>{latexResponse.latex_string}</CardContent>
            </>
          ) : null}
        </Card>
      </Stack>
      <br />
    </Container>
  )
}
