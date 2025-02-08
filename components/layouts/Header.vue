<template>
  <div>
    <header class="bg-white/[0.05] py-3 relative">
      <!-- Logo -->
      <div class="flex items-center max-w-screen-xl mx-auto gap-12">
        <div class="flex items-center flex-none">
          <NuxtLink 
            :to="'/'"
          >
            <img src="~/assets/images/logo.svg" alt="Moovie Time Logo" class="h-8" />
          </NuxtLink>
        </div>
  
        <!-- Search Bar -->
        <div class="relative flex-auto">
           <input
            v-model="searchQuery"
            @input="handleSearch"
            @focus="showDropdown = true"
            type="text"
            placeholder="Find movie"
            class="bg-gray-800 text-white w-full py-2 px-10 rounded-md focus:outline-none"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <img src="~/assets/images/icon-movie.svg" alt="">
          </span>
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <img src="~/assets/images/icon-search.svg" alt="">
          </button>
          <!-- Autocomplete Dropdown -->
          <div
            v-if="showDropdown && results.length > 0"
            class="absolute z-50 w-full mt-1 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <div 
              v-for="result in results"
              :key="result.imdbID"
              @click="selectMovie(result)"
              class="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            >
              <div class="flex items-center space-x-3">
                <img 
                  :src="result.Poster !== 'N/A' ? result.Poster : 'https://placehold.co/600x400'"
                  class="w-10 h-14 object-cover rounded"
                  :alt="result.Title"
                />
                <div>
                  <div class="text-white">{{ result.Title }}</div>
                  <div class="text-gray-400 text-sm">{{ result.Year }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Backdrop for closing dropdown -->
          <!-- <div
            v-if="showDropdown"
            @click="showDropdown = false"
            class="fixed inset-0 z-40"
          ></div> -->
        </div>
        <!-- Navigation Links -->
        <nav class="flex items-center space-x-6 flex-1">
          <CommonCategoryDropdown @select="handleCategorySelect" />
          <NuxtLink 
            :to="'/movie'"
            class="text-gray-300 hover:text-white uppercase"
          >
            MOVIES
          </NuxtLink>
          <a href="#" class="text-gray-300 hover:text-white uppercase">TV SHOWS</a>
          <a href="#" class="text-gray-300 hover:text-white uppercase">LOGIN</a>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Get runtime config
const config = useRuntimeConfig()

const searchQuery = ref('')
const results = ref([])
const showDropdown = ref(false)
const loading = ref(false)

// Debounce function
const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Search function
const searchMovies = async (query) => {
  if (!query.trim()) {
    results.value = []
    return
  }

  loading.value = true
  try {
    const response = await fetch(
      `${config.public.omdbApiBase}?apikey=${config.public.omdbApiKey}&s=${query}`
    )
    const data = await response.json()
    
    if (data.Response === 'True') {
      results.value = data.Search.slice(0, 5) // Limit to 5 results
    } else {
      results.value = []
    }
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

// Debounced search handler
const debouncedSearch = debounce(searchMovies, 300)

// Handle input changes
const handleSearch = () => {
  showDropdown.value = true
  debouncedSearch(searchQuery.value)
}

// Select movie from dropdown
const selectMovie = (movie) => {
  searchQuery.value = movie.Title
  showDropdown.value = false
  // Emit selected movie for parent component
  emit('select', movie)
}

// Define emits
const emit = defineEmits(['select'])

// Close dropdown when clicking outside
watch(() => showDropdown.value, (newValue) => {
  if (!newValue) {
    results.value = []
  }
})

const handleCategorySelect = (category) => {
  // Handle category selection here
  console.log('Selected category:', category)
  // You can emit this to parent or handle navigation/filtering
}
</script>