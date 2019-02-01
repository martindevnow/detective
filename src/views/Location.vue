<template>
  <div class="location">
    <location-component v-if="!  interactions.length"></location-component>
    <response-component v-if="!! interactions.length"></response-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Location from '../components/Location.vue';
import Response from '../components/Response.vue';

export default {
  data() {
    return {};
  },
  components: {
    'location-component': Location,
    'response-component': Response,
  },
  computed: {
    ...mapGetters([
      'interactions',
    ]),
  }
}
</script>