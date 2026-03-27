from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from recommender import load_data, create_similarity, recommend
import os

app = Flask(__name__)
CORS(app)

# Load data once at startup
df = load_data()
similarity = create_similarity(df)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/recommend", methods=["POST"])
def get_recommendations():
    data = request.json
    movie_title = data.get("movie")
    if not movie_title:
        return jsonify({"error": "No movie provided"}), 400
    
    recommendations = recommend(movie_title, df, similarity)
    return jsonify({
        "input": movie_title,
        "recommendations": recommendations
    })

@app.route("/api/movies", methods=["GET"])
def get_movies():
    return jsonify(df["title"].tolist())

if __name__ == "__main__":
    app.run(debug=True, port=5000)
