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
  CircularProgress,
  ButtonGroup,
  Button,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import React, { useEffect, useState } from "react"
import LatexResponse from "../Interfaces/types"
import TranslateStringToLatex from "../services/TranslateService"
import katex from "katex"
import "katex/dist/katex.min.css"

export default function TranslatePage() {
  const [text, setText] = useState("")
  const [debounceText, setDebounceText] = useState("")
  const [showLatex, setShowLatex] = useState(false)
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [latexResponse, setLatexResponse] = useState<LatexResponse>({
    latex_string: "",
    valid_response: false,
  })
  const [fontSize, setFontSize] = useState(16)

  function increaseFontSize() {
    if (fontSize < 26) {
      setFontSize(fontSize + 2)
    }
  }
  function decreaseFontSize() {
    if (fontSize > 16) {
      setFontSize(fontSize - 2)
    }
  }

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value)
    setWaitingResponse(true)
  }

  function translate(input: string): void {
    if (input.trim() === "") {
      setLatexResponse({ latex_string: "", valid_response: false })
      setWaitingResponse(false)
      return
    }
    TranslateStringToLatex(input).then(response => {
      setLatexResponse(response)
      setWaitingResponse(false)
    })
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      if (text === debounceText) {
        setWaitingResponse(false)
        return
      }
      setDebounceText(text)
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
          error={
            !latexResponse.valid_response &&
            text.trim() !== "" &&
            !waitingResponse
          }
          helperText={
            !latexResponse.valid_response &&
            !waitingResponse &&
            text.trim() !== ""
              ? "Invalid input"
              : ""
          }
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
          sx={{
            width: "100%",
            height: "100%",
            minHeight: "100px",
          }}>
          <CardContent sx={{ position: "relative", minHeight: "100px" }}>
            <Chip
              label="Copy Latex"
              icon={<ContentCopyIcon fontSize="small" />}
              size="small"
              sx={{ position: "absolute", top: 8, right: 8, padding: "10px" }}
              onClick={() => {
                navigator.clipboard.writeText(latexResponse.latex_string)
              }}
            />
            {waitingResponse ? (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  marginTop: "-24px",
                  marginLeft: "-24px",
                }}
              />
            ) : null}
            <ButtonGroup
              orientation="vertical"
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translate(0, -50%)",
              }}>
              <Button sx={{ fontSize: "16px" }} onClick={increaseFontSize}>
                <AddIcon />
              </Button>
              <Button sx={{ fontSize: "16px" }} onClick={decreaseFontSize}>
                <RemoveIcon />
              </Button>
            </ButtonGroup>
            <Typography
              variant="body1"
              fontSize={fontSize}
              color={waitingResponse ? "text.disabled" : "text.primary"}
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
