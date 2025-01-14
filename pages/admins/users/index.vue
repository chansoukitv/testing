<template>
  <div>
    <Tables />
  </div>
</template>

<script>
import Tables from '@/components/Tables.vue'

export default {
  layout: 'admin', // Ensure the 'admin' layout exists in the layouts folder

  components: {
    Tables, // Ensure the Tables component exists and is properly defined
  },
}
</script>
