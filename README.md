# 🎬 CineAI: Content-Based Movie Recommender

CineAI is a futuristic, AI-powered movie recommendation system that uses Natural Language Processing (NLP) to understand your taste and suggest cinematic masterpieces.

![CineAI Demo](https://raw.githubusercontent.com/Kakarla-Rupa/movie-recommendation-/main/static/demo.png)

## ✨ Core Features
- **AI Recommendation Engine**: Utilizes TF-IDF vectorization and Cosine Similarity to find movies with similar plot points and genres.
- **Fuzzy Search Intelligence**: Handles typos and partial titles seamlessly using fuzzy matching.
- **Glassmorphism UI**: A premium, dark-themed interface built with a futuristic "AI" aesthetic.
- **Enriched Data**: Provides genres and plot overviews for all recommended films.

## 🛠️ Technology Stack
- **Backend**: Python, Flask, Flask-CORS
- **NLP/Machine Learning**: Scikit-Learn (TF-IDF, Cosine Similarity), Pandas
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism), JavaScript (Fetch API)
- **Icons**: Lucide Icons

## 🚀 Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Kakarla-Rupa/movie-recommendation-.git
    cd movie-recommendation-
    ```

2.  **Install dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the application**:
    ```bash
    python app.py
    ```

4.  **Open in Browser**:
    Navigate to `http://127.0.0.1:5000`

## 📂 Project Structure
- `app.py`: Flask server & API routes.
- `recommender.py`: AI recommendation engine logic.
- `templates/index.html`: Main UI template.
- `static/style.css`: Premium CSS styling.
- `static/script.js`: Dynamic frontend interactions.
- `real_movies_dataset.csv`: Dataset containing movie profiles.

## 🤖 How it Works
The system analyzes the `genres` and `overview` of each movie. It transforms these text attributes into numerical vectors using **TF-IDF**. When a user selects a movie, the engine calculates the **Cosine Similarity** between that movie's vector and all others in the dataset, returning the top-ranked matches.

---
Developed by **Kakarla-Rupa**.
