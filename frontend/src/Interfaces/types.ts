interface LatexResponse {
  latex_string: string
  response_type: "valid" | "invalid" | "error"
}

export default LatexResponse
