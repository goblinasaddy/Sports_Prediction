# **App Name**: MatchPoint Predictor

## Core Features:

- Tournament Selection: Allows users to select an upcoming tennis tournament from a dropdown list.
- Model Selection: Enables users to choose a prediction model (Logistic Regression, Random Forest, LightGBM, Neural Network) from a dropdown.
- Prediction Trigger: A button that, when clicked, sends the selected tournament and model data to a backend API endpoint for prediction.
- Loading Animation: Displays an animation while the prediction is being fetched from the backend, providing user feedback.
- Winner Prediction: AI tool that uses the selected model to predict the winner of the tennis match based on the input tournament.
- Results Display: Shows the predicted winner, model accuracy, AUC, precision, and recall in a clear panel after the prediction is made.
- Data Connector: Enables easy passing of dropdown values to the backend and acceptance of a JSON response containing the winner and metrics.

## Style Guidelines:

- Primary color: Sky blue (#87CEEB) to represent the open sky of the tennis court.
- Background color: Light gray (#F0F8FF), a very desaturated version of the primary, provides a neutral backdrop.
- Accent color: Lavender (#E6E6FA) to complement the blue, creating a soft and modern look.
- Body and headline font: 'PT Sans', a humanist sans-serif, to maintain a balance of modern and warm.
- Use tennis-themed icons (ball, racket, court) to visually represent different functionalities.
- Card-based layout with a mobile-first design to ensure responsiveness and clean presentation.
- Subtle animations for loading states and displaying results (e.g., fade-in, slide-up) to enhance user experience.