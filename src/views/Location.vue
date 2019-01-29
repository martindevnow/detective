<template>
  <div class="location">
    <location-component v-if="!  question"></location-component>
    <response-component v-if="!! question"></response-component>
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
      'question',
    ]),
  }
}
</script>