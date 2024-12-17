import TranslateOnServer from "../api/TranslateApi"
import LatexResponse from "../Interfaces/types"

export default async function TranslateStringToLatex(
  textString: string
): Promise<LatexResponse> {
  const response = await TranslateOnServer(textString)
  return response as LatexResponse
}
