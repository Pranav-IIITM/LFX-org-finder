# Contributing to LFX Mentorship Finder

First off, thank you for considering contributing to the LFX Mentorship Finder! 🎉 
This project is participating in **Hacktoberfest**, and we welcome contributions from everyone—whether you're fixing a typo, designing a new UI element, or adding missing projects to our database.

## 🚀 How to Contribute

### 1. Adding a New LFX Project (Data Entry)
The most common way to contribute is by adding missing or new LFX Mentorship projects to our database. All project data is stored entirely in **`src/js/data.js`**.

To add a project, simply append a new object to the `LFX_PROJECTS` array following this exact schema:

```javascript
{
    id: "unique-project-id", // e.g., "kubernetes-2026-t3-1"
    org: "Organization Name", // e.g., "Kubernetes"
    title: "Project Idea Title",
    term: "2026-Term-3", // Must follow the YYYY-Term-X format
    repo: "organization/repository", // Exactly as it appears on GitHub
    description: "Brief description of the project tasks...",
    skills: ["Go", "Kubernetes", "Docker"],
    mentors: ["@githubhandle1", "@githubhandle2"]
}
```

**⚠️ CRITICAL:** Before submitting your Pull Request, you must verify your JSON syntax!
Run this command in your terminal:
```bash
node src/js/data.js
```
If it throws a `SyntaxError`, you missed a comma or a quote! Our automated GitHub CI Pipeline will block your PR if there are syntax errors.

### 2. Frontend Development (UI/UX)
If you want to improve the interface, all code is standard HTML, CSS, and Vanilla JS.
- **HTML:** `index.html` (Homepage) and `org-projects.html` (Detailed view)
- **CSS:** `src/css/style.css`
- **JavaScript:** `src/js/app.js`

## 🛠️ Local Development Setup

To run the site locally, you just need a simple HTTP server. 
Clone the repository, navigate into the directory, and run:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve -p 3000
```
Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Pull Request Guidelines

1. **Fork the repository** and create your branch from `main`.
2. **Name your branch** descriptively:
   - `feat/add-kubernetes-projects`
   - `fix/navbar-alignment`
   - `docs/update-readme`
3. **Commit messages** should be clear and follow the conventional commits format (e.g., `feat: added 5 new CNCF projects`).
4. **Open a Pull Request**. Our GitHub Actions bot will automatically label your PR based on the files you changed.
5. Await review! A maintainer will add the `hacktoberfest-accepted` label once your PR is approved.

## 💬 Need Help?
If you're stuck, feel free to open an Issue and tag it with `question` or `help wanted`, or just ask in the comment thread of your PR.

Happy hacking! 🐧
