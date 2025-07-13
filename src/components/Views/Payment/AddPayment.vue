<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>
  <div class="table-container">
    <h2>Haircut  completed List</h2>

   <table>
  <thead>
    <tr>
      <th>#</th>
      <th>Customer</th>
      <th>Appointment Id</th>
      <th>Barber</th>
      <th>Shift</th>
      <th>Date</th>
      <th>Time</th>
      <th>Status</th>
      <th>Total</th>
      <th>Payment</th>
    </tr>
  </thead>
  <tbody v-if="completedAppointments.length > 0">
  <tr v-for="(appt, index) in completedAppointments" :key="appt.id">
    <td>{{ index + 1 + (appointments.current_page - 1) * appointments.per_page }}</td>
    <td>{{ appt.customer?.name || 'N/A' }}</td>
    <td>{{ appt.id }}</td>
    <td>{{ appt.barber?.name || 'N/A' }}</td>
    <td>{{ appt.shift?.name || 'N/A' }}</td>
    <td>{{ appt.appointment_date }}</td>
    <td>{{ appt.appointment_time }}</td>
    <td><label style="background: green; color: white; font-weight: bolder; padding: 10px; border-radius: 10px;"> {{ appt.status }}</label>
    </td>
    <td>{{ appt.total_amount }}</td>
    <td>
        <router-link :to="`/payments/${appt.id}`">
              <button class="action-button view-button">
                <i class="bi bi-cash-stack"></i>
              </button>
        </router-link>
    </td>
  </tr>
</tbody>
<tbody v-else>
  <tr>
    <td colspan="10">No completed appointments found.</td>
  </tr>
</tbody>

</table>

    <!-- Pagination -->
    <nav>
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: !appointments.prev_page_url }">
          <button class="page-link" @click="fetchAppointments(appointments.current_page - 1)">Previous</button>
        </li>

        <li
          class="page-item"
          v-for="page in appointments.last_page"
          :key="page"
          :class="{ active: page === appointments.current_page }"
        >
          <button class="page-link" @click="fetchAppointments(page)">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: !appointments.next_page_url }">
          <button class="page-link" @click="fetchAppointments(appointments.current_page + 1)">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      appointments: {
        data: [],
        current_page: 1,
        last_page: 1,
        per_page: 5,
      },
    };
  },
  computed: {
    completedAppointments() {
      return this.appointments.data.filter(
        (appt) =>
          appt.status &&
          appt.status.trim().toLowerCase() === "completed"
      );
    },
  },
  mounted() {
    this.fetchAppointments(1);
  },
  methods: {
    fetchAppointments(page = 1) {
      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/appointments?page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          this.appointments = data;
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    },

     
  },
};
</script>


