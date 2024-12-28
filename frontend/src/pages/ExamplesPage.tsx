import {
  Typography,
  Container,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import katex from "katex"

export default function ExamplesPage() {
  const equations = [
    {
      input: "x^2 + 2x + 1 = 0",
      latex: "x^2 + 2x + 1 = 0",
      notes: "This is a simple quadratic equation.",
    },
    {
      input: "Integral of x^2 from negative infinity to 32.5",
      latex: "\\int\\limits_{-\\infty}^{32.5} x^2 dx",
      notes: "Integrals are easy to describe",
    },
    {
      input: "Sum of x^5 - i divided by the square root of x from i 1 to 100",
      latex: "\\sum_{i=1}^{100}\\frac{x^5-i}{\\sqrt{x}}",
      notes: "More complex descriptions are also possible",
    },
    {
      input: "Write eight factorial with its multiplications using \\cdot",
      latex:
        "8! = 8 \\cdot 7 \\cdot 6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1",
      notes:
        "You can describe something abstractly, and instruct to use a specific symbol",
    },
    {
      input: "What was the symbol that is used to describe density ",
      latex: "\\rho",
      notes: "You can also ask for a symbol",
    },
    {
      input: "Solve 5x-3*4=4 in steps",
      latex:
        "\\begin{align*} 5x-3\\cdot4&=4\\\\5x-12&=4\\\\5x&=4+12\\\\5x&=16\\\\x&=\\frac{16}{5} \\end{align*}",
      notes: "You can ask for a simple step by step solution",
    },
    {
      input: "The burning reaction of methane",
      latex:
        "\\mathrm{CH}_4 + 2\\mathrm{O}_2 \\rightarrow \\mathrm{CO}_2 + 2\\mathrm{H}_2\\mathrm{O}",
      notes: "You can describe a chemical reaction",
    },
  ]

  return (
    <Container>
      <br />
      <Typography variant="h2">Examples</Typography>
      <br />
      <Typography variant="body1">
        Here you can find some tips and examples on how to use this app.
      </Typography>
      <br />
      <Typography variant="body1">
        The LLM might not always return a coherent result, so it is important to
        try multiple times and to be as clear as possible in your input. If the
        input fails to produce a result, try to change the wording or add just
        one space so the LLM can try to process the input again.
      </Typography>
      <br />
      <TableContainer component={Card} variant="outlined">
        <Table sx={{ maxWidth: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Text input</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Latex Output</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equations.map(row => (
              <TableRow
                key={row.input}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.input}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    alignContent={"center"}
                    dangerouslySetInnerHTML={{
                      __html: katex.renderToString(row.latex, {
                        throwOnError: false,
                        displayMode: true,
                      }),
                    }}
                    sx={{
                      "& .katex-display": {
                        overflow: "auto hidden",
                        "& .katex": { textAlign: "left" },
                      },
                    }}
                  />
                </TableCell>
                <TableCell>{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </Container>
  )
}
