<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <div id="content">
                    <Navbar />
                    <form @submit.prevent="submitForm" enctype="multipart/form-data">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Cập nhật học phí</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="maHS">Mã học sinh:</label>
                                                            <input type="text" class="form-control" id="maHS"
                                                                v-model="formData.maHS" placeholder="Mã học sinh" disabled
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenHS">Tên học sinh:</label>
                                                            <input type="text" class="form-control" id="tenHS"
                                                                v-model="formData.tenHS" placeholder="Tên học sinh" disabled
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="hanNop">Hạn nộp tiền:</label>
                                                            <input type="date" class="form-control" id="hanNop"
                                                                v-model="formattedHanNop" placeholder="Hạn nộp tiền" disabled
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="soNgayAn">Số ngày ăn:</label>
                                                            <input type="soNgayAn" class="form-control" id="soNgayAn"
                                                                v-model="formData.soNgayAn" placeholder="soNgayAn" disabled
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tongTienAn">Tổng tiền ăn:</label>
                                                            <input type="text" class="form-control" id="tongTienAn"
                                                                v-model="formData.tongTienAn" placeholder="Tổng tiền ăn" disabled
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tongTienHoc">Tổng tiền học:</label>
                                                            <input type="text" class="form-control" id="tongTienHoc" disabled
                                                                v-model="formData.tongTienHoc" required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tongTien">Tổng tiền:</label>
                                                            <input type="text" class="form-control" id="tongTien" disabled
                                                                v-model="formData.tongTien" placeholder="Tổng tiền" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="trangThai">Trạng thái đóng học:</label>
                                                            <input type="text" class="form-control" id="trangThai" 
                                                                v-model="formData.trangThai" required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="ngayDongTien">Ngày đóng tiền:</label>
                                                            <input type="date" class="form-control" id="ngayDongTien"
                                                                v-model="formattedThoiGianNop" placeholder="Ngày đóng tiền"
                                                                required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-primary">Gửi</button>
                                                <router-link to="/studentlist">
                                                    <button type="button" class="btn btn-secondary">Hủy</button>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        Sidebar,
        Navbar
    },
    data() {
        return {
            classes: [],
            formData: {
                maHS: '',
                maTH: '',
                tenHS: '',
                hanNop: '',
                soNgayAn: '',
                tongTienAn: '',
                tongTienHoc: '',
                tongTien:'',
                trangThai:'',
                ngayDongTien: '',
            },
        };
    },
    mounted() {
        this.fetchClassData();
    },
    created() {
        const route = useRoute();
        const studentId = route.params.id;
        if (studentId) {
            this.getStudent(studentId);
        }
    },
    methods: {
        getStudent(studentId) {
            axios.get(`https://localhost:7186/api/HocPhi/HocPhiByHS?maHS=${studentId}`)
                .then(response => {
                    this.formData = response.data[0];
                    console.log(this.formData);
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
                });
        },
        fetchClassData() {
            axios.get('https://localhost:7186/api/LopHoc')
                .then(response => {
                    this.classes = response.data;
                })
                .catch(error => {
                    console.error('Error fetching class data:', error);
                });
        },
        submitForm() {
            const formData = new FormData();
            formData.append('maHS', this.formData.maHS);
            formData.append('maTH', this.formData.maTH);
            formData.append('trangThai', this.formData.trangThai);
            formData.append('ngayDongTien', this.formData.ngayDongTien);

            axios.post(`https://localhost:7186/api/HocPhi/AddDulieu`, formData)
                .then(response => {
                    alert("Cập nhật học phí thành công!");
                    this.$router.go(-1);
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Đã xảy ra lỗi khi sửa học sinh');
                });
        },
        formatDate(date) {
            if (!date) return '';
            return date.split('T')[0];
        }
    },
    computed: {
        formattedHanNop: {
            get() {
                return this.formatDate(this.formData.hanNop);
            },
            set(newValue) {
                this.formData.hanNop = newValue;
            }
        },
        formattedThoiGianNop: {
            get() {
                return this.formatDate(this.formData.ngayDongTien);
            },
            set(newValue) {
                this.formData.ngayDongTien = newValue;
            }
        }
    }
};
</script>
