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
                                <h2 style="text-align: center;">THỜI KHÓA BIỂU</h2>
                                <br />
                            </div>
                        </div>


                        <table class="table table-bordered" width="100%" cellspacing="0">
                            <thead>
                                <tr>
                                    <th>Ca/Thứ</th>
                                    <th>Thứ Hai</th>
                                    <th>Thứ Ba</th>
                                    <th>Thứ Tư</th>
                                    <th>Thứ Năm</th>
                                    <th>Thứ Sáu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in dataLichHoc" :key="item.tenCa">
                                    <td>{{ item.tenCa }}</td>
                                    <td>{{ item.thuHai }}</td>
                                    <td>{{ item.thuBa }}</td>
                                    <td>{{ item.thuTu }}</td>
                                    <td>{{ item.thuNam }}</td>
                                    <td>{{ item.thuSau }}</td>

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
            return axios.get(`https://localhost:7186/api/LichHoc/LichHocTheoHS/${maHS}`)
                .then(res => {
                    this.dataLichHoc = res.data;
                    console.log(this.dataLichHoc);
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
    },
}
</script>