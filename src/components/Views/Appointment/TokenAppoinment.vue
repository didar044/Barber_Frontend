<template>
    <div class="animated-container">
    <router-link to="/appoinmentlists"><i class="bi bi-arrow-left"></i> Back</router-link>
    <button @click="printPage" class="action-button view-button"><i class="bi bi-printer-fill"></i> Print Profile </button> 
  </div>
  <div class="token-wrapper" v-if="appointment">
    <h2 class="token-header">Appointment Token</h2>
    <div class="token-id">Token #{{ appointment.id }}</div>

    <div class="token-info">
      <p><strong>Customer:</strong> {{ appointment.customer?.name || 'N/A' }}</p>
      <p><strong>Barber:</strong> {{ appointment.barber?.name || 'N/A' }}</p>
      <p><strong>Date:</strong> {{ formatDate(appointment.appointment_date) }}</p>
      <p>
        <strong>Status:</strong> 
        <span :class="['status-label', appointment.status]">
          {{ appointment.status || 'pending' }}
        </span>
      </p>
      <p><strong>Note:</strong> {{ appointment.notes || 'N/A' }}</p>
    </div>

    <div class="token-services">
      <h3>Services</h3>
      <ul>
        <li v-for="service in appointment.services || []" :key="service.id">
          {{ service.service_name || 'Service' }} - ৳{{ Number(service.service_price || 0).toFixed(2) }}
        </li>
      </ul>
    </div>

    <div class="token-total">
      <strong>Total Amount:</strong> ৳{{ Number(appointment.total_amount || 0).toFixed(2) }}
    </div>
  </div>

  <div v-else class="token-loading">
    Loading appointment token...
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointment: null,
    };
  },
  mounted() {
    const id = this.$route.params.id;

    if (!id) {
      console.error("No appointment ID found in route.");
      alert("Invalid appointment ID.");
      return;
    }

    this.fetchAppointment(id);
  },
  methods: {
    async fetchAppointment(id) {
      try {
        const res = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/appointments/${id}`);

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server error: ${res.status} ${res.statusText}\n${errorText}`);
        }

        const data = await res.json();
        this.appointment = data;
        console.log("Fetched appointment:", data);
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
        alert("Failed to load appointment. " + error.message);
      }
    },

    printPage() {
      window.print();
    },

    formatDate(dateStr) {
      if (!dateStr) return "N/A";
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>




<style scoped>
.token-wrapper {
  max-width: 380px;
  margin: 30px auto;
  padding: 20px 25px;
  border: 2px dashed #000;
  border-radius: 15px;
  background: #fff;
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.token-header {
  text-align: center;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: 2px;
  color: #000;
  margin-bottom: 0.5rem;
  user-select: none;
}

.token-id {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #000;
  user-select: text;
  letter-spacing: 1.5px;
  border-bottom: 1px dotted #000;
  padding-bottom: 0.5rem;
}

.token-info p {
  margin: 0.25rem 0;
  font-size: 1rem;
  user-select: text;
  color: #000;
}

.status-label {
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 700;
  text-transform: capitalize;
  display: inline-block;
  min-width: 85px;
  text-align: center;
  font-size: 0.9rem;
  user-select: none;
  background-color: #000;
  color: #fff;
}

.token-services {
  margin-top: 20px;
}

.token-services h3 {
  margin-bottom: 0.6rem;
  font-weight: 700;
  color: #000;
  user-select: none;
  border-bottom: 1px solid #000;
  padding-bottom: 4px;
}

.token-services ul {
  padding-left: 20px;
  margin: 0;
  list-style: disc;
  user-select: text;
}

.token-services li {
  margin-bottom: 4px;
  font-size: 1rem;
  color: #000;
}

.token-total {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: 900;
  color: #000;
  user-select: text;
  text-align: right;
}

.token-loading {
  max-width: 380px;
  margin: 30px auto;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  user-select: none;
}
</style>

