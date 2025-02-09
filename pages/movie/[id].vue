<template>
  <div>
    <div class="bg-white text-white relative">
      <div v-show="loading" class="absolute flex justify-center items-center h-full w-full z-1 bg-black/[.8]">
        <div class="loader"></div>
      </div>
      <!-- Hero Section -->
      <div class="relative h-[400px] z-0">
        <img 
          :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/800x400'" 
          :alt="movie.Title"
          class="relative inset-0 w-full h-full object-cover"
        />
        <div class="absolute top-0 bottom-0 left-0 right-0 bg-black/[.6] h-full w-full"></div>
        <div class="absolute bottom-0 left-0 right-0 bg-black/[.5] h-[80px] "></div>
        
        <div class="relative z-1 flex gap-8 top-[-216px] max-w-screen-xl container mx-auto">
          <img 
            :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/200x300'"
            class="w-44 shadow-lg object-cover" alt=""
          />
          <div class="pt-[5px]">
            <div class="text-white h-[130px]">
              <span class="text-whitetext-lg">{{ movie.Year }}</span>
              <h1 class="text-3xl font-bold mb-2 max-w-[70%]">{{ movie.Title }}</h1>
              <p class="text-sm">{{ movie.Genre }}</p>
            </div>
            <div class="text-white flex items-center gap-[30px] mt-[20px]">
              <div class="flex items-center gap-2">
              <img src="~/assets/images/icon-star.svg" alt="">
                <p class="text-lg font-semibold">{{ movie.imdbRating || 'N/A' }}</p>
              </div>
              <div class="flex group gap-[30px]">
                <div class="border-r border-white/[.3] pr-[30px]">
                  <span class="text-xs text-white/[.5] mb-[3px] block uppercase">User SCore</span>
                  <span class="text-xs block font-semibold">{{ movie.imdbVotes }} votes</span>
                </div>
                <div class="border-r border-white/[.3] pr-[30px]">
                  <span class="text-xs text-white/[.5] mb-[3px] block uppercase">Released</span>
                  <span class="text-xs block font-semibold">{{ movie.Released }}</span>
                </div>
                <div class="border-r border-white/[.3] pr-[30px]">
                  <span class="text-xs text-white/[.5] mb-[3px] block uppercase">language</span>
                  <span class="text-xs block font-semibold">{{ movie.Language }}</span>
                </div>
                <div class="border-r border-white/[.3] pr-[30px]">
                  <span class="text-xs text-white/[.5] mb-[3px] block uppercase">Earned</span>
                  <span class="text-xs block font-semibold">{{ movie.BoxOffice }}</span>
                </div>
                <div class="border-r border-white/[.3] pr-[30px] group-last:border-0">
                  <span class="text-xs text-white/[.5] mb-[3px] block uppercase">production</span>
                  <span class="text-xs block font-semibold">{{ movie.Production }}</span>
                </div>
              </div>
            </div>
            <div class="text-black mt-[50px]">
              <h2 class="text-sm font-semibold text-red-400">OVERVIEW</h2>
              <p class="text-sm mt-2 max-w-[70%]">{{ movie.Plot }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div class=" max-w-screen-xl container mx-auto mt-[157px] py-10">
        <h2 class="text-xl font-semibold text-red-400">REVIEWS</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 group">
          <div class="bg-white rounded-lg group-hover:shadow-sm shadow-black/[.3] p-5 text-black">
            <div class="flex items-center justify-between mb-8">
              <div class="flex align-center gap-4">
                <img src="https://placehold.co/49x48" alt="" class="rounded-full">
                <div>
                  <h3 class="font-semibold">SWITCH.</h3>
                  <span class="text-gray-400 text-xs">December 18, 2020</span>
                </div>
              </div>
              <span class="bg-gray-200 text-black flex px-2 py-1 rounded-xs text-sm font-bold items-start">
                <img src="~/assets/images/icon-star.svg" alt="" class="mt-1">
                <span class="text-3xl">7.0</span>
              </span>
            </div>
            <p class="text-sm mt-3">
              It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore, but it does come across as a bit of a mess, even though the action sequences are breathtaking. If you're a fan of the original film, you'll be more willing to take the ride, but for those more indifferent, it may be a bit of a blander sit. If you can and are planning to watch it, the theatrical experience is the way to go - there is nothing like seeing these stunning sets, fun action scenes and hearing Zimmer's jaw-dropping score like on the big screen. - Chris dos Santos... 
              <NuxtLink to="#" class="text-blue-400">read the rest.</NuxtLink>
            </p>
          </div>
          <div class="bg-white rounded-lg group-hover:shadow-sm shadow-black/[.3] p-5 text-black">
            <div class="flex items-center justify-between mb-8">
              <div class="flex align-center gap-4">
                <img src="https://placehold.co/49x48" alt="" class="rounded-full">
                <div>
                  <h3 class="font-semibold">msbreviews</h3>
                  <span class="text-gray-400 text-xs">December 18, 2020</span>
                </div>
              </div>
              <span class="bg-gray-200 text-black flex px-2 py-1 rounded-xs text-sm font-bold items-start">
                <img src="~/assets/images/icon-star.svg" alt="" class="mt-1">
                <span class="text-3xl">8.0</span>
              </span>
            </div>
            <p class="text-sm mt-3">
              If you enjoy reading my Spoiler-Free reviews, please follow my blog @ https://www.msbreviews.com <br>
              The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only 
              <NuxtLink to="#" class="text-blue-400">read more</NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="py-[50px] relative max-w-screen-xl container mx-auto">
      <div v-if="loading" class="flex justify-center items-center h-32">
        <div class="loader"></div>
      </div>
          
      <div v-else-if="error" class="text-red-500 text-center text-xl">{{ error }}</div>
      
      <div v-else>
        <h4 class="text-white text-lg uppercase mb-[37px]">Recomendation</h4>
        <div class="grid grid-cols-5 gap-6">
        <div 
          v-for="movie in randomMovies" 
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
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

// Get runtime config
const config = useRuntimeConfig()

// Get route params
const route = useRoute()
const movie = ref({})

const loading = ref(true)

// Fetch movie details
onMounted(async () => {
  const res = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&i=${route.params.id}`)
  movie.value = await res.json()
  loading.value = false
})

// Reactive state
const movies = ref([])
const error = ref(null)
const searchQuery = ref('movies')
const randomMovies = ref([])

// Fetch movies list
const fetchMovies = async (query) => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&s=${query}&type=movie`)
    const data = await response.json()
    
    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found')
    }

    const detailedMovies = await Promise.all(
      data.Search.slice(0, 10).map(async (movie) => {
        const detailResponse = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&i=${movie.imdbID}&plot=short`)
        return detailResponse.json()
      })
    )

    movies.value = detailedMovies
    getRandomMovies(detailedMovies) // Generate random movies
  } catch (err) {
    error.value = err.message
    movies.value = []
  } finally {
    loading.value = false
  }
}

// Get random movies
const getRandomMovies = (moviesList) => {
  const shuffled = [...moviesList].sort(() => 0.5 - Math.random()) // Shuffle array
  randomMovies.value = shuffled.slice(0, 5) // Pick 5 random movies
}

onMounted(() => {
  fetchMovies('movies')
})
</script>

<style lang="scss">
header {
  background: transparent;
  left: 0;
  position: absolute;
  right: 0;
  top:0;
  z-index: 99;
  input {
    background: rgba(0, 0, 0, .13);
  }
}
</style>