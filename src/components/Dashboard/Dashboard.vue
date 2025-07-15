<template>
	<div class="title pb-20">
		<h2 class="h3 mb-0">Barberflow Overview</h2>
	</div>

	<div class="row pb-10">
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data">
						<div class="weight-700 font-24 text-dark">{{ dashboard.appos }}</div>
						<div class="font-14 text-secondary weight-500">
							Appointment
						</div>
					</div>
					<div class="widget-icon">
						<div class="icon">
							<i class="icon-copy dw dw-calendar1"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data">
						<div class="weight-700 font-24 text-dark">{{ dashboard.customers }}</div>
						<div class="font-14 text-secondary weight-500">
							Total Customers
						</div>
					</div>
					<div class="widget-icon">
						<div class="icon">
							<span class="icon-copy dw dw-user"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data">
						<div class="weight-700 font-24 text-dark">{{ dashboard.barbers }}</div>
						<div class="font-14 text-secondary weight-500">
							Total Barber
						</div>
					</div>
					<div class="widget-icon">
						<div class="icon">
							<i class="icon-copy bi bi-person-badge-fill" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data">
						<div class="weight-700 font-24 text-dark">{{ dashboard.toin }}</div>
						<div class="font-14 text-secondary weight-500">Earning</div>
					</div>
					<div class="widget-icon">
						<div class="icon">
							<i class="icon-copy fa fa-money" aria-hidden="true"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="row pb-10">
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data" style="background: #F6F6F6;">
						<div class="weight-700 font-24 text-dark">{{ dashboard.appog }}</div>
						<div class="font-14 text-secondary weight-500">
							In Progress
						</div>
					</div>
					<div class="widget-icon" style="background: #948979;">
						<div class="icon" data-color="white">
							<i class="icon-copy bi bi-arrow-repeat"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data" style="background: #F6F6F6;">
						<div class="weight-700 font-24 text-dark">{{ dashboard.appoco }}</div>
						<div class="font-14 text-secondary weight-500">
							Completed
						</div>
					</div>
					<div class="widget-icon" style="background: #948979;">
						<div class="icon" data-color="white">
							<i class="icon-copy bi bi-flag-fill"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data" style="background: #F6F6F6;">
						<div class="weight-700 font-24 text-dark">{{ dashboard.services }}</div>
						<div class="font-14 text-secondary weight-500">
							Total Services
						</div>
					</div>
					<div class="widget-icon" style="background: #948979;">
						<div class="icon" data-color="white">
							<i class="icon-copy bi bi-scissors"></i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-xl-3 col-lg-3 col-md-6 mb-20">
			<div class="card-box height-100-p widget-style3">
				<div class="d-flex flex-wrap">
					<div class="widget-data" style="background: #F6F6F6;">
						<div class="weight-700 font-24 text-dark">{{ dashboard.feedback }}</div>
						<div class="font-14 text-secondary weight-500">
							Total Feedback
						</div>
					</div>
					<div class="widget-icon" style="background: #948979;">
						<div class="icon" data-color="white">
							<i class="icon-copy bi bi-star-fill"></i>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>



	<div class="row">
		<div class="col-lg-4 col-md-6 mb-20">
			<div class="card-box height-100-p pd-20 min-height-200px">
				<div class="d-flex justify-content-between pb-10">
					<div class="h5 mb-0">Top Barbers</div>
				</div>
				<div class="user-list">
					<ul>
						<li v-for="barber in dashboard.countfeed" :key="barber.barber_id"
							class="d-flex align-items-center justify-content-between">
							<div class="name-avatar d-flex align-items-center pr-2">
								<div class="avatar mr-2 flex-shrink-0">
									<img :src="barber.barber.photo
										? `http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${barber.barber.photo}`
										: 'https://via.placeholder.com/50?text=No+Img'" class="border-radius-100 box-shadow" width="50"
										height="50" alt="Barber Image" />
								</div>
								<div class="txt">
									<span class="badge badge-pill badge-sm" data-bgcolor="#e7ebf5" data-color="#265ed7">
										{{ parseFloat(barber.average_rating).toFixed(1) }}
									</span>
									<div class="font-14 weight-600">{{ barber.barber.name }}</div>
								</div>
							</div>
							<div class="cta flex-shrink-0">
								<router-link to="/addappoinments" class="btn btn-sm btn-outline-primary">Schedule</router-link>
							</div>
						</li>
					</ul>
				</div>
			</div>

		</div>
		<div class="col-lg-4 col-md-6 mb-20">
			<div class="card-box height-100-p pd-20 min-height-200px">
				<div class="d-flex justify-content-between">
					<div class="h5 mb-0">Costomer Report</div>
					<div class="dropdown">
						<a class="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle" data-color="#1b3133"
							href="#" role="button" data-toggle="dropdown">
							<i class="dw dw-more"></i>
						</a>
						<div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
							<a class="dropdown-item" href="#"><i class="dw dw-eye"></i> View</a>
							<a class="dropdown-item" href="#"><i class="dw dw-edit2"></i> Edit</a>
							<a class="dropdown-item" href="#"><i class="dw dw-delete-3"></i> Delete</a>
						</div>
					</div>
				</div>

				<div id="diseases-chart"></div>
			</div>
		</div>
		<div class="col-lg-4 col-md-12 mb-20">
			<div class="card-box height-100-p pd-20 min-height-200px">
				<div class="max-width-300 mx-auto">
					<img src="/vendors/images/upgrade.svg" alt="" />
				</div>
				<div class="text-center">
					<div class="h5 mb-1">Upgrade to Pro</div>
					<div class="font-14 weight-500 max-width-200 mx-auto pb-20" data-color="#a6a6a7">
						You can enjoy all our features by upgrading to pro.
					</div>
					<a href="#" class="btn btn-primary btn-lg">Upgrade</a>
				</div>
			</div>
		</div>
	</div>

	<div class="card-box pb-10">
		<div class="h5 pd-20 mb-0">Recent Customers</div>
		<table>
			<thead>
				<tr>
					<th class="table-plus">Name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Address</th>
					<th>Created At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="customer in customers" :key="customer.id">
					<td class="table-plus">
						<div class="name-avatar d-flex align-items-center">
							<div class="avatar mr-2 flex-shrink-0">
								<img :src="`http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/${customer.photo}`"
									class="border-radius-100 shadow" width="40" height="40" alt="photo" />
							</div>
							<div class="txt">
								<div class="weight-600">{{ customer.name }}</div>
							</div>
						</div>
					</td>
					<td>{{ customer.phone }}</td>
					<td>{{ customer.email }}</td>
					<td>{{ customer.address }}</td>
					<td>{{ formatDate(customer.created_at) }}</td>
					<td>

						<router-link :to="`/showcustomer/${customer.id}`">
							<button class="action-button view-button">
								<i class="bi bi-eye"></i>
							</button>
						</router-link>
						<router-link :to="`/editcustomer/${customer.id}`">
							<button class="action-button edit-button">
								<i class="bi bi-pencil"></i>
							</button>
						</router-link>
						<button class="action-button delete-button" @click="deletecustomer(customer.id)">
							<i class="bi bi-trash"></i>
						</button>

					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="title pb-20 pt-20">
		<h2 class="h3 mb-0">Quick Start</h2>
	</div>

	<div class="row">
		<div class="col-md-4 mb-20">
			<a href="#" class="card-box d-block mx-auto pd-20 text-secondary">
				<div class="img pb-30">
					<img src="/vendors/images/medicine-bro.svg" alt="" />
				</div>
				<div class="content">
					<h3 class="h4">Services</h3>
					<p class="max-width-200">
						We provide superior health care in a compassionate maner
					</p>
				</div>
			</a>
		</div>
		<div class="col-md-4 mb-20">
			<a href="#" class="card-box d-block mx-auto pd-20 text-secondary">
				<div class="img pb-30">
					<img src="/vendors/images/remedy-amico.svg" alt="" />
				</div>
				<div class="content">
					<h3 class="h4">Medications</h3>
					<p class="max-width-200">
						Look for prescription and over-the-counter drug information.
					</p>
				</div>
			</a>
		</div>
		<div class="col-md-4 mb-20">
			<a href="#" class="card-box d-block mx-auto pd-20 text-secondary">
				<div class="img pb-30">
					<img src="/vendors/images/paper-map-cuate.svg" alt="" />
				</div>
				<div class="content">
					<h3 class="h4">Locations</h3>
					<p class="max-width-200">
						Convenient locations when and where you need them.
					</p>
				</div>
			</a>
		</div>
	</div>

	<div class="footer-wrap pd-20 mb-20 card-box">
		BarberFlow Management Stytem by
		<a href="https://github.com/didar044" target="_blank">Md Didarul Islam</a>
	</div>
</template>

<script>
export default {

	data() {
		return {
			dashboard: {},
			customers: [],
		};
	},
	methods: {
		async fetchDashboard() {
			try {
				const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/dashboards");
				if (response.ok) {
					const data = await response.json();
					this.dashboard = data.data || data;
				} else {
					throw new Error("Failed to fetch Dashboard");
				}
			} catch (error) {
				console.error("Dashboard Fetch Error:", error);
				alert("Failed to load dashboard");
			}
		},
		async fetchCustomers() {
			try {
				const response = await fetch("http://didar.intelsofts.com/Laravel_Vue/B_Backend/public/api/customers");
				if (!response.ok) throw new Error("Failed to fetch customers");
				const result = await response.json();
				this.customers = (result.data || result).slice(-4).reverse();
			} catch (error) {
				console.error("Customer Fetch Error:", error);
				alert("Failed to load customer data");
			}
		},
		formatDate(dateStr) {
			const date = new Date(dateStr);
			return date.toLocaleDateString();
		},
	},
	mounted() {
		this.fetchDashboard();
		this.fetchCustomers();
	},
};
</script>
