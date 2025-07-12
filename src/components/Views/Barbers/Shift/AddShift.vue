<template>
  <div class="animated-container">
    <router-link to="/shiftslist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="container mt-4">
    <h2 class="mb-3">Shift Add</h2>
    <form @submit.prevent="createShift" class="mb-4">
      <div class="mb-3">
        <label class="form-label">Shift Name</label>
        <input
          v-model="newShift.name"
          type="text"
          class="form-control"
          placeholder="Enter shift name"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">Start Time</label>
        <input
          v-model="newShift.start_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <div class="mb-3">
        <label class="form-label">End Time</label>
        <input
          v-model="newShift.end_time"
          type="time"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-success">
        <i class="bi bi-plus-circle"></i> Add Shift
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newShift: {
        name: "",
        start_time: "",
        end_time: "",
      },
    };
  },
  methods: {
    createShift() {
      fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.newShift),
      })
        .then((res) => res.json())
        .then((data) => {
          this.$router.push("/shiftslist");
        })
        .catch((err) => console.error("Error:", err));
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
