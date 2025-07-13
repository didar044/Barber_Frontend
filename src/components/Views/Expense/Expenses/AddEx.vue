<template>
  <div class="animated-container">
    <router-link to="/expanselists"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="barber-form-container">
    <h2 class="barber-title">Add Expense</h2>

    <form @submit.prevent="submitForm" class="barber-form" enctype="multipart/form-data">
  <div class="barber-row">
    <div class="barber-form-group">
      <label>Category <span class="barber-required">*</span></label>
      <select v-model="form.expense_category_id" required>
        <option disabled value="">-- Select Category --</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>

    <div class="barber-form-group">
      <label>Reference No <span class="barber-required">*</span></label>
      <input v-model="form.reference_number" type="text" required />
    </div>

    <div class="barber-form-group">
      <label>Expense For <span class="barber-required">*</span></label>
      <input v-model="form.expense_for" type="text" required />
    </div>

    <div class="barber-form-group">
      <label>Amount <span class="barber-required">*</span></label>
      <input v-model="form.amount" type="number" step="0.01" required />
    </div>

    <div class="barber-form-group">
      <label>Date <span class="barber-required">*</span></label>
      <input v-model="form.expense_date" type="date" required />
    </div>

    <div class="barber-form-group">
      <label>Description</label>
      <textarea v-model="form.description" rows="3"></textarea>
    </div>

  
  </div>

  <button type="submit" class="barber-submit-btn">Save Expense</button>
</form>

  </div>
</template>

<script>
export default {
  name: "AddExpense",
  data() {
    return {
      form: {
        expense_category_id: "",
        reference_number: "",
        expense_for: "",
        amount: "",
        expense_date: "",
        description: "",
      },
      categories: [],
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const res = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expensecategories");
        const data = await res.json();
        this.categories = data.data || data; // if paginated
      } catch (err) {
        console.error("Failed to load categories:", err);
        alert("Could not load expense categories.");
      }
    },

    async submitForm() {
      try {
        const res = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.form),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Validation error:", errorData);
          alert("Failed to save expense. Check your input.");
          return;
        }

        alert("Expense saved successfully!");
        this.$router.push("/expanselists");
      } catch (err) {
        console.error("Error saving expense:", err);
        alert("Server error occurred.");
      }
    },
  },
  mounted() {
    this.fetchCategories();
  },
};
</script>
