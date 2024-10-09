<template>
    <div class="container-fluid company-details">
        <div class="row">
            <!-- Company Info and Stats -->
            <CompanyHeader />
        </div>
        <div class="p-3 mb-1 bg-white rounded-3">
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex gap-3">
                    <button class="btn btn-primary rounded-3 px-3 py-2">All</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Approved</button>
                    <button class="btn btn-light rounded-3 px-3 py-2">Pending</button>
                </div>
                <div class="d-flex gap-3">
                    <div class="d-flex align-items-center text-center position-relative">
                        <input type="text" class="form-control border-0 py-2 px-3"
                            style="background-color: #F2F4FB; width: 350px;" placeholder="Search">
                        <i class="fas fa-search position-absolute end-0 me-3"></i>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-light bg-white border-0">
                            Filters by <i class="fas fa-filter"></i>
                        </button>
                        <span class="border-start mx-2" style="height: 24px;"></span>
                        <button class="btn btn-light bg-white border-0">
                            Columns <i class="fas fa-columns"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table align-middle mt-5">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Organization <br> Name</th>
                            <th>Title & Description</th>
                            <th>Vertical</th>
                            <th>Order Type</th>
                            <th>Expected <br> Delivery Date & Time</th>
                            <th>Payment</th>
                            <th>Order Amount</th>
                            <th>Payment State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-center ">
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td>98374861</td>
                            <td>
                                <img src="../../assets/images2/Avatar (1).png" />
                                Acme Co.
                            </td>
                            <td>
                                Need business consultant for my startup
                            </td>
                            <td>
                                <img src="../../assets/images2/vertical_img.png" alt="" />
                                Event <br> Management
                            </td>
                            <td>One-Time</td>
                            <td>2020-05-17, 10:00 AM</td>
                            <td>
                                <span class="badge bg-success-subtle text-success">Half Done</span>
                            </td>
                            <td><span class="small-font text-primary">AED</span>32,100</td>
                            <td><span class="badge bg-success-subtle text-success">In Progress</span></td>
                            <td class="d-flex gap-1 py-4">
                                <a href="/super-admin/company-details/appointment/details"
                                    class="text-reset text-decoration-none">
                                    <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                        <i class="fa fa-eye text-primary"></i>
                                    </div>
                                </a>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-trash text-primary"></i>
                                </div>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-share text-primary"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-center ">
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td>98374861</td>
                            <td>
                                <img src="../../assets/images2/Avatar (1).png" />
                                Acme Co.
                            </td>
                            <td>
                                Need business consultant for my startup
                            </td>
                            <td>
                                <img src="../../assets/images2/vertical_img.png" alt="" />
                                Event <br> Management
                            </td>
                            <td>One-Time</td>
                            <td>2020-05-17, 10:00 AM</td>
                            <td>
                                <span class="badge bg-danger-subtle text-danger">Pending</span>
                            </td>
                            <td><span class="small-font text-primary">AED</span>32,100</td>
                            <td><span class="badge bg-success-subtle text-success">In Progress</span></td>
                            <td class="d-flex gap-1 py-4">
                                <a href="/super-admin/company-details/appointment/details"
                                    class="text-reset text-decoration-none">
                                    <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                        <i class="fa fa-eye text-primary"></i>
                                    </div>
                                </a>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-trash text-primary"></i>
                                </div>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-share text-primary"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-center ">
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td>98374861</td>
                            <td>
                                <img src="../../assets/images2/Avatar (1).png" />
                                Acme Co.
                            </td>
                            <td>
                                Need business consultant for my startup
                            </td>
                            <td>
                                <img src="../../assets/images2/vertical_img.png" alt="" />
                                Event <br> Management
                            </td>
                            <td>One-Time</td>
                            <td>2020-05-17, 10:00 AM</td>
                            <td>
                                <span class="badge bg-success-subtle text-success">Half Done</span>
                            </td>
                            <td><span class="small-font text-primary">AED</span>32,100</td>
                            <td><span class="badge bg-success-subtle text-success">In Progress</span></td>
                            <td class="d-flex gap-1 py-4">
                                <a href="/super-admin/company-details/appointment/details"
                                    class="text-reset text-decoration-none">
                                    <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                        <i class="fa fa-eye text-primary"></i>
                                    </div>
                                </a>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-trash text-primary"></i>
                                </div>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-share text-primary"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-center ">
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td>98374861</td>
                            <td>
                                <img src="../../assets/images2/Avatar (1).png" />
                                Acme Co.
                            </td>
                            <td>
                                Need business consultant for my startup
                            </td>
                            <td>
                                <img src="../../assets/images2/vertical_img.png" alt="" />
                                Event <br> Management
                            </td>
                            <td>One-Time</td>
                            <td>2020-05-17, 10:00 AM</td>
                            <td>
                                <span class="badge bg-success-subtle text-success">Half Done</span>
                            </td>
                            <td><span class="small-font text-primary">AED</span>32,100</td>
                            <td><span class="badge bg-warning-subtle text-warning">Waiting</span></td>
                            <td class="d-flex gap-1 py-4">
                                <a href="/super-admin/company-details/appointment/details"
                                    class="text-reset text-decoration-none">
                                    <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                        <i class="fa fa-eye text-primary"></i>
                                    </div>
                                </a>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-trash text-primary"></i>
                                </div>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-share text-primary"></i>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-center ">
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td>98374861</td>
                            <td>
                                <img src="../../assets/images2/Avatar (1).png" />
                                Acme Co.
                            </td>
                            <td>
                                Need business consultant for my startup
                            </td>
                            <td>
                                <img src="../../assets/images2/vertical_img.png" alt="" />
                                Event <br> Management
                            </td>
                            <td>One-Time</td>
                            <td>2020-05-17, 10:00 AM</td>
                            <td>
                                <span class="badge bg-success-subtle text-success">Half Done</span>
                            </td>
                            <td><span class="small-font text-primary">AED</span>32,100</td>
                            <td><span class="badge bg-danger-subtle text-danger">Cancelled</span></td>
                            <td class="d-flex gap-1 py-4">
                                <a href="/super-admin/company-details/appointment/details"
                                    class="text-reset text-decoration-none">
                                    <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                        <i class="fa fa-eye text-primary"></i>
                                    </div>
                                </a>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-trash text-primary"></i>
                                </div>
                                <div class="p-2 border border-1 border-primary rounded-3 d-flex align-items-center">
                                    <i class="fa fa-share text-primary"></i>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import CompanyHeader from '../../components/CompanyHeader.vue';
</script>