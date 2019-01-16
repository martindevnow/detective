<template>
  <div id="surveyorPano"></div>
</template>

<style>
  #surveyorPano {
    width: 100vw;
    height: 100vh;
  }
</style>

<script>
import {PanoViewer} from "@egjs/view360";

export default {
  data() {
    return {
      viewer: null,
    }
  },
  created() {
    window.addEventListener("resize", this.onWindowResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.onWindowResize);
  },
  mounted() {
    const panoViewer = new PanoViewer(
      document.getElementById("surveyorPano"),
      {
        image: "/images/pano3.jpg",
        gyroMode: "VR",
      }
    );
    this.viewer = panoViewer;

    console.log(panoViewer.getImage())
  },
  methods: {
    onWindowResize(e) {
      this.viewer.updateViewportDimensions({width: e.target.innerWidth, height: e.target.innerHeight})
    }
  }
}

</script>