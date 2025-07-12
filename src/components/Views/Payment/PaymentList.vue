<template>
  <div>
    <div class="animated-container mb-3">
      <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
      <router-link to="/addpayments" class="ms-3"><i class="bi bi-plus-circle"></i> Add Payment</router-link>
    </div>

    <div class="table-container">
      <h2>Payment List</h2>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Payment Id</th>
            <th>Appointment ID</th>
          
            <th>Ref No</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Date</th>
            
            
            <th>Money Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(payment, index) in payments.data" :key="payment.id">
            <td>{{ index + 1 + (payments.current_page - 1) * payments.per_page }}</td>
            <td>{{ payment.appointment?.customer?.name || 'N/A' }}</td> 
            <td>{{ payment.id}}</td>
            <td>{{ payment.appointment?.id || 'N/A' }}</td>
            <td>{{ payment.reference_number }}</td>
            <td>{{ payment.grand_amount }}</td>
            <td>{{ payment.payment_method }}</td>
            <td>{{ payment.payment_date }}</td>
           
         
            <td>
              <router-link :to="`/moneyreceipts/${payment.id}`">
                <button class="action-button edit-button" title="Edit Payment">
                  <i class="bi bi-receipt"></i>
                </button>
              </router-link>
            </td>
          </tr>
          <tr v-if="payments.data.length === 0">
            <td colspan="7" style="text-align:center;">No payments found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <nav v-if="payments.last_page > 1" class="mt-3">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !payments.prev_page_url }">
          <button class="page-link" @click="fetchPayments(payments.current_page - 1)">Previous</button>
        </li>

        <li
          class="page-item"
          v-for="page in [...Array(payments.last_page).keys()].map(i => i + 1)"
          :key="page"
          :class="{ active: page === payments.current_page }"
        >
          <button class="page-link" @click="fetchPayments(page)">
            {{ page }}
          </button>
        </li>

        <li class="page-item" :class="{ disabled: !payments.next_page_url }">
          <button class="page-link" @click="fetchPayments(payments.current_page + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payments: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 10,
        prev_page_url: null,
        next_page_url: null,
      },
      apiBaseUrl: "http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/payments",
    };
  },
  mounted() {
    this.fetchPayments(1);
  },
  methods: {
    fetchPayments(page = 1) {
      fetch(`${this.apiBaseUrl}?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          this.payments = data;
        })
        .catch((error) => {
          console.error("Error fetching payments:", error);
        });
    },
    deletePayment(id) {
      if (confirm("Are you sure you want to delete this payment?")) {
        fetch(`${this.apiBaseUrl}/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete payment.");
            return res.json();
          })
          .then(() => {
            this.fetchPayments(this.payments.current_page);
          })
          .catch((error) => {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
          });
      }
    },

  },
};
</script>

<style scoped>
.pagination .page-link {
  cursor: pointer;
}
.page-item.active .page-link {
  background-color: #007bff;
  color: white;
}
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
}
</style>
