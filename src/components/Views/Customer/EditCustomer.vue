<template>
  <div class="animated-container">
    <router-link to="/customerlist"><i class="bi bi-arrow-left"></i> Back</router-link>
    <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  </div>

  <div class="barber-form-container">
    <h2 class="barber-title">{{ isEdit ? 'Edit/Update Customer' : 'Add New Customer' }}</h2>

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
          <label>Email</label>
          <input v-model="form.email" type="email" />
        </div>

        <div class="barber-form-group">
          <label>Address</label>
          <textarea v-model="form.address"></textarea>
        </div>

        <div class="barber-form-group">
          <label>Notes</label>
          <textarea v-model="form.notes"></textarea>
        </div>

        <div class="barber-form-group">
          <label>Photo</label>
          <input type="file" @change="handleFileChange" accept="image/*" ref="photoInput" />

          <div v-if="isEdit && existingPhotoUrl" style="margin-top: 10px;">
            <img
              :src="existingPhotoUrl"
              alt="Existing Photo"
              width="50"
              style="border-radius: 8px; object-fit: cover;"
            />
          </div>
        </div>

        <!-- Show total visits and last visit if in edit mode -->
        <div class="barber-form-group" v-if="isEdit">
          <label>Total Visits:</label>
          <p>{{ form.total_visits }}</p>
        </div>

        <div class="barber-form-group" v-if="isEdit">
          <label>Last Visit:</label>
          <p>{{ formatDate(form.last_visit) }}</p>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">
        {{ isEdit ? 'Update Customer' : 'Save Customer' }}
      </button>
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
        total_visits: null,
        last_visit: null,
      },
      isEdit: false,
      existingPhotoUrl: null,
      message: '',
    };
  },
  mounted() {
    const customerId = this.$route.params.id;
    if (customerId) {
      this.isEdit = true;
      this.fetchCustomer(customerId);
    }
  },
  methods: {
    handleFileChange(event) {
      this.form.photo = event.target.files[0];
    },

    async fetchCustomer(id) {
      try {
        const res = await fetch(`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers/${id}`);
        if (!res.ok) throw new Error('Failed to fetch customer');
        const data = await res.json();

        // Set form values and photo preview
        this.form = {
          ...this.form,
          ...data,
          photo: null, // don't prefill file input
        };

        // Set preview for existing photo
        if (data.photo) {
          this.existingPhotoUrl = `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${data.photo}`;
        }
      } catch (error) {
        alert(error.message);
      }
    },

    async submitForm() {
      try {
        const customerId = this.$route.params.id;
        const formData = new FormData();

        for (const key in this.form) {
          if (this.form[key] !== null && key !== 'total_visits' && key !== 'last_visit') {
            formData.append(key, this.form[key]);
          }
        }

        // Laravel expects PUT via _method
        if (this.isEdit) {
          formData.append('_method', 'PUT');
        }

        const url = this.isEdit
          ? `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers/${customerId}`
          : 'http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers';

        const response = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to save customer');

        await response.json();
        this.message = this.isEdit ? 'Customer updated successfully!' : 'Customer added successfully!';
        this.resetForm();
        this.$router.push('/customerlist');
      } catch (error) {
        alert(error.message);
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString();
    },

    resetForm() {
      this.form = {
        name: '',
        phone: '',
        email: '',
        address: '',
        photo: null,
        notes: '',
        total_visits: null,
        last_visit: null,
      };
      this.existingPhotoUrl = null;
      if (this.$refs.photoInput) this.$refs.photoInput.value = null;
    },
  },
};
</script>
