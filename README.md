# Latex AI

## Text 2 Tex

![CI/CD](https://img.shields.io/github/actions/workflow/status/lauri-lyytikainen/latex-ai/ci-cd.yml)
![Website](https://img.shields.io/website?url=http%3A%2F%2Flaurilyytikainen.me%2Flatex-ai)
![License](https://img.shields.io/github/license/lauri-lyytikainen/latex-ai)

<!--
This is a simple AI that can generate LaTeX code for you. It is based on a simple LLM model that is instructed to respond with LaTeX code. The current model is . -->

This is a simple web app that converts text to Latex syntax using a large language model. In this case I am using `meta-llama/Meta-Llama-3-70B-Instruct`, from Groq Cloud.

The idea for this project came from the need to write mathematical equations in Latex. I wanted to make the process easier by using a language model to convert text to Latex syntax. Remembering all of the syntax and commands for Latex can be difficult, especially when trying to write fast. This web app aims to make the process easier by allowing the user to write in plain text and then convert it to Latex almost instantly.

I wanted the project to be an learning experience for me. I decided to implement it as a fullstack web app using React and FastAPI to learn fullstack development and to showcase my skills. I believe that the project is a good example of what I can do as a developer.

Available at [laurilyytikainen.me/latex-ai](http://laurilyytikainen.me/latex-ai).

## What I learned

This is my first complete and polished fullstack web app. I learned a lot about project structure, frontend-backend communication, and ci/cd workflow. I also learned how to use TypeScript, FastAPI, Vite and other libraries, which were completly new to me.

I tested the frontend and backend separately and automated it. I also learned how to deploy the project to a server and how to use docker to containerize the app. I learned how to use Microsoft Azure to deploy the REST API and how to host a SPA on GitHub Pages.

## Development

Use the following commands to set up the development environment:

```bash
git clone https://github.com/lauri-lyytikainen/latex-ai.git
cd latex-ai
# Install dependencies only if you want compiler suggestions
cd backend
poetry install # Requires poetry
cd ../frontend
npm install # Requires npm
cd ..
# Start the development server
docker compose up --build
```

Use conventional commits to make changes.
The CI/CD pipeline will automatically build and deploy the changes of `origin/main` to the website.
