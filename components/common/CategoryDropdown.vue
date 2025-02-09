<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger -->
    <button @click="toggleDropdown" class="flex items-center cursor-pointer space-x-1 text-gray-300 hover:text-white">
      <img src="~/assets/images/icon-categories.svg" alt=""> 
      <span>CATEGORIES</span>
    </button>

    <!-- Dropdown Menu -->
    <div v-if="isOpen" class="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-10">
      <div class="py-2">
        <div 
          v-for="category in categories" 
          :key="category"
          @click="selectCategory(category)"
          class="block px-4 py-2 text-sm text-gray-800 hover:text-gray-500 cursor-pointer uppercase"
        >
          {{ category }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showDropdown = ref(false)

const categories = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime',
  'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror'
]

const isOpen = ref(false)
const dropdownRef = ref(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectCategory = (category) => {
  isOpen.value = false // Close dropdown after selection
  router.push({ path: '/movie', query: { genre: category } })
}

// Function to close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside)
})
</script>