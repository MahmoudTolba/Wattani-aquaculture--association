<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-modal-title"
      @click.self="$emit('update:modelValue', false)"
    >
      <div
        class="w-full max-w-6xl h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2
            id="location-modal-title"
            class="text-xl sm:text-2xl font-semibold text-gray-900"
          >
            تحديد الموقع
          </h2>
          <button
            type="button"
            class="text-gray-500 hover:text-gray-700 transition p-2 rounded-lg hover:bg-gray-100"
            @click="$emit('update:modelValue', false)"
            aria-label="إغلاق"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <!-- Map Container -->
        <div class="flex-1 relative overflow-hidden">
          <div
            ref="mapContainer"
            class="w-full h-full bg-gray-100"
          ></div>
        </div>
        
        <!-- Footer with action buttons -->
        <div class="p-4 sm:p-6 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition"
            @click="$emit('update:modelValue', false)"
          >
            إلغاء
          </button>
          <button
            type="button"
            :disabled="!selectedLocation"
            class="px-5 py-2 text-sm font-semibold text-white bg-[#15c472] rounded-lg shadow hover:bg-[#12a866] transition disabled:opacity-50 disabled:cursor-not-allowed"
            @click="confirmLocation"
          >
            حفظ الموقع
          </button>
        </div>
      </div>
    </div>
    
    <!-- Location Details Dialog -->
    <Teleport to="body">
      <div
        v-if="showLocationDialog && selectedLocation"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 px-4"
        @click.self="closeLocationDialog"
      >
        <div
          class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full animate-modal-fade"
          @click.stop
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">تفاصيل الموقع</h3>
            <button
              type="button"
              class="text-gray-400 hover:text-gray-600 transition"
              @click="closeLocationDialog"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div class="space-y-3">
            <div>
              <label class="text-sm font-medium text-gray-700">خط العرض:</label>
              <p class="text-sm text-gray-900">{{ selectedLocation.lat.toFixed(6) }}</p>
            </div>
            <div>
              <label class="text-sm font-medium text-gray-700">خط الطول:</label>
              <p class="text-sm text-gray-900">{{ selectedLocation.lng.toFixed(6) }}</p>
            </div>
            <div v-if="selectedLocation.address">
              <label class="text-sm font-medium text-gray-700">العنوان:</label>
              <p class="text-sm text-gray-900">{{ selectedLocation.address }}</p>
            </div>
          </div>
          
          <div class="mt-6 flex gap-3">
            <button
              type="button"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              @click="closeLocationDialog"
            >
              إلغاء
            </button>
            <button
              type="button"
              class="flex-1 px-4 py-2 bg-[#15c472] text-white rounded-lg text-sm font-medium hover:bg-[#12a866] transition"
              @click="confirmLocation"
            >
              تأكيد
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";

let L = null;

// Load Leaflet only on client side
const loadLeaflet = async () => {
  if (process.client && !L) {
    // Dynamically import Leaflet
    const leaflet = await import("leaflet");
    L = leaflet.default;
    
    // Import CSS
    await import("leaflet/dist/leaflet.css");
    
    // Fix for Leaflet default icon issue
    try {
      // eslint-disable-next-line
      delete L.Icon.Default.prototype._getIconUrl;
    } catch (e) {
      // Ignore if deletion fails
    }
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }
  return L;
};

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "confirm"]);

const mapContainer = ref(null);
const map = ref(null);
const selectedLocation = ref(null);
const showLocationDialog = ref(false);
const selectedMarker = ref(null);
const existingMarkers = ref([]);

// Default center (Riyadh, Saudi Arabia)
const defaultCenter = { lat: 24.7136, lng: 46.6753 };

// Existing pins on the map (like in the image - 9 pins)
const existingPins = ref([
  { lat: 24.75, lng: 46.60, name: "موقع 1" },
  { lat: 24.75, lng: 46.68, name: "موقع 2" },
  { lat: 24.75, lng: 46.76, name: "موقع 3" },
  { lat: 24.71, lng: 46.60, name: "موقع 4" },
  { lat: 24.71, lng: 46.68, name: "موقع 5" },
  { lat: 24.71, lng: 46.76, name: "موقع 6" },
  { lat: 24.67, lng: 46.60, name: "موقع 7" },
  { lat: 24.67, lng: 46.68, name: "موقع 8" },
  { lat: 24.67, lng: 46.76, name: "موقع 9" },
]);

// Create custom icon for existing pins (teal with yellow dot)
const createTealIcon = () => {
  if (!L) return null;
  return L.divIcon({
    className: "custom-pin-teal",
    html: `
      <div style="position: relative; width: 32px; height: 32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#14b8a6" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div style="position: absolute; bottom: 0; left: 50%; transform: translate(-50%, 50%); width: 8px; height: 8px; background: #facc15; border: 1px solid #eab308; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

// Create custom icon for selected pin (red with yellow dot)
const createRedIcon = () => {
  if (!L) return null;
  return L.divIcon({
    className: "custom-pin-red",
    html: `
      <div style="position: relative; width: 32px; height: 32px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#dc2626" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <div style="position: absolute; bottom: 0; left: 50%; transform: translate(-50%, 50%); width: 8px; height: 8px; background: #facc15; border: 1px solid #eab308; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const initializeMap = async () => {
  if (!mapContainer.value || map.value) return;
  
  // Load Leaflet first
  const Leaflet = await loadLeaflet();
  if (!Leaflet) return;
  
  await nextTick();
  
  // Initialize Leaflet map
  map.value = Leaflet.map(mapContainer.value, {
    center: [defaultCenter.lat, defaultCenter.lng],
    zoom: 12,
    zoomControl: true,
  });

  // Add OpenStreetMap tile layer
  Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map.value);

  // Add existing pins as markers
  existingPins.value.forEach((pin) => {
    const marker = Leaflet.marker([pin.lat, pin.lng], {
      icon: createTealIcon(),
    }).addTo(map.value);
    
    marker.on("click", () => {
      selectExistingPin(pin);
    });
    
    existingMarkers.value.push(marker);
  });

  // Handle map clicks
  map.value.on("click", async (e) => {
    const { lat, lng } = e.latlng;
    
    // Remove previous selected marker if exists
    if (selectedMarker.value) {
      map.value.removeLayer(selectedMarker.value);
    }
    
    // Add new marker at clicked location
    selectedMarker.value = Leaflet.marker([lat, lng], {
      icon: createRedIcon(),
    }).addTo(map.value);
    
    selectedLocation.value = {
      lat,
      lng,
      address: null, // Will be filled by geocoding
    };
    
    // Show location dialog immediately
    showLocationDialog.value = true;
    
    // Try to get address (reverse geocoding) in background
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=ar`,
        {
          headers: {
            'User-Agent': 'Wattani Aquaculture Association'
          }
        }
      );
      const data = await response.json();
      if (data.display_name && selectedLocation.value) {
        selectedLocation.value.address = data.display_name;
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  });
};

const selectExistingPin = (pin) => {
  // Remove previous selected marker if exists
  if (selectedMarker.value) {
    map.value.removeLayer(selectedMarker.value);
  }
  
  // Add marker at selected pin location
  if (!L) return;
  selectedMarker.value = L.marker([pin.lat, pin.lng], {
    icon: createRedIcon(),
  }).addTo(map.value);
  
  // Center map on selected pin
  map.value.setView([pin.lat, pin.lng], map.value.getZoom());
  
  selectedLocation.value = {
    lat: pin.lat,
    lng: pin.lng,
    address: pin.name,
  };
  
  showLocationDialog.value = true;
};

const destroyMap = () => {
  if (map.value) {
    map.value.remove();
    map.value = null;
    selectedMarker.value = null;
    existingMarkers.value = [];
  }
};

const confirmLocation = () => {
  if (selectedLocation.value) {
    emit("confirm", selectedLocation.value);
    emit("update:modelValue", false);
    // Reset selection
    selectedLocation.value = null;
    showLocationDialog.value = false;
    if (selectedMarker.value) {
      map.value.removeLayer(selectedMarker.value);
      selectedMarker.value = null;
    }
  }
};

const closeLocationDialog = () => {
  showLocationDialog.value = false;
  selectedLocation.value = null;
  if (selectedMarker.value) {
    map.value.removeLayer(selectedMarker.value);
    selectedMarker.value = null;
  }
};

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (process.client && typeof document !== "undefined") {
      document.body.style.overflow = isOpen ? "hidden" : "";
    }
    
    if (isOpen) {
      // Initialize map when modal opens
      await nextTick();
      initializeMap();
      // Reset selection when modal opens
      selectedLocation.value = null;
      showLocationDialog.value = false;
    } else {
      // Destroy map when modal closes
      destroyMap();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  destroyMap();
});
</script>

