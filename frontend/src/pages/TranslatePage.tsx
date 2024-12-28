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
  Alert,
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
    response_type: "invalid",
  })
  const [fontSize, setFontSize] = useState(16)
  const [showInfo, setShowInfo] = useState(true)

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
      setLatexResponse({ latex_string: "", response_type: "invalid" })
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
    }, 1000)

    return () => {
      clearTimeout(handler)
    }
  }, [text])

  return (
    <Container>
      <br />
      <Typography variant="h2">Text to Latex converter</Typography>
      <br />
      {showInfo ? (
        <Alert severity="info">
          <p>
            If the input fails to produce a result, try to change the wording or
            add a space so the LLM can try to process the input again. This is a
            work in progress application, so the results might not always be
            coherent or there might be bugs.
          </p>
          <Button onClick={() => setShowInfo(false)}>I understand</Button>
        </Alert>
      ) : null}

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
            latexResponse.response_type === "invalid" &&
            text.trim() !== "" &&
            !waitingResponse
          }
          helperText={
            latexResponse.response_type === "invalid" &&
            !waitingResponse &&
            text.trim() !== ""
              ? "Invalid input"
              : ""
          }
        />

        {latexResponse.response_type === "error" ? (
          <Alert severity="error">
            An error ocurred, the server might be down. Try again later.
          </Alert>
        ) : null}

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
                zIndex: 1,
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
              minHeight={"8rem"}
              paddingLeft={"5rem"}
              alignContent={"center"}
              dangerouslySetInnerHTML={{
                __html: (() => {
                  // The katex library normally handles errors by throwing rendering the errors
                  // But for some reason if for example the LLM gives a string such as
                  // "begin{ gather}" with a leading space, the katex will exit in a way that
                  // the whole site stops rendering. This is a workaround to handle that.
                  try {
                    return katex.renderToString(latexResponse.latex_string, {
                      throwOnError: false,
                      displayMode: true,
                    })
                  } catch (error: any) {
                    return `Error: ${error.message}, try to adjust the input text.`
                  }
                })(),
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
