

<template>

  
  <div class="invoice-container" v-if="appointment">
    <div class="invoice-header">
      <h1>BarberFlow</h1>
      <div class="invoice-meta">
        <p><strong>Invoice ID:</strong> #{{ appointment.id }}</p>
        <p><strong>Date:</strong> {{ appointment.appointment_date }}</p>
      </div>
    </div>

    <div class="invoice-actions">
      <router-link to="/appoinmentlists"><i class="bi bi-arrow-left"></i> Back</router-link>
      <button @click="printPage"><i class="bi bi-printer-fill"></i> Print</button>
    </div>

    <div class="invoice-section">
      <h2>Appointment Details</h2>
      <div class="invoice-grid">
        <div><strong>Customer:</strong> {{ appointment.customer?.name }}</div>
        <div><strong>Barber:</strong> {{ appointment.barber?.name }}</div>
        <div><strong>Shift:</strong> {{ appointment.shift?.name }}</div>
        <div><strong>Time:</strong> {{ appointment.appointment_time }}</div>
        <div><strong>Status:</strong> {{ appointment.status }}</div>
      </div>
    </div>

    <div class="invoice-section">
      <h2>Services</h2>
      <ul class="service-list">
        <li v-for="(srv, index) in appointment.services" :key="index">
          <span>{{ srv.service_name }}</span>
          <span>৳{{ parseFloat(srv.service_price).toFixed(2) }}</span>
        </li>
      </ul>
    </div>

    <div class="invoice-section notes">
      <h2>Notes</h2>
      <p>{{ appointment.notes || '—' }}</p>
    </div>

    <div class="invoice-total">
      <strong>Total Amount:</strong>
      <span>৳{{ parseFloat(appointment.total_amount).toFixed(2) }}</span>
    </div>
  </div>

  <div v-else class="loading-state">
    <p>Loading appointment...</p>
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
    this.loadAppointment();
  },
  methods: {
    async loadAppointment() {
      const id = this.$route.params.id;
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/appointments/${id}`);
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Server error: ${res.status} ${res.statusText}\n${errorText}`);
        }
        const data = await res.json();
        this.appointment = data;
      }
       catch (err) {
        console.error("Error loading appointment:", err);
        alert(`Failed to load appointment data.\n${err.message}`);
      }
    },
    printPage() {
      window.print();
    },
  },
};
</script>

<style scoped>
.invoice-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 40px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, sans-serif;
  color: #333;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #2e8b57;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.invoice-header h1 {
  font-size: 2rem;
  color: #2e8b57;
}

.invoice-meta p {
  margin: 0;
  font-size: 0.95rem;
}

.invoice-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
}

.invoice-actions a,
.invoice-actions button {
  background: #2e8b57;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.invoice-section {
  margin-bottom: 25px;
}

.invoice-section h2 {
  font-size: 1.3rem;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  color: #1d3557;
}

.invoice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.invoice-grid div {
  font-size: 0.95rem;
  padding: 6px 0;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.service-list li {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px dashed #ccc;
  font-size: 1rem;
}

.notes p {
  background: #f9f9f9;
  padding: 10px;
  border-left: 4px solid #ccc;
  white-space: pre-wrap;
}

.invoice-total {
  text-align: right;
  font-size: 1.3rem;
  font-weight: bold;
  border-top: 2px solid #2e8b57;
  padding-top: 10px;
  margin-top: 20px;
}

.loading-state {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

@media print {
  .invoice-actions {
    display: none;
  }
  .invoice-container {
    box-shadow: none;
    border: none;
  }
}
</style>
