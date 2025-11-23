# 📘 Number Summation Puzzle  
A polished **React Native + TypeScript** proof-of-concept built for a 3–4 day sprint.  
This project demonstrates **game logic architecture**, **scalable grid rendering**, and **high-impact animations** using **React Native Reanimated**.

---

## 🚀 Overview  
**Number Summation Puzzle** is an interactive grid-based logic game where players select **contiguous numbers (horizontal/vertical)** to match a given **target sum**.

This project highlights:

- Clean, modular architecture  
- Reusable UI components  
- Advanced animation mastery  
- Puzzle scalability (any N×N grid)  
- Strong UX feedback via polished transitions  

Created as a **technical assignment**, this codebase showcases animation, logic design, and scalable architecture skills.

---

## 🎯 Game Objective  
- You are given a **Target Sum**  
- Tap to select **adjacent (up/down/left/right)** cells  
- Build a sequence whose **total equals the target**  
- On a correct match → cells **pop & vanish**  
- Invalid selection → cells **wiggle to show an error**

---

## 🛠️ Tech Stack  

| Category | Technology |
|---------|------------|
| Core Framework | **React Native (Expo)** |
| Language | **TypeScript** |
| Animations | **React Native Reanimated v3** |
| Gestures | **React Native Gesture Handler** |
| State & Rendering | **Expo** |
| Architecture | Component-based, scalable grid system |

---

## 📁 Folder Structure  

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



### 🔍 Architectural Highlights  

#### ✔ **Modular Components**
Each core UI element (Grid, Cell, TargetDisplay) is isolated, reusable, and fully typed.

#### ✔ **Scalable Grid Rendering**
The grid renders **dynamic N×N puzzles** without any internal changes.

#### ✔ **Strict Adjacency Logic**
Only orthogonally neighboring cells can be selected.

#### ✔ **Animated Feedback**
Each cell maintains its own animated state for smooth transitions.

---

## 🎨 Animation Showcase  

### **Selection Pulse**
A soft scale + color transition when selecting/deselecting a cell.

### **Invalid Wiggle**
A quick shake animation for incorrect or non-adjacent selections.

### **Success Pop & Vanish**
Cells scale up dramatically and fade out on a correct match.

Animations are implemented using:

```ts
import Animated, {
  withTiming,
  withSequence,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';


▶️ Running the Project
1. Install Dependencies
npm install


or

yarn

2. Start Expo
npx expo start

3. Run on Device

Scan QR code with Expo Go, or

Use Android/iOS emulator

🧪 Changing the Grid Size (N × N)

Inside GameScreen.tsx:

const GRID_SIZE = 5; // Change to any N


The grid auto-scales to larger puzzles without code changes.
