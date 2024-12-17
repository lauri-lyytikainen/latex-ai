import axios from "axios"
import LatexResponse from "../Interfaces/types"

export default async function TranslateOnServer(
  textString: string
): Promise<LatexResponse> {
  return axios
    .get("http://localhost:8000/translate?text_expression=" + textString)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.log(error)
      return { latex_string: "", valid_response: false }
    })
}
