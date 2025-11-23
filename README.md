📘 Number Summation Puzzle

A polished React Native + TypeScript proof-of-concept built for a 3–4 day sprint.
This project demonstrates game logic architecture, scalable grid rendering, and high-impact animations using React Native Reanimated.

🚀 Overview

Number Summation Puzzle is an interactive grid-based logic game where players select contiguous numbers (horizontal/vertical) to match a given target sum.

This project highlights:

Clean, modular architecture

Reusable UI components

Advanced animation mastery

Puzzle scalability (any N×N grid)

Strong UX feedback via polished transitions

This codebase was created as a technical assignment for showcasing problem-solving, structural planning, and animation skills in React Native.

🎯 Game Objective

You are given a Target Sum.

Tap to select adjacent numbers (up, down, left, right).

When the running total equals the target, the selected cells pop & vanish.

If invalid / non-adjacent cells are tapped, the selection wiggles to signal an error.

🛠️ Tech Stack
Category	Technology
Core Framework	React Native (Expo)
Language	TypeScript
Animations	React Native Reanimated v3
Gestures	React Native Gesture Handler
Rendering	Expo
Architecture	Component-driven, fully typed, scalable grid system
📁 Folder Structure
number-sum-expo/
├─ App.tsx
├─ package.json
├─ app.json
├─ tsconfig.json
├─ babel.config.js
└─ src/
   ├─ types.ts
   ├─ utils.ts
   ├─ Grid.tsx
   ├─ Cell.tsx
   ├─ TargetDisplay.tsx
   └─ GameScreen.tsx

🔍 Key Architectural Principles
✔ Modularity

Every element (Grid, Cell, TargetDisplay) is fully reusable with typed props.

✔ Scalability

The grid renders any N×N puzzle without changing internal logic.

✔ Strict Adjacency Rules

Cells validate orthogonal contiguity (no diagonals).

✔ State Isolation

Each cell manages its own animated state while the grid manages game logic.

🎨 Animations (High-Impact Feedback)
1. Selection Pulse

Smooth color + scale pulse when a cell is selected/deselected

Implemented using withTiming + interpolateColor

2. Invalid Selection Wiggle

A horizontal shake when the user taps a non-adjacent cell

Implemented using withSequence(withTiming(...))

3. Success Pop & Vanish

Matched cells scale up dramatically → fade out → disappear

Coordinated animation using withDelay + withTiming

🧩 Core Game Logic
✔ Adjacency Enforcement

The system checks if a new cell is directly touching the last selected cell:

Same row, adjacent column

Same column, adjacent row

✔ Target Sum Validation

On Submit:

If sum == target → remove cells

Else → wiggle animation

✔ Grid Resetting

After a successful match, removed cells are cleared from the board (POC stage).
Gravity/refill can be added easily via utility hooks.

▶️ Running the Project
1. Install dependencies
npm install


or

yarn

2. Run the app
npx expo start

3. Open on device

Scan QR code using Expo Go

OR run on Android/iOS emulator

🧪 Adjusting Grid Size (N × N)

Inside GameScreen.tsx:

const GRID_SIZE = 5; // Change to any N


The grid automatically scales with no internal code changes — demonstrating the scalability requirement.

📸 Visual Demonstration

🎨 Storyboard + Composite Demo Image
(For assignment submission)

👉 Place your generated storyboard image inside /assets/storyboard.png
(or I can embed it for you if needed)

🔧 Extensibility Roadmap

If expanded into a full product, the next steps are:

Feature	Description
Gravity System	Empty cells fall down, new numbers spawn
Multiple Targets	Increasing challenge per round
Level System	Procedurally generated puzzles
Score + Timer	Competitive gameplay
Sound Effects	Haptic + audio feedback
📌 Why This Project Matters

This project demonstrates real-world engineering capabilities:

✔ Strong UI/UX

Polished animations for tactile, responsive gameplay.

✔ Clean Engineering

Separation of concerns, typed components, reusable logic.

✔ Scalability

Proof-of-concept design that can evolve into a full puzzle title.

✔ Production Awareness

Uses industry-standard libraries and patterns.

👤 Author

Abhay Rahangdale
Feel free to reach out for improvements or collabs.
