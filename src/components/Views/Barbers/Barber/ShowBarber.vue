<template>
  <div class="animated-container">
    <router-link to="/barberlist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <button @click="printPage" class="action-button view-button"><i class="bi bi-printer-fill"></i> Print Profile </button> 
  </div>
  <div class="profile-container">
    <div v-if="!barber" class="loading">
      <div class="loader"></div>
      <p>Loading barber details...</p>
    </div>

    <div v-else class="profile-card">
      <div class="photo-section">
        <img :src="photoUrl" alt="Barber Photo" class="profile-photo" />
        <h2 class="barber-name">{{ barber.name }}</h2>
        <p class="shift-name"><i class="bi bi-clock-fill"></i> Shift: {{ barber.shift?.name || 'N/A' }}</p>
      </div>

      <div class="info-section">
        <h3>Barber Information</h3>
        <div class="info-grid">
          <div class="info-item"><strong>Father:</strong> {{ barber.father_name }}</div>
          <div class="info-item"><strong>Mother:</strong> {{ barber.mother_name }}</div>
          <div class="info-item"><strong>Gender:</strong> {{ barber.gender }}</div>
          <div class="info-item"><strong>Religion:</strong> {{ barber.religion }}</div>
          <div class="info-item"><strong>Blood Group:</strong> {{ barber.blood_roupe || 'N/A' }}</div>
          <div class="info-item"><strong>Mobile:</strong> {{ barber.mobile_number }}</div>
          <div class="info-item"><strong>Email:</strong> {{ barber.email || 'N/A' }}</div>
          <div class="info-item"><strong>NID:</strong> {{ barber.nid_num }}</div>
          <div class="info-item"><strong>Experience:</strong> {{ barber.exprence_years }} year(s)</div>
          <div class="info-item"><strong>Hire Date:</strong> {{ barber.hire_date }}</div>
          <div class="info-item full-width"><strong>Address:</strong> {{ barber.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBarber",
  data() {
    return {
      barber: null,
    };
  },
  methods: {
  printPage() {
    window.print();
  },
},

  computed: {
    photoUrl() {
      return this.barber?.photo
        ? `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${this.barber.photo}`
        : "https://via.placeholder.com/150";
    },
  },
  mounted() {
    const id = this.$route?.params?.id || 10;
    fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.barber = data.data ?? data;
      })
      .catch((error) => {
        console.error("Failed to load barber data:", error);
      });
  },
};
</script>



