# AI Tennis Match Predictor

This project predicts tennis match outcomes using multiple machine learning models. It allows users to select a tournament, choose a model, and view predictions along with performance metrics in a clean UI.

## Features

*   **Tournament Selection Dropdown** – Choose from a list of upcoming tournaments.
*   **Model Selection Dropdown** – Select from Logistic Regression, Random Forest, LightGBM, or a Neural Network.
*   **One-Click Prediction** – Backend fetching of model metrics with a smooth animated loading state.
*   **Result Panel** – Displays the predicted winner and key performance metrics for the selected model, including:
    *   Accuracy
    *   AUC
    *   Precision
    *   Recall
*   **Cloud-Ready** – Models and metrics are stored and fetched from Firebase Storage.
*   **Modern UI** – Built with Next.js and ShadCN UI for a clean and responsive user experience.

## Tech Stack

*   **Frontend**: Next.js, React, TypeScript, Tailwind CSS, ShadCN UI
*   **Backend/AI**: Genkit (by Firebase) for managing server-side AI flows.
*   **Cloud Storage**: Firebase Storage for hosting ML models and metrics files.
*   **Model Training (Offline)**: Python, Scikit-learn, LightGBM, PyTorch.

## Project Structure

The project follows a standard Next.js App Router structure.

```
.
├── src/
│   ├── app/                # Main application pages and layout
│   ├── components/         # React components (UI and App-specific)
│   ├── ai/                 # Genkit flows for backend logic
│   │   ├── flows/
│   │   └── genkit.ts
│   ├── lib/                # Utilities, constants, and Firebase config
│   └── services/           # Services for interacting with Firebase
├── public/                 # Static assets
├── package.json
└── next.config.ts
```

## Setup and Installation

1.  **Clone Repository**
    ```bash
    git clone https://github.com/your-username/tennis-match-predictor.git
    cd tennis-match-predictor
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Firebase & GCP Setup**
    *   Create a Firebase Project in the Firebase Console.
    *   Enable Firebase Storage.
    *   Upload your trained models and `model_metrics.json` to the appropriate paths in your Storage bucket.
    *   Create a `.env` file in the root of the project and add your Firebase project configuration keys.

4.  **Run the Development Server**
    ```bash
    npm run dev
    ```

## Example Output

The prediction panel shows:

*   **Predicted Winner**: Novak Djokovic
*   **Model Accuracy**: 78.4%
*   **AUC**: 0.82
*   **Precision**: 0.76
*   **Recall**: 0.74

## Future Enhancements

*   Integration with a live data feed for ongoing tournaments.
*   A user-specific analytics dashboard.
*   Implementation of more advanced deep learning models like Transformers for richer context.

## Contributing

1.  Fork this repository.
2.  Create a new branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m "Add feature"`).
4.  Push to the branch (`git push origin feature/your-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License.
