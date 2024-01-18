# IE Service Code challenge

Challenge requirements can be found on the homepage of the app

## Technology Stack and Rationale

**Client-Side:**

- **React Vite + TypeScript**: Given the project's scope, a simple four-page application without SEO or SSR requirements, React Vite was the optimal choice for a build tool.
- **State Management**: While React context would have sufficed, the combination of Redux, Redux-toolkit, and Redux-persist was chosen for its seamless integration with localStorage for data persistence and its robust devtools for debugging.
- **UI Framework**: [Material Design for Bootstrap](https://mdbootstrap.com/) was selected over MaterialUI for its lightweight nature and the availability of free login templates, which expedited the design process.
- **Styling**: The project did not necessitate complex styling, hence raw CSS was utilized instead of SCSS, styled-components, or Tailwind.
- **Testing**:
  - **Vitest**: Paired with React Vite, Vitest offers superior speed compared to Jest.
  - **@testing-library/react**: This library aligns with Kent C. Dodds' testing philosophy which I follow, which emphasizes avoiding testing implementation details. More information can be found [here](https://kentcdodds.com/blog/testing-implementation-details).
- **When do I write tests**: The decision to write tests is contingent on the team, stakeholders, and business needs. Balancing the Project Management Triangle of Speed, Cost, and Quality often necessitates a sacrifice. In scenarios where speed and cost are prioritized, Quality (in the form of testing) may be compromised. Consistency is key; if the team is not collectively committed to writing tests, enforcing it may not be beneficial.

**Server-Side:**

- **Node + Express**: This combination was chosen as it is the current area of expertise.
- **Testing**:
  - **Jest**: This classic choice was used primarily for testing API endpoints to ensure correct outputs for given inputs which can easily result in 100% coverage

## Run Locally

Clone the project

```bash
  git clone https://github.com/iamMikeLe/ieservis_code_challenge.git
```

Install and start the backend

```bash
  cd ieservis_code_challenge
  cd be
  npm install
  npm start
```

Install and start frontend

```bash
  cd ieservis_code_challenge
  cd fe
  npm install
  npm run dev
```

test both fe and be you can use 

```bash
  cd fe
  npm test
```

```bash
  cd be
  npm test
```

If you use yarn I will asume you know how to adjust the commands. I already added .env to .gitignore so need to create params

In your browser open [http://localhost:5173/](http://localhost:5173/) to start testing

**Working login credentials for testing**

**User:**

- email: user@email.com
- password: userPassword

**Admin:**

- email: admin@email.com
- password: adminPassword

NOTE: to properly test, I recommend preset network throttling to test UI loading
