# Django Task Manager

A task management web application built with **Django**, HTML, CSS, and vanilla JavaScript. Users can manage their tasks, organise them by category, and update completion status through asynchronous requests without reloading the page.

## Features

- **User accounts** — register, log in, and log out.
- **Personal task management** — create, view, edit, and delete tasks.
- **Categories** — organise tasks by category.
- **Completion tracking** — mark tasks as complete or incomplete.
- **Dynamic task list** — retrieve task data from Django and render task cards with JavaScript.
- **Asynchronous form submission** — submit new tasks with the Fetch API without a full-page reload.
- **Live status updates** — toggle completion status from the task list and update the interface after Django confirms the change.
- **User feedback** — loading indicators, empty states, success messages, and error handling.
- **Request protection** — authenticated, user-scoped task updates and CSRF protection for POST requests.

## Tech stack

- **Backend:** Python, Django
- **Frontend:** HTML, CSS, JavaScript
- **Browser/server communication:** Fetch API, JSON, `async`/`await`
- **Database:** The database configured by the Django project (SQLite is commonly used for local development)

## Getting started

### Prerequisites

- Python installed
- Git
- A modern web browser

### 1. Clone the repository

Replace `<repository-url>` with the URL of your GitHub repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Create and activate a virtual environment

**Windows PowerShell:**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Windows Command Prompt:**

```bat
py -m venv .venv
.venv\Scripts\activate.bat
```

**macOS/Linux:**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

If the project contains a `requirements.txt` file, install its dependencies:

```bash
python -m pip install -r requirements.txt
```

If it does not contain one yet, install Django and any other packages the project uses. Before sharing the repository, consider creating a dependency file from your working environment:

```bash
python -m pip freeze > requirements.txt
```

Review the generated file before committing it so it contains only the dependencies needed by the project.

### 4. Apply database migrations

```bash
python manage.py migrate
```

### 5. Create an administrator (optional)

```bash
python manage.py createsuperuser
```

### 6. Start the development server

```bash
python manage.py runserver
```

Open the local URL shown in the terminal, usually <http://127.0.0.1:8000/>.

> These instructions assume the project uses Django's standard `manage.py` workflow. Follow any project-specific settings or environment-variable requirements if you have added them.

## JavaScript routes used by the task list

The frontend uses Fetch to communicate with Django. The main routes used by the asynchronous task features are:

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/task/` | Retrieve task data for the task list. |
| `POST` | `/task/add/` | Submit a new task. |
| `POST` | `/task/<id>/toggle/` | Update a task's completion status. |

The toggle route accepts a `completed` value (`"true"` or `"false"`) and returns JSON containing the task ID and updated completion status. POST requests include Django's CSRF token.

The project also includes page routes for task details, editing, deletion, and category creation.

## How the asynchronous task list works

1. JavaScript requests the task list from Django using Fetch.
2. Django returns task data as JSON.
3. JavaScript creates the task cards and displays each task's title, category, status, and detail link.
4. The completion button sends a CSRF-protected POST request to Django.
5. Django checks that the signed-in user owns the task, saves the updated value, and returns JSON.
6. JavaScript updates the status text, CSS classes, and button label after a successful response.

The interface also includes loading feedback, an empty state, error handling, and a disabled button while a completion update is in progress.

## Security notes

- Keep Django's `SECRET_KEY` and any credentials out of the repository.
- Do not commit local databases containing personal or test data unless you intentionally want to share them.
- Keep `.env`, virtual environments, Python cache files, and other local-only files out of Git.
- Preserve Django authentication, task-ownership checks, server-side validation, and CSRF protection.
- Use Django's development server for local development, not as a production deployment server.

## Current status

The core task-management pages and the asynchronous task-list features have been implemented and manually tested during development. Further improvements could include automated tests, accessibility refinements, and production deployment configuration.

## Author

**Carlton Magura**
