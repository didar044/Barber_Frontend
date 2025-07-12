<template>
  <div class="animated-container">
    <router-link to="/expansecategorielist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="barber-form-container">
    <h2 class="barber-title">
      {{ isEditMode ? 'Edit' : 'Add' }} Expense Category
    </h2>

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

      <button type="submit" class="barber-submit-btn">
        {{ isEditMode ? 'Update' : 'Save' }} Expense Category
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddOrUpdateExpenseCategory",
  data() {
    return {
      form: {
        name: "",
        description: "",
      },
      isEditMode: false,
      categoryId: null,
    };
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/expensecategories/${this.categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch category");
        const data = await response.json();
        this.form.name = data.name;
        this.form.description = data.description;
      } catch (error) {
        console.error("Error loading category:", error);
        alert("Failed to load category data.");
      }
    },

    async submitForm() {
      if (!this.form.name) {
        alert("Name is required.");
        return;
      }

      const url = this.isEditMode
        ? `http://127.0.0.1:8000/api/expensecategories/${this.categoryId}`
        : `http://127.0.0.1:8000/api/expensecategories`;

      const method = this.isEditMode ? "PUT" : "POST";

      try {
        const response = await fetch(url, {
          method,
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

        alert(this.isEditMode ? "Category updated successfully!" : "Category added successfully!");
        this.$router.push("/expansecategorielist");

      } catch (error) {
        console.error("Submit failed:", error);
        alert("Server error. Please try again later.");
      }
    },
  },
  created() {
    this.categoryId = this.$route.params.id;
    this.isEditMode = !!this.categoryId;

    if (this.isEditMode) {
      this.fetchCategory();
    }
  },
};
</script>
