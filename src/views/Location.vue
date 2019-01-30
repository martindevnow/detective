<template>
  <div class="location">
    <location-component v-if="!  interaction"></location-component>
    <response-component v-if="!! interaction"></response-component>
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
      'interaction',
    ]),
  }
}
</script>