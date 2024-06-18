<template>
    <div id="page-top">
        <div id="wrapper">
            <SidebarUser />
            <div class="container-fluid">
                <NavbarUser />
                <div class="card shadow mb-4">
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-primary">Thông tin lớp học</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenLop">Tên Lớp:</label>
                                        <input type="text" disabled class="form-control" id="tenLop"
                                            v-model="dataLopHoc.tenLop" placeholder="Tên Lớp" required>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-gruop">
                                    <div class="col-lg-8">
                                        <label for="tenGV">Chủ nhiệm:</label>
                                        <input type="text" disabled class="form-control" id="tenGV"
                                            v-model="dataLopHoc.tenGV" placeholder="Chủ nhiệm" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4">
                    <div class="card-body">
                        <div class="table-responsive">
                            <div>
                                <div class="d-flex justify-content-end mb-3">
                                </div>
                                <h2 style="text-align: center;">THỰC ĐƠN MÓN ĂN</h2>
                                <br />
                            </div>
                        </div>


                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Sáng</th>
                                        <th>Trưa</th>
                                        <th>Chiều</th>
                                    </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in dataThucDon" :key="item.ngay">
                                    <td>{{ getDate(item.ngay) }}</td>
                                    <td>{{ item.caSang }}</td>
                                    <td>{{ item.caTrua }}</td>
                                    <td>{{ item.caChieu }}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';
import router from '@/router/index.js';
import SidebarUser from '@/components/SidebarUser.vue';
import NavbarUser from '@/components/NavbarUser.vue';

export default {
    components: {
        SidebarUser,
        NavbarUser,
    },
    name: 'LichHocList',
    data() {
        return {
            classes: [],
            dataThucDon:[],
            dataLopHoc: {
                tenLop: '',
                tenGV: '',
                soLuongHS: '',
            },
        }
    },
    mounted() {
        this.fetchDataLichHoc();
        this.fetchDataLopHoc();
    },
    methods: {
        fetchDataLichHoc() {
            const maHS = this.$route.params.id;
            return axios.get(`https://localhost:7186/api/ThucDon/byMaHS/${maHS}`)
                .then(res => {
                    this.dataThucDon = res.data;
                    console.log(this.dataThucDon);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        fetchDataLopHoc() {
            const maHS = this.$route.params.id;
            axios.get(`https://localhost:7186/api/LopHoc/HocSinh?maHS=${maHS}`)
                .then(res => {
                    this.dataLopHoc = res.data[0];
                    console.log(this.dataLopHoc);
                });
        },
        getDate(ngayAn) {
            return ngayAn.split('T')[0];
        },
    },
}
</script>