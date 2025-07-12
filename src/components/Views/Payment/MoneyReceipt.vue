<template>
 <div class="animated-container">
    <router-link to="/paymentlists"><i class="bi bi-arrow-left"></i> Back</router-link>
    <button @click="printPage" class="action-button view-button"><i class="bi bi-printer-fill"></i> Print Profile </button> 
  </div>
  <div v-if="payment" class="receipt-wrapper container p-4" style="max-width: 800px; margin-top: 10px;">
    <h2 class="text-center mb-3">Money Receipt</h2>
     
    <!-- Company Info -->
    <div class="mb-4 text-center">
      <h4>Fatehabad Fades</h4>
      <p>123 Education Lane, Cityville, ST 45678</p>
      <p>Email: info@fatehabad.com | Phone: 01234567890</p>
    </div>

    <!-- Header Info -->
    <div class="d-flex justify-content-between mb-3">
      <div>
        <h5>Customer Info</h5>
        <p><strong>Name:</strong> {{ payment.appointment.customer?.name }}</p>
        <p><strong>Phone:</strong> {{ payment.appointment.customer?.phone }}</p>
        <p><strong>Address:</strong> {{ payment.appointment.customer?.address }}</p>
      </div>
      <div>
        <h5>Barber Info</h5>
        <p><strong>Name:</strong>{{ payment.appointment.barber?.name }}</p>
        <p><strong>Phone:</strong>{{ payment.appointment.barber?.mobile_number }}</p>
        <p><strong>Address:</strong> {{ payment.appointment.barber?.address }}</p>
      </div>
      <div>
        <p><strong>Appointment ID:</strong>{{ payment.appointment_id }} </p>
        <p><strong>Date:</strong> {{ payment.payment_date }}</p>
        <p><strong>Payment Method:</strong> {{ payment.payment_method }}</p>
        <p><strong>Referench No:</strong> {{ payment.reference_number || ('RC' + payment.id.toString().padStart(4, '0')) }}</p>
      </div>
    </div>

    <!-- Payment Summary -->

<table class="table table-bordered">
  <thead style="color: black;">
    <tr>
      <th>#</th>
      <th>Service Name</th>
      <th>Price</th>
      
    </tr>
  </thead>
  <tbody>
    <tr v-for="(service, index) in payment.appointment.services" :key="service.id">
      <td>{{ index + 1 }}</td>
      <td>{{ service.service_name }}</td>  
      <td>{{ service.service_price }}</td> 
    </tr>
  </tbody>
</table>
   <div>
    <p style="font-size: 15px;"><strong> Money Receipt No:</strong>{{ payment.id }} </p>
   </div>
    <div class="text-end">
      <p><strong>Total:</strong> ${{ parseFloat(payment.total_amount).toFixed(2) }}</p>
      <p><strong>Discount:</strong> ${{ parseFloat(payment.discount).toFixed(2) }}</p>
      <p><strong>Paid:</strong> ${{ parseFloat(payment.paid_amount).toFixed(2) }}</p>
      <p><strong>Due:</strong> ${{ (parseFloat(payment.total_amount) - parseFloat(payment.paid_amount)).toFixed(2) }}</p>
    </div>

    <div class="text-center mt-4">
      <p>Thank you for your payment!</p>
      <button class="btn btn-primary"  @click="printPage" >Print Receipt</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MoneyReceipt",
  data() {
    return {
      payment: null,
    };
    
  },
  
  mounted() {
    // Load the first payment for demo
    fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/payments")
      .then((res) => res.json())
      .then((data) => {
        this.payment = data.data[0]; // You can change index or use route param for dynamic ID
      });
  },
    methods: {
  printPage() {
    window.print();
  },
},
  
};
</script>

<style scoped>
.receipt-wrapper {
  font-family: 'Courier New', Courier, monospace;
  background: #fff;
  color: #000;
  padding: 20px;
  border: 1px dashed #000;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.receipt-wrapper h2,
.receipt-wrapper h4,
.receipt-wrapper h5 {
  margin-bottom: 5px;
  font-weight: bold;
}

.receipt-wrapper p {
  margin: 2px 0;
  font-size: 14px;
}

.receipt-wrapper .text-end {
  text-align: right;
}

.receipt-wrapper .table {
  width: 100%;
  margin-top: 15px;
  border-collapse: collapse;
}

.receipt-wrapper .table th,
.receipt-wrapper .table td {
  border: 1px dashed #000;
  padding: 6px;
  font-size: 14px;
  text-align: left;
}

.receipt-wrapper .table th {
  background: #f8f8f8;
}

.receipt-wrapper button.btn {
  margin-top: 20px;
  font-size: 14px;
}

@media print {
  .btn {
    display: none;
  }

  body {
    background: none;
  }

  .receipt-wrapper {
    box-shadow: none;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .receipt-wrapper .table th,
  .receipt-wrapper .table td {
    font-size: 12px;
  }
}
</style>
