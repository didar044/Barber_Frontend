<template>
  <div class="animated-container">
    <router-link to="/customerlist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <button @click="printPage" class="action-button view-button"><i class="bi bi-printer-fill"></i> Print Profile</button>
  </div>

  <div class="profile-container">
    <div v-if="!customer" class="loading">
      <div class="loader"></div>
      <p>Loading customer details...</p>
    </div>

    <div v-else class="profile-card">
      <div class="photo-section">
        <img :src="photoUrl" alt="Customer Photo" class="profile-photo" />
        <h2 class="barber-name">{{ customer.name }}</h2>
        <p class="shift-name"><i class="bi bi-person-lines-fill"></i> Customer ID: {{ customer.id }}</p>
      </div>

      <div class="info-section">
        <h3>Customer Information</h3>
        <div class="info-grid">
          <div class="info-item"><strong>Phone:</strong> {{ customer.phone }}</div>
          <div class="info-item"><strong>Email:</strong> {{ customer.email || 'N/A' }}</div>
          <div class="info-item"><strong>Total Visits:</strong> {{ customer.total_visits }}</div>
          <div class="info-item"><strong>Last Visit:</strong> {{ formatDate(customer.last_visit) }}</div>
          <div class="info-item full-width"><strong>Address:</strong> {{ customer.address }}</div>
          <div class="info-item full-width"><strong>Notes:</strong> {{ customer.notes || 'None' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShowCustomer",
  data() {
    return {
      customer: null,
    };
  },
  methods: {
    printPage() {
      window.print();
    },
    formatDate(dateStr) {
      if (!dateStr) return 'N/A';
      const date = new Date(dateStr);
      return date.toLocaleString(); 
    },
  },
  computed: {
    photoUrl() {
      return this.customer?.photo
        ? `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${this.customer.photo}`
        : "https://via.placeholder.com/150";
    },
  },
  mounted() {
    const id = this.$route?.params?.id || 1;
    fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.customer = data.data ?? data;
      })
      .catch((error) => {
        console.error("Failed to load customer data:", error);
      });
  },
};
</script>
