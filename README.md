# Interactive Quiz Project

## Overview

The **Interactive Quiz** is a dynamic, web-based multiple-choice quiz application built with HTML, CSS, and JavaScript. It allows users to test their knowledge on various topics with immediate feedback, explanations, and a timer for each question. The quiz starts only after the user clicks the **Start Quiz** button, providing a clean and engaging user experience.

---

## Features

- **Start Quiz Button:** The quiz begins only when the user clicks the start button.
- **Dynamic Question Rendering:** Questions and answer choices are generated dynamically from a JavaScript question bank.
- **Multiple-Choice Questions:** Users select one answer per question.
- **Per-Question Timer:** Each question has a 30-second timer that automatically advances the quiz.
- **Navigation Controls:** Next and Previous buttons allow users to navigate between questions.
- **Immediate Feedback:** After submission, users receive their score along with detailed explanations for each question.
- **Reset Functionality:** Users can retake the quiz by clicking the reset button, which returns them to the start screen.
- **Responsive Design:** The quiz layout adapts to different screen sizes for desktop and mobile devices.
- **Visual Enhancements:** Animations and color-coded feedback improve user engagement.

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No server setup required; runs entirely in the browser

### Installation

1. Clone or download the repository.
2. Open the `index.html` file in your preferred web browser.

---

## Usage

1. Open the quiz in your browser.
2. Click the **Start Quiz** button to begin.
3. Answer each question by selecting one of the multiple-choice options.
4. Use the **Next** and **Previous** buttons to navigate between questions.
5. Each question has a 30-second timer; the quiz will auto-advance when time runs out.
6. After answering all questions, click the **Submit Answers** button.
7. View your score and detailed explanations for each question.
8. Click **Retake Quiz** to start over.

---

## File Structure

- `index.html` — Main HTML file containing the quiz structure and start screen.
- `styles.css` — CSS file for styling the quiz and animations.
- `script.js` — JavaScript file containing quiz logic, timer, navigation, and result handling.
- `README.md` — This documentation file.

---

## Customization

- **Add Questions:** Modify the `quizQuestions` array in `script.js` to add, remove, or edit questions.
- **Change Timer:** Adjust the `questionTimeLimit` variable in `script.js` to change the time per question.
- **Styling:** Customize the look and feel by editing `styles.css`.
- **Enhancements:** Add features like hints, multimedia content, or high-score tracking.

---

## License

This project is open-source and free to use under the MIT License.

---

## Contact

For questions or feedback, please contact:

**Your Name**  
Email: your.email@example.com

---

Thank you for using the Interactive Quiz!
