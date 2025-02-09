<template>
  <div>
    <CommonMovieSlider />
    <div class="min-h-screen pt-[90px] pb-[115px] relative">
      <span class="bg-white/[0.05] absolute h-[333px] left-0 right-0 top-0"></span>
      <div class="max-w-screen-xl container mx-auto relative z-1">
        <div class="flex justify-between items-center mb-12">
          <h1 class="text-white text-3xl font-bold">
            <span class="bg-[#E74C3C] block h-[6px] w-[112px] mb-2"></span>
            Discover Movies
          </h1>
          <div class="flex space-x-4">
            <button 
              @click="sortMovies('popularity')" 
              :class="[
                'text-white flex items-center space-x-2 rounded-full px-4 py-2 cursor-pointer',
                sortType === 'popularity' ? 'bg-[#FF0000]' : 'bg-gray-800 hover:bg-[#FF0000]'
              ]"
            >
              <span>Popularity</span>
            </button>

            <button 
              @click="sortMovies('year')" 
              :class="[
                'text-white flex items-center space-x-2 rounded-full px-4 py-2 cursor-pointer',
                sortType === 'year' ? 'bg-[#FF0000]' : 'bg-gray-800 hover:bg-[#FF0000]'
              ]"
            >
              <span>Release Date</span>
            </button>

          </div>
        </div>
        <div class="relative">
          <div v-show="loading" class="flex justify-center items-center h-full w-full z-1 ">
            <div class="loader"></div>
          </div>
          <div v-if="error" class="text-red-500 text-center text-xl">{{ error }}</div>
          <div v-else class="grid grid-cols-5 gap-6">
            <div 
              v-for="movie in sortedMovies" 
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default', // Sesuai dengan nama file di layouts/default.vue
});

// Get runtime config
const config = useRuntimeConfig()

// Reactive state
const movies = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('movies')
const sortType = ref(null)


const fetchMovies = async (query) => {
  error.value = null
  
  try {
    const response = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&s=${query}`)
    const data = await response.json()
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found')
    }

    const detailedMovies = await Promise.all(
      data.Search.slice(0, 15).map(async (movie) => {
        const detailResponse = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&i=${movie.imdbID}`)
        return detailResponse.json()
      })
    )

    movies.value = detailedMovies
  } catch (err) {
    error.value = err.message
    movies.value = []
  } finally {
    loading.value = false
  }
}

const sortMovies = (type) => {
  sortType.value = type === sortType.value ? null : type
}

const sortedMovies = computed(() => {
  let sortedList = [...movies.value]
  
  if (sortType.value === 'year') {
    sortedList.sort((a, b) => parseInt(b.Year) - parseInt(a.Year))
  } else if (sortType.value === 'popularity') {
    // Note: OMDb doesn't provide popularity, so we'll use IMDb Rating as a proxy
    sortedList.sort((a, b) => parseFloat(b.imdbRating || 0) - parseFloat(a.imdbRating || 0))
  }
  
  return sortedList
})

onMounted(() => {
  fetchMovies('movies')
})
</script>