<style scoped>

</style>




<template>

<div class="animated-container">
  <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  <router-link to="/addshifts"><i class="bi bi-plus-circle"></i> Add</router-link>
</div>
  <div class="table-container">
    <h2>Shift List</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shift in shifts" :key="shift.id">
          <td>{{ shift.id }}</td>
          <td>{{ shift.name }}</td>
          <td>
            <!-- <button class="action-button view-button">
                <i class="bi bi-eye"></i>
            </button> -->
            <router-link :to="`/editshifts/${shift.id}`">
              <button class="action-button edit-button">
                <i class="bi bi-pencil"></i>
              </button>
            </router-link>
            
            <button class="action-button delete-button"  @click="deleteShift(shift.id)">
                <i class="bi bi-trash"></i>
            </button>
            
         </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shifts: []
    };
  },
  mounted() {
    fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts")
      .then(response => response.json())
      .then(data => {
        this.shifts = data;
      });
  },
  methods: {
    formatDate(datetime) {
      return new Date(datetime).toLocaleString();
    },

    deleteShift(id) {
      if (!confirm("Are you sure you want to delete this shift?")) {
        return;
      }

      fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) throw new Error('Delete failed');
       
        this.shifts = this.shifts.filter(shift => shift.id !== id);
        alert('Shift deleted successfully');
      })
      .catch(error => {
        alert('Error deleting shift: ' + error.message);
      });
    }
  }
};
</script>



