# Task Manager API - Short Routes (Postman-ready)

Server base: `http://localhost:3000`
Base path: `/taskmanager`

Examples (use these complete URLs in Postman):

- GET All Tasks
  - URL: `http://localhost:3000/taskmanager/`
  - Method: GET
  - Body: none

- GET Task by ID
  - URL: `http://localhost:3000/taskmanager/{id}`
  - Method: GET
  - Path param: `id` — MongoDB task `_id` (string)
  - Body: none

- Create Task
  - URL: `http://localhost:3000/taskmanager/`
  - Method: POST
  - Content-Type: `multipart/form-data`
  - Form-data fields:
    - `title` (string) — required
    - `description` (string) — required
    - `deadline` (ISO 8601 date string) — required (e.g., `2026-05-10T15:30:00Z`)
    - `status` (string) — optional: `TODO` or `DONE` (defaults to `TODO`)
    - `linkedFile` (file) — optional (field name: `linkedFile`)

- Update Task
  - URL: `http://localhost:3000/taskmanager/{id}`
  - Method: PUT
  - Path param: `id` — MongoDB task `_id` (string)
  - Content-Type: `multipart/form-data` (for file) or `application/json`
  - Body fields (form-data or JSON): any of `title`, `description`, `deadline`, `status`, `linkedFile` (file)

- Delete Task
  - URL: `http://localhost:3000/taskmanager/{id}`
  - Method: DELETE
  - Path param: `id` — MongoDB task `_id` (string)
  - Body: none

Notes:
- Required model fields: `title`, `description`, `deadline`.
- Use ISO 8601 date format for `deadline`.
- File field name for uploads: `linkedFile`.
