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
    <h2 class="barber-title">Edit/Update Appointment</h2>

    <form @submit.prevent="submitForm" class="barber-form">
      <!-- Appointment Info -->
      <div class="barber-row">
        <div class="barber-form-group">
          <label>Customer *</label>
          <select v-model="form.customer_id" required>
            <option disabled value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.id" :value="customer.id">
              {{ customer.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Shift *</label>
          <select v-model="form.shift_id" required>
            <option disabled value="">Select Shift</option>
            <option v-for="shift in shifts" :key="shift.id" :value="shift.id">
              {{ shift.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Barber *</label>
          <select v-model="form.barber_id" required>
            <option disabled value="">Select Barber</option>
            <option v-for="barber in filteredBarbers" :key="barber.id" :value="barber.id">
              {{ barber.name }}
            </option>
          </select>
        </div>

        <div class="barber-form-group">
          <label>Date *</label>
          <input type="date" v-model="form.appointment_date" required />
        </div>

        <div class="barber-form-group">
          <label>Time *</label>
          <input type="time" v-model="form.appointment_time" required />
        </div>
      </div>

      <!-- Services -->
      <div class="barber-row">
        <h3>Services</h3>
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

      <button type="submit" class="barber-submit-btn">Update Appointment</button>
    </form>

    <p v-if="message" class="barber-success-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },
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
      return this.serviceItems.reduce((sum, item) => sum + Number(item.price || 0), 0).toFixed(2);
    },
    filteredBarbers() {
      if (!this.form.shift_id) return this.barbers;
      // Show barbers who belong to shift or the selected barber (to keep it visible)
      return this.barbers.filter(
        barber => barber.shift_id === this.form.shift_id || barber.id === this.form.barber_id
      );
    },
  },
  watch: {
    'form.shift_id'(newShiftId) {
      // Reset barber if shift changes and selected barber is not in new shift
      if (!this.filteredBarbers.find(b => b.id === this.form.barber_id)) {
        this.form.barber_id = '';
      }
    },
  },
  mounted() {
    this.loadDropdownData();
    this.loadAppointment();
  },
  methods: {
    async loadDropdownData() {
      try {
        const [barbersRes, customersRes, shiftsRes, servicesRes] = await Promise.all([
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/barbers'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/shifts'),
          fetch('http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/services'),
        ]);
        const [barbersData, customersData, shiftsData, servicesData] = await Promise.all([
          barbersRes.json(),
          customersRes.json(),
          shiftsRes.json(),
          servicesRes.json(),
        ]);
        this.barbers = barbersData.data || barbersData;
        this.customers = customersData.data || customersData;
        this.shifts = shiftsData.data || shiftsData;
        this.services = servicesData.data || servicesData;
      } catch (error) {
        alert('Failed to load dropdown data.');
        console.error(error);
      }
    },

    async loadAppointment() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/appointments/${this.id}`);
        if (!res.ok) throw new Error('Failed to fetch appointment.');
        const data = await res.json();

        this.form = {
          customer_id: data.customer_id,
          shift_id: data.shift_id,
          barber_id: data.barber_id,
          appointment_date: data.appointment_date,
          appointment_time: data.appointment_time.substring(0, 5), // trim seconds for input[type=time]
          notes: data.notes || '',
        };

        // Map your services based on your data structure
        this.serviceItems = (data.services || []).map(service => ({
          service_id: service.service_id,
          price: parseFloat(service.service_price),
        }));

        // If no services, add one blank row
        if (this.serviceItems.length === 0) {
          this.serviceItems = [{ service_id: '', price: 0 }];
        }
      } catch (error) {
        alert('Error loading appointment.');
        console.error(error);
      }
    },

    updateServicePrice(index) {
      const serviceId = this.serviceItems[index].service_id;
      const service = this.services.find(s => s.id === serviceId);
      this.serviceItems[index].price = service ? parseFloat(service.price) : 0;
    },

    addService() {
      this.serviceItems.push({ service_id: '', price: 0 });
    },

    removeService(index) {
      this.serviceItems.splice(index, 1);
    },

    async submitForm() {
      // Validate service selection
      if (this.serviceItems.some(item => !item.service_id)) {
        alert('Please select all services.');
        return;
      }

      const payload = {
        ...this.form,
        service_ids: this.serviceItems.map(item => item.service_id),
        total_amount: this.totalAmount,
      };

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/appointments/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error('Failed to update appointment.');

        this.message = '✅ Appointment updated successfully!';
        // Optional: redirect after delay
        setTimeout(() => this.$router.push('/appoinmentlists'), 1500);
      } catch (error) {
        alert(error.message || 'Something went wrong.');
        console.error(error);
      }
    },
  },
};
</script>

