<template>
<div class="animated-container">
  <div><router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link></div>
  
</div>

  <div class="barber-form-container">
    <h2 class="barber-title">Add New Haircut Crew</h2>

    <form @submit.prevent="submitForm" class="barber-form" enctype="multipart/form-data">
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Name <span class="barber-required">*</span></label>
          <input v-model="form.name" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Father's Name</label>
          <input v-model="form.father_name" type="text" />
        </div>

        <div class="barber-form-group">
          <label>Mother's Name</label>
          <input v-model="form.mother_name" type="text" />
        </div>

        <div class="barber-form-group">
          <label>Gender <span class="barber-required">*</span></label>
          <select v-model="form.gender" required>
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Religion <span class="barber-required">*</span></label>
          <select v-model="form.religion" required>
            <option value="" disabled>Select Religion</option>
            <option>Islam</option>
            <option>Hinduism</option>
            <option>Christianity</option>
            <option>Buddhism</option>
            <option>Other</option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Mobile Number <span class="barber-required">*</span></label>
          <input v-model="form.mobile_number" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" />
        </div>

        <div class="barber-form-group">
          <label>NID Number <span class="barber-required">*</span></label>
          <input v-model="form.nid_num" type="text" required />
        </div>

        <div class="barber-form-group">
          <label>Specialization</label>
          <input v-model="form.specialization" type="text" />
        </div>

        <div class="barber-form-group">
          <label>Experience Years <span class="barber-required">*</span></label>
          <input v-model.number="form.exprence_years" type="number" min="0" required />
        </div>

        <div class="barber-form-group">
          <label>Hire Date <span class="barber-required">*</span></label>
          <input v-model="form.hire_date" type="date" required />
        </div>

        <div class="barber-form-group">
          <label>Shift <span class="barber-required">*</span></label>
          <select v-model.number="form.shift_id" required>
            <option value="" disabled>Select Shift</option>
            <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
              {{ shift.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Blood Group</label>
          <input v-model="form.blood_roupe" type="text" />
        </div>

        <div class="barber-form-group">
          <label>Photo (upload file) <span class="barber-required">*</span></label>
          <input type="file" @change="handleFileChange" accept="image/*" ref="photoInput" required />
        </div>

        <div class="barber-form-group barber-textarea-group">
          <label>Address</label>
          <textarea v-model="form.address"></textarea>
        </div>
      </div>

      <button type="submit" class="barber-submit-btn">Save Barber</button>
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
        father_name: '',
        mother_name: '',
        gender: '',
        religion: '',
        photo: null,
        blood_roupe: '',
        address: '',
        mobile_number: '',
        email: '',
        nid_num: '',
        specialization: '',
        exprence_years: 0,
        hire_date: '',
        shift_id: '',
      },
      shifts: [],
      message: '',
    };
  },
  mounted() {
    this.loadShifts();
  },
  methods: {
    async loadShifts() {
      try {
        const res = await fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts');
        const data = await res.json();
        this.shifts = data;
      } catch (error) {
        console.error('Error loading shifts:', error);
      }
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      this.form.photo = file || null;
    },

    async submitForm() {
      try {
        const formData = new FormData();
        for (const key in this.form) {
          if (key !== 'photo' && this.form[key] !== null && this.form[key] !== '') {
            formData.append(key, this.form[key]);
          }
        }
        if (this.form.photo) {
          formData.append('photo', this.form.photo);
        }

        const response = await fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Failed to save barber');

        await response.json();
        this.message = 'Barber added successfully!';
        this.resetForm();
        this.$router.push('/barberlist');
      } catch (error) {
        alert(error.message);
      }
    },

    resetForm() {
      this.form = {
        name: '',
        father_name: '',
        mother_name: '',
        gender: '',
        religion: '',
        photo: null,
        blood_roupe: '',
        address: '',
        mobile_number: '',
        email: '',
        nid_num: '',
        specialization: '',
        exprence_years: 0,
        hire_date: '',
        shift_id: null,
      };
      this.$refs.photoInput.value = null;
    },
  },
};
</script>


