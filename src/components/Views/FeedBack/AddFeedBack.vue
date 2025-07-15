<template>
  <div class="barber-form-container">
    <div class="animated-container">
      <router-link to="/feedbacks"><i class="bi bi-arrow-left"></i> Back</router-link>
      <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    </div>

    <h2 class="barber-title">Add Feedback</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <div class="barber-row">

        <div class="barber-form-group">
          <label>Appointment <span class="barber-required">*</span></label>
          <select v-model="form.appointment_id" @change="autoFillBarberCustomer" required>
            <option disabled value="">-- Select Appointment --</option>
            <option v-for="appt in appointments" :key="appt.id" :value="appt.id">
              {{ appt.id }} - {{ appt.customer.name}} {{ appt.appointment_time }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Barber</label>
          <input type="text" :value="barber?.name || 'N/A'" disabled />
        </div>

        <div class="barber-form-group">
          <label>Customer</label>
          <input type="text" :value="customer?.name || 'N/A'" disabled />
        </div>

        <div class="barber-form-group">
          <label>Rating <span class="barber-required">*</span></label>
          <select v-model="form.rating" required>
            <option disabled value="">-- Select Rating --</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }} Star</option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Message</label>
          <textarea v-model="form.message" rows="3"></textarea>
        </div>

      </div>

      <button type="submit" class="barber-submit-btn">Submit Feedback</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [],
      form: {
        appointment_id: '',
        barber_id: '',
        customer_id: '',
        rating: '',
        message: ''
      },
      barber: null,
      customer: null
    };
  },
  methods: {
    async loadAppointments() {

    const res = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/appointments");
    const data = await res.json();
    this.appointments = data.data; // ✅ Correct: get only the appointment array
 
},
    async autoFillBarberCustomer() {
  const selected = this.appointments.find(appt => appt.id === this.form.appointment_id);

  if (selected) {
    this.form.barber_id = selected.barber_id;
    this.form.customer_id = selected.customer_id;

    // ✅ Use embedded objects instead of extra API calls
    this.barber = selected.barber;
    this.customer = selected.customer;
  };
},

    async submitForm() {
      try {
        const res = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/feedbacks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) throw new Error("Submission failed");

        alert("Feedback submitted successfully!");
        this.resetForm();
        this.$router.push("/feedbacks");

      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    },
    resetForm() {
      this.form = {
        appointment_id: '',
        barber_id: '',
        customer_id: '',
        rating: '',
        message: ''
      };
      this.barber = null;
      this.customer = null;
    }
  },
  mounted() {
    this.loadAppointments();
  }
};
</script>
