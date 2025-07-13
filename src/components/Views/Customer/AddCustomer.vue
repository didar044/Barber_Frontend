<template>
   <div class="animated-container">
  <router-link to="/customerlist"><i class="bi bi-arrow-left"></i> Back</router-link>
  <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  
  </div>
  <div class="barber-form-container">
    <h2 class="barber-title">Add New Customer</h2>

    <form @submit.prevent="submitForm" class="barber-form" enctype="multipart/form-data">
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Name <span class="barber-required">*</span></label>
          <input v-model="form.name" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Phone <span class="barber-required">*</span></label>
          <input v-model="form.phone" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Email <span class="barber-required">*</span></label>
          <input v-model="form.email" type="email" required />
        </div>

        <div class="barber-form-group">
          <label>Address <span class="barber-required">*</span></label>
          <textarea v-model="form.address" required></textarea>
        </div>

        <div class="barber-form-group">
          <label>Notes</label>
          <textarea v-model="form.notes"></textarea>
        </div>

        <div class="barber-form-group">
          <label>Photo </label>
          <input type="file" @change="handleFileChange" accept="image/*" ref="photoInput" />
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">Save Customer</button>
    </form>

    <p v-if="message" class="barber-success-message">{{ message }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        phone: '',
        email: '',
        address: '',
        photo: null,
        notes: '',
      },
      message: '',
    };
  },
  methods: {
    handleFileChange(event) {
      this.form.photo = event.target.files[0];
    },

    async submitForm() {
      try {
        const formData = new FormData();
        for (const key in this.form) {
          if (this.form[key]) {
            formData.append(key, this.form[key]);
          }
        }

        const response = await fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to save customer');

        await response.json();
        this.message = 'Customer added successfully!';
        this.resetForm();
        this.$router.push('/customerlist'); // adjust route if needed
      } catch (error) {
        alert(error.message);
      }
    },

    resetForm() {
      this.form = {
        name: '',
        phone: '',
        email: '',
        address: '',
        photo: null,
        notes: '',
      };
      this.$refs.photoInput.value = null;
    },
  },
};
</script>
