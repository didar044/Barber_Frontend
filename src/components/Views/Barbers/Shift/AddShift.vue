<template>
  <div class="animated-container">
    <router-link to="/shiftslist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="container mt-4">
    <h2 class="mb-3">Shift Add</h2>
    <form @submit.prevent="createShift" class="mb-4">
      <div class="input-group">
        <input
          v-model="newShift"
          type="text"
          class="form-control"
          placeholder="Enter shift name"
          required
        />
        <button type="submit" class="btn btn-success">
          <i class="bi bi-plus-circle"></i> Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newShift: "",
      shifts: [], 
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
        body: JSON.stringify({
          name: this.newShift,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          

          // Option 2: redirect to list page after add
          this.$router.push("/shiftslist");

          this.newShift = ""; 
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
