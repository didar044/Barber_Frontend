<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addappoinments"><i class="bi bi-plus-circle"></i> Add Ap</router-link>
  </div>
  <div class="table-container">
    <h2>Appointment List</h2>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Appoinment Id</th>
          <th>Barber</th>
          <th>Shift</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Total</th>
          <th>Token</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appt, index) in appointments.data" :key="appt.id">
          <td>{{ index + 1 + (appointments.current_page - 1) * appointments.per_page }}</td>
          <td>{{ appt.customer?.name || 'N/A' }}</td>
           <td>{{ appt.id  }}</td>
          <td>{{ appt.barber?.name || 'N/A' }}</td>
          <td>{{ appt.shift?.name || 'N/A' }}</td>
          <td>{{ appt.appointment_date }}</td>
          <td>{{ appt.appointment_time }}</td>
          <td>
            <select
              v-model="appt.status"
              @change="updateStatus(appt.id, appt.status)"
              :disabled="appt.status === 'completed' || appt.status === 'cancelled'"
              :style="{
                backgroundColor: appt.status === 'pending' ? '#fd7e14' : 
                       appt.status === 'confirmed' ? '#1d3557' :
                       appt.status === 'completed' ? '#155724' :
                       appt.status === 'cancelled' ? 'red' : 'white',
                color: '#fff',
                fontWeight: 'bold',
                cursor: (appt.status === 'completed' || appt.status === 'cancelled') ? 'not-allowed' : 'pointer'
              }"
              title="Status cannot be changed after completion or cancellation"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
               <td>{{ appt.total_amount }}</td>
            <td v-if="appt.status === 'confirmed' || appt.status === 'completed' "><router-link :to="`/tokenappoinments/${appt.id}`"> <button class="action-button edit-button"><i class="bi bi-fingerprint"></i></button></router-link> </td>
            <td v-else></td>
          <td v-if="appt.status === 'completed' || appt.status === 'cancelled' ">
            <router-link :to="`/showappoinments/${appt.id}`">
              <button class="action-button view-button">
                <i class="bi bi-eye"></i>
              </button>
            </router-link>
         
          </td>
          <td v-else>
                 <router-link :to="`/showappoinments/${appt.id}`">
              <button class="action-button view-button">
                <i class="bi bi-eye"></i>
              </button>
            </router-link>
            <router-link :to="`/editappoinments/${appt.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>
            <button class="action-button delete-button" @click="deleteAppointment(appt.id)">
              <i class="bi bi-trash"></i>
            </button>


          </td>
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
  mounted() {
    this.fetchAppointments(1);
  },
  methods: {
    fetchAppointments(page = 1) {
      fetch(`http://127.0.0.1:8000/api/appointments?page=${page}`)
        .then(res => res.json())
        .then(data => {
          this.appointments = data;
        })
        .catch(error => {
          console.error("Error fetching appointments:", error);
        });
    },

    deleteAppointment(id) {
      if (confirm("Are you sure you want to delete this appointment?")) {
        fetch(`http://127.0.0.1:8000/api/appointments/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then(res => {
            if (!res.ok) throw new Error("Failed to delete appointment.");
            return res.json();
          })
          .then(() => {
            this.fetchAppointments(this.appointments.current_page);
          })
          .catch(error => {
            console.error("Delete error:", error);
            alert("Something went wrong while deleting.");
          });
      }
    },

    async updateStatus(id, status) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/appointments/${id}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to update status.");
        }

        const result = await response.json();
        alert(result.message);

        // Optionally refresh list or update the UI further here
        this.fetchAppointments(this.appointments.current_page);

      } catch (error) {
        alert(error.message);
        console.error("Status update error:", error);
      }
    },
  },
};

</script>
