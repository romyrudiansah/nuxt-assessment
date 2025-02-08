<template>
  <div class="movie-swiper-container relative min-h-[533px]">
    <div v-show="loading" class="absolute flex justify-center items-center h-full w-full z-1">
      <div class="loader"></div>
    </div>
    
    <div v-if="error" class="text-center text-xl text-red-500 py-10">
      {{ error }}
    </div>
    
    <swiper
      v-else
      :modules="modules"
      :slidesPerView="3"
      :spaceBetween="56"
      :navigation="false"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <swiper-slide v-for="movie in movies" :key="movie.imdbID">
        <NuxtLink
          :to="`/movie/${movie.imdbID}`" class="movie-slide">
          <div class="h-[375px] left-[-15px] absolute top-[-15px] w-[240px]">
            <img class="block h-full object-center object-cover w-full"
              :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/375x240'" 
              :alt="movie.Title" 
            />
          </div>
          <div class="text-white bg-black h-[320px] pt-[20px] pl-[245px] pr-[20px]">
            <div class="flex align-center gap-1 font-bold text-sm mb-2"><img src="~/assets/images/icon-star.svg" alt=""> {{ movie.imdbRating || 'N/A' }}</div>
            <h3 class="text-lg/[1.2] font-bold mb-4">{{ movie.Title }}</h3>
            <span class="block text-xs mb-2">{{ movie.Year }} • {{ movie.Genre }}</span>
            <p class="text-sm line-clamp-3">{{ movie.Plot }}</p>
          </div>
        </NuxtLink>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// Get runtime config
const config = useRuntimeConfig()

// Reactive state
const movies = ref([])
const loading = ref(true)
const error = ref(null)

// Swiper modules
const modules = [Navigation, Pagination]

// Fetch latest movies
const fetchLatestMovies = async () => {
  loading.value = true
  error.value = null

  try {
    // Fetch recent movies (using current year)
    const currentYear = new Date().getFullYear()
    const response = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&s=movie&y=${currentYear}&type=movie`)
    const data = await response.json()

    if (data.Response === 'False') {
      throw new Error(data.Error || 'No movies found')
    }

    // Fetch detailed information for each movie
    const detailedMovies = await Promise.all(
      data.Search.slice(0, 10).map(async (movie) => {
        const detailResponse = await fetch(`${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&i=${movie.imdbID}&plot=short`)
        return detailResponse.json()
      })
    )

    // Filter out movies with 'N/A' posters and limit to 6
    movies.value = detailedMovies
      .filter(movie => movie.Poster !== 'N/A')
      .slice(0, 6)
  } catch (err) {
    error.value = err.message
    movies.value = []
  } finally {
    loading.value = false
  }
}

// Swiper handlers
const onSwiper = (swiper) => {
  console.log('Swiper initialized', swiper)
}

const onSlideChange = () => {
  console.log('Slide changed')
}

// Fetch movies on component mount
onMounted(() => {
  fetchLatestMovies()
})
</script>