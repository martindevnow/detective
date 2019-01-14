<template>
  <div id="viewer"></div>
</template>

<style>
  #viewer {
    width: 100vw;
    height: 50vh;
  }
</style>

<script>
import PhotoSphereViewer from 'photo-sphere-viewer';

export default {
  data() {
    return {
      viewer: null,
    }
  },
  mounted() {
    let viewer = new PhotoSphereViewer({
      container: 'viewer',
      // panorama: '/usr/src/app/src/assets/pano1.jpg'
      panorama: 'http://localhost:8085/pano2.png',
      navbar: false,
    });
    this.viewer = viewer;
  }
}

</script>