import axios from "axios"
import LatexResponse from "../Interfaces/types"

export default async function TranslateOnServer(
  textString: string
): Promise<LatexResponse> {
  const encodedText = encodeURIComponent(textString)
  const backendUrl = import.meta.env.DEV
    ? "http://localhost:8000"
    : import.meta.env.VITE_BACKEND_URL

  return axios
    .get(`${backendUrl}/translate?text_expression=${encodedText}`)
    .then(response => {
      if (response.status !== 200) {
        return { latex_string: "", response_type: "error" }
      }
      return response.data
    })
    .catch(error => {
      console.log(error)
      return { latex_string: "", response_type: "error" }
    })
}
