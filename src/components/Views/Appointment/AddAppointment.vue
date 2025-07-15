<style scoped>
.barber-form-container {

  margin: 30px auto;
  padding: 25px 30px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.05);
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.barber-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  border-bottom: 2px solid #2e8b57;
  padding-bottom: 6px;
  color: #2e8b57;
}

.barber-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.barber-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.barber-form-group {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
}

.barber-form-group label {
  font-weight: 600;
  margin-bottom: 6px;
  color: #1d3557;
}

.barber-form-group select,
.barber-form-group input,
.barber-form-group textarea {
  padding: 8px 12px;
  font-size: 1rem;
  border: 1.5px solid #ccc;
  border-radius: 5px;
  outline-offset: 2px;
  transition: border-color 0.3s ease;
  color: #333;
}

.barber-form-group select:focus,
.barber-form-group input:focus,
.barber-form-group textarea:focus {
  border-color: #2e8b57;
  box-shadow: 0 0 6px rgb(46 139 87 / 0.3);
}

.barber-textarea-group textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.barber-row > .barber-form-group {
  min-width: 220px;
}

.barber-row h3 {
  width: 100%;
  color: #fd7e14;
  font-weight: 700;
  margin-bottom: 10px;
  border-bottom: 2px solid #fd7e14;
  padding-bottom: 4px;
}

.barber-form-group input[readonly] {
  background-color: #f9f9f9;
  color: #555;
  cursor: default;
}

button {
  background-color: #2e8b57;
  color: white;
  border: none;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1f5e3d;
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

/* Service Row Buttons */
.barber-form-group button {
  margin-left: 10px;
  background-color: #fd7e14;
  padding: 6px 12px;
  font-size: 0.9rem;
  border-radius: 5px;
  align-self: center;
}

.barber-form-group button:hover {
  background-color: #b25f00;
}

/* Total Amount */
.barber-form-group strong {
  font-size: 1.3rem;
  color: #1d3557;
  display: block;
  margin-top: 10px;
}
.barber-success-message {
  margin-top: 10px;
  padding: 12px 15px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  font-weight: 600;
  border-radius: 6px;
  text-align: center;
  user-select: none;
}

@media (max-width: 600px) {
  .barber-row {
    flex-direction: column;
  }

  .barber-row > .barber-form-group {
    min-width: 100%;
  }
}
</style>



<template>
   <div class="animated-container">
  <router-link to="/appoinmentlists"><i class="bi bi-arrow-left"></i> Back</router-link>
  <router-link to="/"><i class="bi bi-house-fill"></i> Home</router-link>
  
  </div>
  <div class="barber-form-container">
    <h2 class="barber-title">Add Appointment</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <!-- Appointment Info -->
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Customer <span class="barber-required">*</span></label>
          <select v-model="form.customer_id" required>
            <option disabled value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Shift <span class="barber-required">*</span></label>
          <select v-model="form.shift_id" required>
            <option disabled value="">Select Shift</option>
            <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
              {{ shift.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Barber <span class="barber-required">*</span></label>
          <select v-model="form.barber_id" required>
            <option disabled value="">Select Barber</option>
            <option v-for="barber in filteredBarbers" :key="barber.id" :value="barber.id">
              {{ barber.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Date <span class="barber-required">*</span></label>
          <input type="date" v-model="form.appointment_date" required />
        </div>

        <div class="barber-form-group">
          <label>Time <span class="barber-required">*</span></label>
          <input type="time" v-model="form.appointment_time" required />
        </div>
      </div>

      <!-- Services -->
      <div class="barber-row">
        <h3>Services <span class="barber-required">*</span></h3>
        <div
          v-for="(item, index) in serviceItems"
          :key="index"
          class="barber-form-group"
        >
          <select
            v-model.number="item.service_id"
            @change="updateServicePrice(index)"
            required
          >
            <option disabled value="">Select Service</option>
            <option
              v-for="service in services"
              :key="service.id"
              :value="service.id"
            >
              {{ service.name }} (৳{{ service.price }})
            </option>
          </select>
          <input
            type="number"
            v-model.number="item.price"
            readonly
            placeholder="Price"
          />
          <button
            type="button"
            @click="removeService(index)"
            v-if="serviceItems.length > 1"
          >
            Remove
          </button>
        </div>
        <button type="button" @click="addService">+ Add Service</button>
      </div>

      <!-- Notes & Total -->
      <div class="barber-form-group barber-textarea-group">
        <label>Notes</label>
        <textarea v-model="form.notes" placeholder="Any special instructions"></textarea>
      </div>

      <div class="barber-form-group">
        <strong>Total Amount: ৳{{ totalAmount }}</strong>
      </div>
    
      <button type="submit" class="barber-submit-btn" style="margin-top:-150px;">Save Appointment</button>
    </form>

    <p v-if="message" class="barber-success-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        barber_id: '',
        customer_id: '',
        shift_id: '',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      },
      barbers: [],
      customers: [],
      shifts: [],
      services: [],
      serviceItems: [{ service_id: '', price: 0 }],
      message: '',
    };
  },
  computed: {
    totalAmount() {
      const total = this.serviceItems.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
      );
      return total.toFixed(2);
    },
    filteredBarbers() {
      if (!this.form.shift_id) {
        return this.barbers;
      }
      return this.barbers.filter(
        (barber) => barber.shift_id === this.form.shift_id
      );
    },
  },
  watch: {
    'form.shift_id'(newShiftId) {
      this.form.barber_id = '';
    },
  },
  mounted() {
    this.fetchDropdowns();
  },
  methods: {
    async fetchDropdowns() {
      try {
        const [barberRes, customerRes, shiftRes, serviceRes] = await Promise.all([
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/services'),
        ]);

        const [barberData, customerData, shiftData, serviceData] = await Promise.all([
          barberRes.json(),
          customerRes.json(),
          shiftRes.json(),
          serviceRes.json(),
        ]);

        this.barbers = barberData.data || barberData;
        this.customers = customerData.data || customerData;
        this.shifts = shiftData.data || shiftData;
        this.services = serviceData.data || serviceData;
      } catch (error) {
        alert('Failed to load dropdown data.');
        console.error(error);
      }
    },

    updateServicePrice(index) {
      const selectedId = this.serviceItems[index].service_id;
      const service = this.services.find((s) => s.id === selectedId);
      this.serviceItems[index].price = service ? service.price : 0;
    },

    addService() {
      this.serviceItems.push({ service_id: '', price: 0 });
    },

    removeService(index) {
      this.serviceItems.splice(index, 1);
    },

    async submitForm() {
  const service_ids = this.serviceItems.map((item) => item.service_id);

  if (!service_ids.length || service_ids.includes('')) {
    alert('Please select all services.');
    return;
  }

  const payload = {
    ...this.form,
    service_ids,
    total_amount: this.totalAmount,
  };

  try {
    const response = await fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Try to read the validation error messages from response
      const errorData = await response.json();
      console.error('Validation errors:', errorData);
      throw new Error('Failed to save appointment.');
    }

    this.message = '✅ Appointment added successfully!';
    this.resetForm();
    this.$router.push('/appoinmentlists');
  } catch (error) {
    alert(error.message || 'Something went wrong.');
    console.error(error);
  }
},


    resetForm() {
      this.form = {
        barber_id: '',
        customer_id: '',
        shift_id: '',
        appointment_date: '',
        appointment_time: '',
        notes: '',
      };
      this.serviceItems = [{ service_id: '', price: 0 }];
    },
  },
};
</script>

