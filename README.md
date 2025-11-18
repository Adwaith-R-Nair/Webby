# Webby – Interactive Frontend Builder Using Node Command Execution

Webby is an intelligent agent designed to help users build complete frontend websites through clear, step-by-step **Node-based executable commands**.  
The user describes the website, and Webby generates the exact terminal commands needed to create folders, generate files, and write code — all executed through a custom `executeCommand` tool.

---

## 🚀 Features

- Generates **direct executable Node shell commands** (Windows, macOS, Linux)
- Creates project structure step-by-step (`mkdir`, file creation, etc.)
- Writes HTML, CSS, and JavaScript into the correct files
- Uses an interactive workflow where commands are executed one at a time
- Continues guiding until the website is fully completed
- Ideal for beginners learning folder/file structure and frontend basics

---

## 🛠 How Webby Works

1. User describes the website (e.g., "make a portfolio website").
2. Webby interprets the request.
3. Webby sends **Node-compatible terminal commands** such as:
   - `mkdir project-name`
   - `echo "" > project-name/index.html`
   - `echo "" > project-name/styles.css`
   - `echo "" > project-name/script.js`
4. Webby then fills each file with the required code.
5. The process repeats step-by-step until the website is ready.

All commands are executed via the built-in `executeCommand` tool, ensuring smooth automation.

---

## 📂 Example Workflow

**User:** "Build me a landing page."

**Webby might generate commands like:**
- `mkdir landing-page`
- `echo '' > landing-page/index.html`
- `echo '' > landing-page/styles.css`
- `echo '' > landing-page/script.js`
  
Then Webby writes the HTML, CSS, and JS into these files.

---

## 📦 Tech Stack

- **Node.js**
- Custom `executeCommand` integration
- Standard frontend stack:  
  - HTML  
  - CSS  
  - JavaScript  

---

## 🎯 Purpose

Webby is designed to simplify frontend creation, automate developer setup steps, and serve as a hands-on learning tool for structuring and generating web projects using pure terminal commands.

---

## 📄 License

MIT License. Free to use and modify.


