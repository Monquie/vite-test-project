## Features

### 1. Clean React Setup

**Requirement:** Use Vite to set up a fresh React project and remove all code except the React icon.

### 2. Click-to-Reverse Rotation

**Requirement:** The React icon rotates and the direction reverses each time the user clicks it.

**Implementation:**

- React logo continuously rotates using CSS animations
- Click toggles between clockwise and counter-clockwise rotation
- Uses `useState` hook to track rotation direction
- Custom keyframe animations: `logo-spin` and `logo-spin-reverse`

### 3. Cursor Position Scaling

**Requirement:** Adjust the size of the React icon depending on the position of the cursor on the page.

**Implementation:**

- Icon size changes dynamically based on mouse cursor distance from viewport center
- Scale range: 0.5x (at center) to 2x (at edges)
- Uses `useEffect` hook to track mouse movement
- Smooth scaling with CSS transforms

### 4. Idle Timer Display

**Requirement:** Display the amount of time the mouse has been WITHIN the visible page, but NOT moving.

**Implementation:**

- Text below icon shows elapsed time since mouse stopped moving
- Timer starts after 100ms of no mouse movement
- Resets to 0 whenever mouse moves
- Updates every 0.1 seconds for precise tracking
- Uses `setTimeout` and `setInterval` for timing
- Properly cleans up timers on unmount

### 5. Feature Control Sidebar

**Requirement:** Add a sidebar that can be shown/hidden where any of the previous changes can be switched on or off.

**Implementation:**

- Slide-in drawer from the right side of the screen
- Toggle button in top-right corner
- Three toggleable features:
  - **Rotation Animation** - Enable/disable spinning effect
  - **Mouse Position Scaling** - Enable/disable cursor-based resizing
  - **Idle Timer** - Enable/disable idle time counter

## Prerequisites

- Node.js 22+ (required for Vite 7)
- npm 10+

## Installation

```bash
# Clone the repository
git clone git@github.com:Monquie/vite-test-project.git
cd vite-sample-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Sample Video
https://drive.google.com/file/d/1PAs6boDsk3PV69U1700oQ9JrB9OFcCHz/view?usp=sharing
