document.addEventListener('DOMContentLoaded', async () => {
    const movieInput = document.getElementById('movie-search');
    const recommendBtn = document.getElementById('recommend-btn');
    const resultsGrid = document.getElementById('results');
    const loader = document.getElementById('loader');
    const movieDataList = document.getElementById('movie-list');

    // Fetch initial movie list for autocomplete
    try {
        const response = await fetch('/api/movies');
        const movies = await response.json();
        movies.forEach(movie => {
            const option = document.createElement('option');
            option.value = movie;
            movieDataList.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching movies:', err);
    }

    // Recommendation logic
    const getRecommendations = async () => {
        const movieTitle = movieInput.value.trim();
        if (!movieTitle) return;

        // UI State
        resultsGrid.classList.add('hidden');
        resultsGrid.innerHTML = '';
        loader.classList.remove('hidden');

        try {
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ movie: movieTitle })
            });

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();
            
            // Artificial delay for "AI" feel
            setTimeout(() => {
                loader.classList.add('hidden');
                displayResults(data.recommendations);
            }, 1500);

        } catch (err) {
            console.error('Error:', err);
            loader.classList.add('hidden');
            alert('Something went wrong. Please try again.');
        }
    };

    const displayResults = (recommendations) => {
        if (recommendations.length === 0) {
            alert('No movies found like that.');
            return;
        }

        recommendations.forEach(movie => {
            const card = document.createElement('div');
            card.className = 'movie-card';

            const genres = movie.genres.split('|').map(g => `<span class="genre-tag">${g}</span>`).join('');

            card.innerHTML = `
                <div>
                    <h3 class="movie-title">${movie.title}</h3>
                    <div class="movie-genres">${genres}</div>
                    <p class="movie-overview">${movie.overview}</p>
                </div>
            `;
            resultsGrid.appendChild(card);
        });

        resultsGrid.classList.remove('hidden');
    };

    recommendBtn.addEventListener('click', getRecommendations);
    movieInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') getRecommendations();
    });
});
