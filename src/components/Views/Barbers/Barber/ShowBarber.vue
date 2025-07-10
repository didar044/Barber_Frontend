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

<style scoped>
.profile-container {

  margin: 40px auto;
  padding: 20px;
  font-family: 'Inter', sans-serif;
  background-color: #f7f8fc;
}

/* CARD LAYOUT */
.profile-card {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
  transition: all 0.3s ease;
  flex-wrap: wrap;
}

/* LEFT PHOTO SECTION */
.photo-section {
  flex: 0 0 320px;
  background: linear-gradient(135deg, #4c83ff, #6ec6ff);
  text-align: center;
  color: #fff;
  padding: 40px 20px;
}

.profile-photo {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
}

.barber-name {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
}

.shift-name {
  font-size: 14px;
  opacity: 0.9;
}

/* RIGHT INFO SECTION */
.info-section {
  flex: 1;
  padding: 40px;
}

.info-section h3 {
  font-size: 22px;
  margin-bottom: 25px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  color: #333;
}

.info-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info-item {
  width: calc(50% - 10px);
  font-size: 16px;
  color: #444;
  line-height: 1.6;
}

.full-width {
  width: 100%;
}

/* LOADING */
.loading {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #888;
}

.loader {
  border: 5px solid #e0e0e0;
  border-top: 5px solid #4c83ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* -------------------
   MEDIA QUERIES BELOW
-------------------- */

/* For tablets (below 768px) */
@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
  }

  .photo-section {
    flex: 1 1 100%;
    padding: 30px 15px;
  }

  .info-section {
    padding: 30px 20px;
  }

  .info-item {
    width: 100%;
  }
}

/* For phones (below 480px) */
@media (max-width: 480px) {
  .barber-name {
    font-size: 18px;
  }

  .profile-photo {
    width: 120px;
    height: 120px;
  }

  .info-section h3 {
    font-size: 20px;
  }

  .info-item {
    font-size: 15px;
  }

  .info-section {
    padding: 20px 15px;
  }

  .profile-container {
    padding: 15px;
  }
}
</style>

