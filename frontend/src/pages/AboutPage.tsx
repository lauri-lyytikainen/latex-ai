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
import Diagram from "../static/architectural-diagram.png"

export default function AboutPage() {
  const tableData = [
    {
      technology: "React",
      use: "Frontend Building",
      notes: "Used for building the frontend and handling state",
    },
    {
      technology: "Vite",
      use: "Frontend Bundling",
      notes: "Used for bundling the frontend",
    },
    {
      technology: "Typescript",
      use: "Static Typing",
      notes: "Used for static typing in the frontend",
    },
    {
      technology: "MUI library",
      use: "Frontend Styling",
      notes: "Used as a component library for styling the frontend",
    },
    {
      technology: "Katex",
      use: "Latex Rendering",
      notes:
        "Used to render the Latex syntax in the frontend. Katex is a fast and lightweight Latex rendering library",
    },
    {
      technology: "FastAPI",
      use: "REST API",
      notes: "Used to serve the model and handle API requests with Python",
    },
    {
      technology: "Llama3-70b-8192",
      use: "AI Model",
      notes:
        "Used to convert text to Latex syntax. Controlled by prompting the model with text and prompt instructions",
    },
    {
      technology: "Python",
      use: "Backend Programming",
      notes: "Used to program the backend",
    },
    {
      technology: "Docker",
      use: "Containerization",
      notes: "Used to containerize the app for deployment",
    },
    {
      technology: "Microsoft Azure",
      use: "Deployment",
      notes: "Used to deploy the app to a server",
    },
  ]

  return (
    <Container>
      <br />
      <Typography variant="h1">About</Typography>
      <br />
      <Typography variant="body1">
        This is a simple web app that converts text to Latex syntax using a
        large language model. In this case I am using{" "}
        <Card
          variant="outlined"
          style={{ display: "inline", padding: "0.1rem" }}>
          <Typography component="span" style={{ fontFamily: "monospace" }}>
            llama3-70b-8192
          </Typography>
        </Card>{" "}
        by Meta, from <a href="https://www.groq.com">Groq Cloud.</a> The project
        is open source and available on my{" "}
        <a href="https://github.com/lauri-lyytikainen/latex-ai">GitHub</a>.
      </Typography>
      <br />
      <Typography variant="body1">
        The idea for this project came from the need to write mathematical
        equations in Latex. I wanted to make the process easier by using a
        language model to convert text to Latex syntax. Remembering all of the
        syntax and commands for Latex can be difficult, especially when trying
        to write fast. This web app aims to make the process easier by allowing
        the user to write in plain text and then convert it to Latex almost
        instantly.
      </Typography>
      <br />
      <Typography variant="body1">
        I wanted the project to be an learning experience for me. I decided to
        implement it as a fullstack web app using React and FastAPI to learn
        fullstack development and to showcase my skills. I believe that the
        project is a good example of what I can do as a developer.
      </Typography>
      <br />
      <Typography variant="h2">Architecture Diagram</Typography>
      <img
        src={Diagram}
        alt="Architectural Diagram"
        style={{ width: "100%" }}
      />
      <br />
      <Typography variant="h2">Technologies Used</Typography>
      <br />
      <TableContainer component={Card} variant="outlined">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Technlogy</TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Use
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: "bold" }}>
                Notes
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(row => (
              <TableRow
                key={row.technology}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.technology}
                </TableCell>
                <TableCell align="left">{row.use}</TableCell>
                <TableCell align="left">{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Typography variant="h2">How it Works</Typography>
      <br />
      <Typography variant="body1">
        The app consists of two separate parts, the frontend and the backend.
        The frontend is built using Vite, React, and MUI. The backend is built
        using FastAPI and Python. The frontend is responsible for taking user
        input and sending it to the backend and rendering Latex. The backend
        sends the user input to the model and the model then returns the Latex
        syntax to the backend. The frontend then displays the Latex syntax to
        the user using Katex. The user can then copy the produced output and use
        it in their own documents.
      </Typography>
      <br />
      <Typography variant="h2">What I learned</Typography>
      <br />
      <Typography variant="body1">
        This is my first complete and polished fullstack web app. I learned a
        lot about project structure, frontend-backend communication, and ci/cd
        workflow. I also learned how to use TypeScript, FastAPI, Vite and other
        libraries, which were completly new to me.
      </Typography>
      <br />
      <Typography variant="body1">
        I tested the frontend and backend separately and automated it. I also
        learned how to deploy the project to a server and how to use docker to
        containerize the app. I learned how to use Microsoft Azure to deploy the
        REST API and how to host a SPA on GitHub Pages.
      </Typography>
      <br />
    </Container>
  )
}
