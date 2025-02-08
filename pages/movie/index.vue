<template>
  <div>
    <div class="min-h-screen pt-[90px] pb-[115px] relative">
      <span class="bg-white/[0.05] absolute h-[333px] left-0 right-0 top-0"></span>
      <div class="max-w-screen-xl container mx-auto relative z-1">
        <div class="flex justify-between items-center mb-12">
          <h1 class="text-white text-3xl font-bold">
            <span class="bg-[#E74C3C] block h-[6px] w-[112px] mb-2"></span>
            Movies
          </h1>
        </div>
        <div class="flex flex-row gap-6">
          <div class="basis-1/4 bg-[#0E1723] rounded-lg h-full">
            <h2 class="text-white text-lg font-bold mb-3 p-5 border-b border-white/[.1]">Sort Result By</h2>
            <div class="p-5">
              <select v-model="selectedSort" @change="applyFilters" class="w-full p-2 bg-gray-800 text-white rounded">
                <option value="popularity">Popularity</option>
                <option value="year">Year</option>
              </select>

              <h2 class="text-white text-lg font-bold mt-5 mb-3">Genres</h2>
              <div v-for="genre in availableGenres" :key="genre" class="flex items-center py-1">
                <label :for="genre" class="flex align-center justify-between w-full text-white cursor-pointer">
                  {{ genre }}
                  <input 
                    type="checkbox" 
                    :id="genre"
                    :value="genre" 
                    v-model="selectedGenres"
                    @change="updateURL"
                    class="mr-2"
                  />
                </label>
              </div>
            </div>
          </div>
          <div class="basis-3/4 relative">
            <div v-show="loading" class="absolute flex justify-center items-center h-full w-full z-1">
              <div class="loader"></div>
            </div>
            <!-- <div v-if="filteredMovies.length === 0" class="text-white">
              No movies found. Selected Genres: {{ selectedGenres }}
            </div> -->
            <div v-if="error" class="text-red-500 text-center text-xl">{{ error }}</div>
            <div v-else>
              <div class="grid grid-cols-4 gap-6">
                <div 
                  v-for="movie in visibleMovies" 
                  :key="movie.imdbID"
                  class="cursor-pointer group"
                >
                  <div class="relative movie-list">
                    <img 
                      :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/330x240'" 
                      :alt="movie.Title" 
                      class="w-full h-[330px] object-cover"
                    />
                    <!-- Rating Badge -->
                    <div class="absolute top-0 right-0 bg-black/60 text-white px-3 py-1 font-bold flex items-center">
                      {{ movie.imdbRating || 'N/A' }}
                    </div>

                    <!-- Hover Overlay -->
                    <div class="movie-overlay absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p class="flex align-center text-white text-xl font-semibold"><img src="~/assets/images/icon-star.svg" alt="">{{ movie.imdbRating || 'N/A' }}</p>
                      <p class="text-center text-white text-lg font-semibold px-2">{{ movie.Genre || 'Unknown' }}</p>
                      <NuxtLink 
                        :to="`/movie/${movie.imdbID}`"
                        class="mt-3 px-6 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
                      >
                        VIEW
                      </NuxtLink>
                    </div>
                  </div>
                  <div class="mt-[13px]">
                    <h2 class="text-white font-semibold text-lg truncate mb-[3px]">{{ movie.Title }}</h2>
                    <p class="text-gray-400 text-sm">{{ movie.Year }}</p>
                  </div>
                </div>
              </div>

              <!-- Load More Button -->
              <div class="text-center mt-8" v-if="visibleMovies.length < filteredMovies.length">
                <button 
                  @click="loadMoreMovies" 
                  class="cursor-pointer px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition"
                >
                  Load More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({ layout: 'default' });

const config = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

const movies = ref([]);
const loading = ref(true);
const error = ref(null);

// Genres & Sorting
const availableGenres = ref([
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror'
]);

const selectedGenres = ref(route.query.genre ? route.query.genre.split(",") : []);
const selectedSort = ref('popularity');

// Load More Logic
const visibleCount = ref(8); // Awalnya hanya tampil 8 film
const visibleMovies = computed(() => filteredMovies.value.slice(0, visibleCount.value));

const loadMoreMovies = () => {
  visibleCount.value += 8; // Tambah 8 film lagi setiap klik
};

// Fetch Movies
const fetchMovies = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&s=movies`);
    const data = await response.json();

    if (data.Response === 'False') throw new Error(data.Error || 'No movies found');

    const detailedMovies = await Promise.all(
      data.Search.slice(0, 20).map(async (movie) => {
        const detailResponse = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&i=${movie.imdbID}`);
        return detailResponse.json();
      })
    );

    movies.value = detailedMovies;
  } catch (err) {
    error.value = err.message;
    movies.value = [];
  } finally {
    loading.value = false;
  }
};

// Filtered Movies
const filteredMovies = computed(() => {
  let filteredList = [...movies.value];

  if (selectedGenres.value.length > 0) {
    filteredList = filteredList.filter(movie =>
      selectedGenres.value.some(genre => movie.Genre.includes(genre))
    );
  }

  if (selectedSort.value === 'year') {
    filteredList.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (selectedSort.value === 'popularity') {
    filteredList.sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0));
  }

  return filteredList;
});

// Watch perubahan pada route untuk update genre
watch(() => route.query.genre, () => {
  fetchMovies();
});

onMounted(() => {
  fetchMovies();
});
</script>