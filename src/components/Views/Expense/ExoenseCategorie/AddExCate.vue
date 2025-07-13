<template>
  <div class="animated-container">
    <router-link to="/expansecategorielist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="barber-form-container">
    <h2 class="barber-title">Add Expense Category</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <div class="barber-row" style="display: flex; flex-direction: column;">
        <div class="barber-form-group">
          <label for="name">Name <span class="barber-required">*</span></label>
          <input
            id="name"
            v-model.trim="form.name"
            type="text"
            required
            autocomplete="off"
          />
        </div>

        <div class="barber-form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model.trim="form.description"
            rows="4"
          ></textarea>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">Save Expense Category</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddExpenseCategory",
  data() {
    return {
      form: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async submitForm() {
      if (!this.form.name) {
        alert("Name is required.");
        return;
      }

      try {
        const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expensecategories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Validation or server error:", errorData);
          alert("Failed to save. Please check your input.");
          return;
        }

        await response.json();

        alert("Expense category added successfully!");
        this.form.name = "";
        this.form.description = "";
        this.$router.push("/expansecategorielist");

      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Server error. Please try again later.");
      }
    },
  },
};
</script>
