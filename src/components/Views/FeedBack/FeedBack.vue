<template>
  <div class="animated-container">
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
    <router-link to="/addfeedbacks"><i class="bi bi-plus-circle"></i> Add Feedback</router-link>
  </div>

  <div class="table-container">
    <h2><i class="bi bi-chat-left-text"></i> Customer Feedbacks</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Barber Name</th>
          <th>Customer Name</th>
          <th>Appointment ID</th>
          <th>Rating</th>
          <th>Message</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feedback in feedbacks" :key="feedback.id">
          <td>{{ feedback.id }}</td>
          <td>{{ feedback.barber?.name || 'N/A' }}</td>
          <td>{{ feedback.customer?.name || 'N/A' }}</td>
          <td>{{ feedback.appointment?.id || 'N/A' }}</td>
          <td>
            <span v-for="n in 5" :key="n">
              <i
                class="bi"
                :class="n <= feedback.rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'"
              ></i>
            </span>
          </td>
          <td>{{ feedback.message }}</td>
          <td>{{ formatDate(feedback.submitted_at) }}</td>
          <td>
            <button class="action-button delete-button" @click="deleteExpense(feedback.id)">
                <i class="bi bi-trash"></i>
              </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination-controls mt-3">
  <button
    :disabled="currentPage === 1"
    @click="fetchfeedback(currentPage - 1)"
    class="btn btn-secondary me-2"
  >
    <i class="bi bi-arrow-left"></i> Prev
  </button>

  <span>Page {{ currentPage }} of {{ lastPage }}</span>

  <button
    :disabled="currentPage === lastPage"
    @click="fetchfeedback(currentPage + 1)"
    class="btn btn-secondary ms-2"
  >
    Next <i class="bi bi-arrow-right"></i>
  </button>
</div>

</template>

<script>
export default {
  data() {
    return {
      feedbacks: [],
      currentPage: 1,
      lastPage: 1,
    };
  },
  methods: {
    async fetchfeedback(page = 1) {
      try {
        const response = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/feedbacks?page=${page}`);
        if (response.ok) {
          const data = await response.json();
          this.feedbacks = data.data;
          this.currentPage = data.current_page;
          this.lastPage = data.last_page;
        } else {
          throw new Error("Failed to fetch feedbacks");
        }
      } catch (error) {
        console.error("Error Fetching Feedbacks:", error);
        alert("Failed to load feedback. Try again.");
      }
    },

    async deleteExpense(id) {
      if (!confirm("Are you sure you want to delete this feedback?")) return;

      try {
        const response = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/feedbacks/${id}`, {
          method: "DELETE",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Failed to delete feedback");

        this.feedbacks = this.feedbacks.filter(f => f.id !== id);
        alert("Feedback deleted successfully.");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete. It might be linked to other records.");
      }
    },

    formatDate(dateStr) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    this.fetchfeedback();
  },
};
</script>


<style scoped>
.text-warning {
  color: #ffc107 !important;
}
.text-muted {
  color: #ccc !important;
}
.pagination-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

</style>
