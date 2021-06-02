<template>
  <div class="location">
    <location-status></location-status>
    <div class="location-body">
      <scanner></scanner>
      <fake-scanner></fake-scanner>
      <location-actions></location-actions>
    </div>
  </div>
</template>

<script>
import FakeScanner from '../components/FakeScanner.vue';
import LocationActions from '../components/LocationActions.vue';
import LocationStatus from '../components/LocationStatus.vue';
import Scanner from '../components/Scanner.vue';

export default {
  components: {
    FakeScanner,
    LocationStatus,
    LocationActions,
    Scanner,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
}
</script>

<style>
button {
  padding: 15px;
  background-color: lightgray;
  color: darkslategrey;
}
</style>