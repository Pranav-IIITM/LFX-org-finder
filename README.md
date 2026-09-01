# LFX Mentorship Finder 🐧

[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-Participating-orange.svg)](https://hacktoberfest.com/)
[![CI Validation](https://github.com/Pranav-IIITM/LFX-org-finder/actions/workflows/validate-data.yml/badge.svg)](https://github.com/Pranav-IIITM/LFX-org-finder/actions)

Welcome to **LFX Mentorship Finder**! Your path to an open-source mentorship in 3 simple steps.

This project is a lightweight, frontend-only application designed to help aspiring open-source contributors easily browse, filter, and discover active Linux Foundation (LFX) Mentorship projects.

---

## 🌟 Features

- **🔎 Smart Search & Filtering:** Instantly filter hundreds of LFX projects by organization, required skills (e.g., Go, Kubernetes, React), or term.
- **📅 Dynamic Timeline:** A real-time, vertical visual timeline tracking the current mentorship lifecycle (applications open, close, selection notifications, etc.).
- **👥 Past Mentees Directory:** Connect with past LFX mentees! Browse alumni by organization to learn from their experiences and reach out via GitHub or LinkedIn.
- **📊 Live Statistics:** Dynamically calculated statistics (Total Projects, Unique Languages, Domains) across all available organizations.
- **🤖 Automated CI Pipelines:** Includes strict CI validation workflows to ensure data integrity when new projects and mentees are added.

---

## 🚀 Getting Started (Local Development)

This project requires **zero** build steps, no `npm install`, and no complex bundlers! It is built with vanilla HTML, CSS, and JavaScript.

### Prerequisites
- A modern web browser.
- Git.
- Any simple local HTTP server (e.g., VS Code Live Server, Python `http.server`, or Node `http-server`).

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Pranav-IIITM/LFX-org-finder.git
   cd LFX-org-finder
   ```

2. **Serve the project locally:**
   - **Using Python 3:**
     ```bash
     python -m http.server 3000
     ```
   - **Using VS Code:**
     Right-click `index.html` and select **"Open with Live Server"**.

3. **View the application:**
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 🤝 Contributing

**We are actively participating in Hacktoberfest!** 🎃 

We welcome contributions of all kinds—whether you are fixing a UI bug, optimizing JavaScript performance, adding a missing LFX project, or adding yourself to the Past Mentees directory!

Please read our [**Contributing Guidelines**](CONTRIBUTING.md) carefully before submitting a Pull Request. It explains:
- How to add new mentees to `data.js`.
- How to ensure your PR passes our CI Data Validator pipeline.
- How to properly structure your git branches.

### Add Yourself as a Past Mentee!
If you have completed an LFX Mentorship, we want you on our platform! Open a PR to add your details to the `LFX_MENTEES` array inside `src/js/data.js`. Your profile will automatically be routed and displayed on your respective organization's page.

---

## 🏗️ Architecture & Tech Stack

- **Frontend:** Vanilla HTML5, CSS3 (Custom Properties/Variables), JavaScript (ES6+).
- **Data Layer:** In-memory state management via static JSON-like structures in `src/js/data.js`.
- **CI/CD:** GitHub Actions (Automated Labeler, Data Syntax Validator).

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
