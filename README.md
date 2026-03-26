# Mentor Moose (GitHub Pages Demo)

Mentor Moose is a static front-end demo for a **student-to-student tutoring marketplace**.

## What you asked for

This demo now includes:

- Separate page for student account creation (`student-signup.html`)
- Separate page for tutor account creation (`tutor-signup.html`)
- Login page (`login.html`) for student, tutor, and admin roles
- Admin dashboard (`admin.html`) where admin can see lists of student and tutor accounts
- Tutor accounts created on the tutor signup page appear on the main marketplace (`index.html`)

## Demo credentials

- Admin username: `admin`
- Admin password: `mentor-moose-admin`

## GitHub Pages deploy

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Set source to **Deploy from a branch**.
4. Select your default branch and root folder (`/`).
5. Save.
It is designed to work out-of-the-box on GitHub Pages.

## Features

- Tutor marketplace landing page
- Account creation forms for student and tutor roles
- On-page account lists so created student/tutor accounts are visible immediately
- Built-in demo tutor listings
- Client-side filters by subject, max hourly rate, and text search
- Tutor accounts are persisted in browser localStorage and added to listings

- No build tooling required (pure HTML/CSS/JS)

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** `Deploy from a branch`
   - **Branch:** `main` (or your default branch) and `/ (root)`
4. Save and wait for Pages to publish.

Your site will be available at:

`https://<your-username>.github.io/<repo-name>/`

## Local preview

Open `index.html` in your browser.
Open `index.html` directly in a browser.
