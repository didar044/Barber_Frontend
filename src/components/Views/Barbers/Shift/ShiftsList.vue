<template>
  <div>
    <div class="animated-container mb-3">
      <router-link to="/">
        <i class="bi bi-house-fill"></i> Home
      </router-link>
      <router-link to="/addshifts" class="ms-3">
        <i class="bi bi-plus-circle"></i> Add
      </router-link>
    </div>

    <div class="table-container">
      <h2>Shift List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shift in shifts" :key="shift.id">
            <td>{{ shift.id }}</td>
            <td>{{ shift.name }}</td>
            <td>{{ shift.start_time }}</td>
            <td>{{ shift.end_time }}</td>
            <td>
              <router-link :to="`/editshifts/${shift.id}`">
                <button class="action-button edit-button" title="Edit Shift">
                  <i class="bi bi-pencil"></i>
                </button>
              </router-link>
              <button
                class="action-button delete-button"
                title="Delete Shift"
                @click="deleteShift(shift.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
          <tr v-if="shifts.length === 0">
            <td colspan="5" style="text-align:center;">No shifts found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shifts: [],
      apiBaseUrl: "http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts",
    };
  },
  mounted() {
    this.fetchShifts();
  },
  methods: {
    fetchShifts() {
      fetch(this.apiBaseUrl)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch shifts");
          return response.json();
        })
        .then((data) => {
          this.shifts = data;
        })
        .catch((error) => {
          alert("Error loading shifts: " + error.message);
        });
    },

    deleteShift(id) {
      if (!confirm("Are you sure you want to delete this shift?")) {
        return;
      }

      fetch(`${this.apiBaseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error("Delete failed");
          // Remove deleted shift from the list
          this.shifts = this.shifts.filter((shift) => shift.id !== id);
          alert("Shift deleted successfully");
        })
        .catch((error) => {
          alert("Error deleting shift: " + error.message);
        });
    },
  },
};
</script>


