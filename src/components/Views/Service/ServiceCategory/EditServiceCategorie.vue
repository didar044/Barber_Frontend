<template>
  <div class="animated-container">
    <router-link to="/servicecategorieslist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>
  <div class="barber-form-container">
    <h2 class="barber-title">Update Service Category</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <div class="barber-row" style="display: flex; flex-direction: column;">
        <div class="barber-form-group">
          <label>Name <span class="barber-required">*</span></label>
          <input v-model="form.name" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Description</label>
          <textarea v-model="form.description"></textarea>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">Update Category</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EditServiceCategory",
  data() {
    return {
      form: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    async fetchCategory() {
      const id = this.$route.params.id;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/servicecategories/${id}`);
        if (!response.ok) throw new Error("Failed to load category data");

        const data = await response.json();
        this.form.name = data.name;
        this.form.description = data.description;

      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to load category.");
      }
    },

    async submitForm() {
      const id = this.$route.params.id;

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/servicecategories/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Validation or server error:", errorData);
          alert("Failed to update. Check input.");
          return;
        }

        const result = await response.json();
        alert("Category updated successfully!");
        this.$router.push("/servicecategorieslist");

      } catch (error) {
        console.error("Error updating category:", error);
        alert("Server error. Please try again later.");
      }
    },
  },
  mounted() {
    this.fetchCategory();
  },
};
</script>
