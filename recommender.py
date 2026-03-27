import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import difflib

# Load dataset
def load_data():
    df = pd.read_csv("real_movies_dataset.csv")
    
    # Combine features
    df["combined_features"] = df["genres"].fillna("") + " " + df["overview"].fillna("")
    
    return df

# Create similarity matrix
def create_similarity(df):
    tfidf = TfidfVectorizer(stop_words='english')
    tfidf_matrix = tfidf.fit_transform(df["combined_features"])
    similarity = cosine_similarity(tfidf_matrix)
    
    return similarity

# Get recommendations
def recommend(movie_title, df, similarity):
    # Find the closest match for the movie title
    all_titles = df["title"].tolist()
    closest_match = difflib.get_close_matches(movie_title, all_titles, n=1)
    
    if not closest_match:
        return []
    
    match_title = closest_match[0]
    movie_index = df[df["title"] == match_title].index[0]
    
    similarity_scores = list(enumerate(similarity[movie_index]))
    sorted_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)[1:7]
    
    recommended_movies = []
    for i in sorted_movies:
        movie_data = df.iloc[i[0]]
        recommended_movies.append({
            "title": movie_data.title,
            "genres": movie_data.genres,
            "overview": movie_data.overview
        })
    
    return recommended_movies
