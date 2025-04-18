<script setup>
import { ref, watch, onMounted } from "vue";
import { mapStyles } from "../../utils/constants";
import { loadGoogleMapsScript } from "../../services";

// Define props
const props = defineProps({
  location: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 680,
  },
  mapCustomStyles: {
    type: Boolean,
    default: false,
  },
  iconUrl: {
    type: String,
    required: true,
  },
});

// Reactive state
const map = ref(null);
const uniqueId = ref(`google-map-${Math.random().toString(36).substr(2, 9)}`);
const mapStyle = ref({
  width: "100%",
  height: `${props.height}px`,
  position: "relative",
});

// Initialize the map
const initializeMap = async () => {
  await loadGoogleMapsScript();

  const mapDiv = document.getElementById(uniqueId.value);
  if (mapDiv) {
    const newMap = new google.maps.Map(mapDiv, {
      center: props.location,
      zoom: 14,
      disableDefaultUI: true,
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      scaleControl: false,
      zoomControl: false,
      clickableIcons: false,
      disableDoubleClickZoom: false,
      styles: props.mapCustomStyles ? mapStyles : null,
    });

    map.value = newMap;

    // Custom Marker class
    class CustomMarker extends google.maps.OverlayView {
      constructor(map, position) {
        super();
        this.map = map;
        this.position = position;
        this.div = null;
        this.setMap(map);
      }

      onAdd() {
        const markerDiv = document.createElement("div");
        markerDiv.style.position = "absolute";
        markerDiv.style.width = "110px";
        markerDiv.style.height = "110px";
        markerDiv.style.backgroundImage = `url('${getImagePath(
          "location-marker.svg"
        )}')`;
        markerDiv.style.backgroundSize = "contain";
        markerDiv.style.backgroundPosition = "center";
        markerDiv.style.backgroundRepeat = "no-repeat";
        markerDiv.style.pointerEvents = "none";

        const logoImg = document.createElement("img");
        logoImg.src = getImagePath("location-marker.svg");
        logoImg.style.position = "absolute";
        logoImg.style.display = "none";
        logoImg.style.top = "24%";
        logoImg.style.left = "50%";
        logoImg.style.transform = "translate(-50%, -50%)";
        logoImg.style.width = "45px";
        logoImg.style.height = "45px";
        logoImg.style.borderRadius = "50%";
        markerDiv.appendChild(logoImg);

        this.div = markerDiv;
        const panes = this.getPanes();
        panes.overlayLayer.appendChild(markerDiv);
      }

      draw() {
        if (!this.div) return;
        const overlayProjection = this.getProjection();
        if (!overlayProjection) return;

        const point = overlayProjection.fromLatLngToDivPixel(this.position);
        if (point) {
          this.div.style.left = `${point.x - this.div.offsetWidth / 2}px`;
          this.div.style.top = `${point.y - this.div.offsetHeight / 2}px`;
        }
      }

      onRemove() {
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      }
    }

    const marker = new CustomMarker(newMap, props.location);

    const updateMarker = () => {
      marker.draw();
    };

    google.maps.event.addListenerOnce(
      newMap,
      "projection_changed",
      updateMarker
    );
    google.maps.event.addListener(newMap, "zoom_changed", updateMarker);
    google.maps.event.addListener(newMap, "idle", updateMarker);
  } else {
    console.error("Map element not found!");
  }
};

const getImagePath = (imageName) => {
  return new URL(`../../assets/images2/${imageName}`, import.meta.url).href;
};

// Initialize map when component is mounted
onMounted(() => {
  initializeMap();
});

// Watch for changes in location and iconUrl
watch(
  () => props.location,
  () => {
    if (map.value) {
      map.value.setCenter(props.location);
    }
  }
);

watch(
  () => props.iconUrl,
  () => {
    if (map.value) {
      initializeMap();
    }
  }
);
</script>

<template>
  <div :id="uniqueId" :style="mapStyle"></div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
