<template>
    <div id="wrapper">
        <SidebarUser />
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">
                <NavbarUser />
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Thông tin học sinh</h6>
                                        </div>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="tenPH">Tên Phụ Huynh:</label>
                                                        <input type="text" class="form-control" id="tenPH"
                                                            v-model="formData.tenPH" placeholder="Tên Phụ Huynh"
                                                            required disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="diaChi">Địa chỉ:</label>
                                                        <input type="text" class="form-control" id="diaChi"
                                                            v-model="formData.diaChi" placeholder="Địa chỉ" required
                                                            disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="sdt">Số điện thoại:</label>
                                                        <input type="text" class="form-control" id="sdt"
                                                            v-model="formData.sdt" placeholder="Số điện thoại" required
                                                            disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="tenHS">Tên Học Sinh:</label>
                                                        <input type="text" class="form-control" id="tenHS"
                                                            v-model="formData.tenHS" placeholder="Tên Học Sinh"
                                                            required disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="ngaySinh">Ngày Sinh:</label>
                                                        <input type="date" class="form-control" id="ngaySinh"
                                                            :value="getDateOfBirth(formData.ngaySinh)" required
                                                            @input="updateDate($event.target.value)" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="gioiTinh">Giới Tính:</label>
                                                        <select class="form-control" id="gioiTinh"
                                                            v-model="formData.gioiTinh" required disabled>
                                                            <option value="0">Nam</option>
                                                            <option value="1">Nữ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="anhHS">Ảnh Học Sinh:</label>
                                                        <br>
                                                        <img :src="`/src/assets/images/imgstudent/${formData.anhHS}`"
                                                            alt="Ảnh học sinh" style="width: 100px; height: auto;">
                                                        <p></p>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="queQuan">Quê Quán:</label>
                                                        <input type="text" class="form-control" id="queQuan"
                                                            v-model="formData.queQuan" placeholder="Quê Quán" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="thoiGianNH">Ngày nhập học:</label>
                                                        <input type="date" class="form-control" id="thoiGianNH"
                                                            :value="getDateOfBirth(formData.thoiGianNH)" required dirname=""
                                                            @input="updateDate($event.target.value)" disabled>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="tenLop">Lớp:</label>
                                                        <select class="form-control" id="tenLop"
                                                            v-model="formData.tenLop" required disabled>
                                                            <option v-for="clas in classes" :value="clas.tenLop" >{{
                                                                clas.tenLop }}</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-8">
                                                        <label for="email">Email:</label>
                                                        <input type="text" class="form-control" id="email"
                                                            v-model="formData.email" placeholder="Email" required disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import SidebarUser from '@/components/SidebarUser.vue';
import router from '@/router/index.js';
import { useRoute } from 'vue-router';
import NavbarUser from '@/components/NavbarUser.vue';

export default {
    components: {
        SidebarUser,
        NavbarUser,
    },
    data() {
        return {
            student: [],
            classes: [],
            formData: {
                maHS: '',
                tenPH: '',
                diaChi: '',
                sdt: '',
                email: '',
                tenHS: '',
                ngaySinh: '',
                gioiTinh: '0',
                anhHS: null,
                queQuan: '',
                tenLop: '',
                thoiGianNH: ''
            }
        };
    },
    created() {
        const route = useRoute();
        const studentId = route.params.id;
        if (studentId) {
            this.getStudent(studentId);
        }
        this.fetchClassData();
    },
    methods: {
        getStudent(studentId) {
            axios.get(`https://localhost:7186/api/HocSinh/getStudent/${studentId}`)
                .then(res => {
                    this.formData = res.data;
                    console.log(this.formData.tenHS);
                })
                .catch(error => {
                    console.error('Fetch data failed:', error);
                });
        },
        fetchClassData() {
            axios.get(`https://localhost:7186/api/LopHoc`)
                .then(res => {
                    this.classes = res.data;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        getDateOfBirth(ngayNhapHoc) {
            // Kiểm tra nếu ngày nhập học không được định nghĩa hoặc null
            if (!ngayNhapHoc) return '';
            return ngayNhapHoc.split('T')[0];
        },
        updateDate(value) {
            // Thực hiện cập nhật giá trị ngày tháng khi người dùng thay đổi input
            this.formData.thoiGianNH = value;
        },
    }
};

</script>