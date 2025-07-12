<template>
<div class="animated-container">
  <router-link to="/addpayments"><i class="bi bi-arrow-left"></i> Back</router-link>
  <router-link to="/paymentlists"><i class="bi bi-arrow-left"></i> Back To Payment List</router-link>
  
</div>
  <div class="invoice-container" v-if="appointment">
    <h2 class="title">Appointment Invoice</h2>

    <div class="info-columns">
      <!-- Left Column -->
      <div class="info-block">
        <h3>Customer Info</h3>
        <ul>
          <li><strong>Name:</strong> {{ appointment.customer.name }}</li>
          <li><strong>Phone:</strong> {{ appointment.customer.phone }}</li>
          <li><strong>Address:</strong> {{ appointment.customer.address }}</li>
        </ul>
      </div>

      <div class="info-block">
        <h3>Barber Info</h3>
        <ul>
          <li><strong>Name:</strong> {{ appointment.barber.name }}</li>
          <li><strong>Mobile:</strong> {{ appointment.barber.mobile_number }}</li>
          <li><strong>Address:</strong> {{ appointment.barber.address }}</li>
        </ul>
      </div>

      <div class="info-block">
        <h3>Appointment Details</h3>
        <ul>
          <li><strong>Date:</strong> {{ appointment.appointment_date }}</li>
          <li><strong>Time:</strong> {{ appointment.appointment_time }}</li>
          <li><strong>Status:</strong> {{ appointment.status }}</li>
          <li><strong>Shift:</strong> {{ appointment.shift.name }}</li>
        </ul>
      </div>
    </div>

    <section class="services-section">
      <h3>Services</h3>
      <table class="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th class="text-right">Price (Tk)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in appointment.services" :key="service.id">
            <td>{{ service.service_name }}</td>
            <td class="text-right">{{ parseFloat(service.service_price).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="payment-summary">
      <div class="row">
        <label>Total:</label>
        <span>{{ totalAmount.toFixed(2) }} Tk</span>
      </div>
      <div class="row">
        <label>Discount:</label>
        <input type="number" v-model.number="discount" min="0" :max="totalAmount" />
      </div>
      <div class="row grand-total">
        <label>Grand Total:</label>
        <span>{{ grandAmount.toFixed(2) }} Tk</span>
      </div>
    </section>

<section class="payment-form-section">
  <h3>Make Payment</h3>
  <form @submit.prevent="submitPayment" class="payment-form">
    <div class="form-row">
      <label>Reference No: <span style="color: red; font-size: 20px;">*</span></label>
      <input type="text" v-model="payment.reference_number" required />
    </div>
    <div class="form-row">
      <label>Paid Amount: <span style="color: red; font-size: 20px;">*</span></label>
      <input
        type="number"
        v-model.number="payment.paid_amount"
        :max="grandAmount"
        min="0"
        required
      />
    </div>
    <div class="form-row">
      <label>Payment Method: <span style="color: red; font-size: 20px;">*</span></label>
      <select v-model="payment.payment_method" required>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
        <option value="bkash">bKash</option>
      </select>
    </div>
    <div class="form-row">
      <label>Payment Date:</label>
      <input type="date" v-model="payment.payment_date" required />
    </div>
    <button type="submit">Submit Payment</button>
  </form>
</section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointment: null,
      discount: 0,
      payment: {
        reference_number: '',
        paid_amount: '',
        payment_method: 'cash',
        payment_date: new Date().toISOString().substr(0, 10),
      },
    };
  },
  computed: {
    totalAmount() {
      return this.appointment?.services?.reduce((sum, s) => sum + parseFloat(s.service_price), 0) || 0;
    },
    grandAmount() {
      return Math.max(this.totalAmount - this.discount, 0);
    },
  },
  mounted() {
    const id = this.$route.params.id;
    fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/appointments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.appointment = data;
      })
      .catch((error) => {
        console.error('Failed to fetch appointment:', error);
      });
  },
  methods: {
    submitPayment() {
      const payload = {
        appointment_id: this.appointment.id,
        reference_number: this.payment.reference_number,
        total_amount: this.totalAmount,
        discount: this.discount,
        grand_amount: this.grandAmount,
        paid_amount: this.payment.paid_amount,
        payment_date: this.payment.payment_date,
        payment_method: this.payment.payment_method,
      };

      fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Payment failed');
          }
          return response.json();
        })
        .then(() => {
          alert('Payment submitted successfully!');
          this.$router.push('/paymentlists');

        })
        .catch((error) => {
          console.error('Error submitting payment:', error);
          alert('Payment failed!');
        });
    },
  },
};
</script>

<style scoped>
.invoice-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 40px 50px;
  background: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  border: 1px solid #e4e7eb;
}

/* Title with subtle bottom border */
.title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #1a202c;
  border-bottom: 3px solid #00a86b; /* Green accent */
  padding-bottom: 8px;
  letter-spacing: 1px;
}

/* Info blocks in 3 columns */
.info-columns {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.info-block {
  flex: 1 1 30%;
  background: #f9fafb;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: inset 0 0 10px rgba(0, 168, 107, 0.05);
  border-left: 6px solid #00a86b; /* Green vertical accent */
}

.info-block h3 {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
  color: #00a86b;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

.info-block ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.info-block ul li {
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 1.6;
  color: #555;
}

/* Services Table */
.services-section {
  margin-bottom: 10px;
}

.services-section h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #0072ce; /* Blue accent */
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.services-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.services-table thead tr {
  background: #0072ce;
  color: #fff;
  text-align: left;
}

.services-table th,
.services-table td {
  padding: 14px 20px;
  border-bottom: 1px solid #e4e7eb;
}

.services-table tbody tr:hover {
  background: #f0f7ff;
}

.text-right {
  text-align: right;
}

/* Payment Summary */
.payment-summary {
  max-width: 420px;
  margin-left: auto;
  margin-bottom: 10px;
  border: 1px solid #e4e7eb;
  border-radius: 10px;
  padding: 25px 30px;
  background: #f9fafb;
  box-shadow: inset 0 2px 8px rgba(0, 168, 107, 0.1);
}

.payment-summary .row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 16px;
  color: #222;
}

.payment-summary input[type="number"] {
  width: 100px;
  padding: 8px 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccd7dd;
  text-align: right;
  transition: border-color 0.3s ease;
}

.payment-summary input[type="number"]:focus {
  border-color: #00a86b;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 168, 107, 0.4);
}

/* Grand total highlight */
.payment-summary .grand-total {
  font-size: 20px;
  color: #00a86b;
  border-top: 2px solid #00a86b;
  padding-top: 12px;
  font-weight: 700;
}

/* Payment Form */
.payment-form-section form.payment-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px 20px;
  align-items: flex-start;
}

.payment-form-section form.payment-form .form-row {
  display: flex;
  flex-direction: column;
}

.form-row label {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 3px; /* Reduced spacing */
  color: #333;
  display: block;
}

/* Make button full width and below inputs */
.payment-form-section form.payment-form button[type="submit"] {
  grid-column: 1 / -1;
  margin-top: 10px;
  width: 100%;
}

.form-row input,
.form-row select {
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccd7dd;
  font-size: 16px;
  color: #444;
  width: 100%;
  transition: border-color 0.3s ease;
}

.form-row input:focus,
.form-row select:focus {
  border-color: #0072ce;
  outline: none;
  box-shadow: 0 0 6px rgba(0, 114, 206, 0.4);
}

button[type="submit"] {
  padding: 14px 0;
  background-color: #007a4a;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #fd7e14;
}

/* Responsive */
@media (max-width: 850px) {
  .info-columns {
    flex-direction: column;
  }

  .info-block {
    flex: 1 1 100%;
    margin-bottom: 25px;
  }

  .payment-summary,
  .payment-form-section {
    max-width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 600px) {
  .payment-form-section form.payment-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .payment-form-section form.payment-form button[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
}

</style>


