<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex column">
                <div id="content">
                    <Navbar />
                    <form @submit.prevent="submitForm()" enctype="multipart/form-data">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Sửa học sinh</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-gruop">
                                                        <div class="col-lg-8">
                                                            <label for="tenPH">Tên Phụ Huynh:</label>
                                                            <input type="text" class="form-control" id="tenPH"
                                                                v-model="formData.tenPH" placeholder="Tên Phụ Huynh"
                                                                required>
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="diaChi">Địa chỉ:</label>
                                                            <input type="text" class="form-control" id="diaChi"
                                                                v-model="formData.diaChi" placeholder="Địa chỉ"
                                                                required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="sdt">Số điện thoại:</label>
                                                            <input type="text" class="form-control" id="sdt"
                                                                v-model="formData.sdt" placeholder="Số điện thoại"
                                                                required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="email">Email:</label>
                                                            <input type="text" class="form-control" id="email"
                                                                v-model="formData.email" placeholder="Email" required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenHS">Tên Học Sinh:</label>
                                                            <input type="text" class="form-control" id="tenHS"
                                                                v-model="formData.tenHS" placeholder="Tên Học Sinh"
                                                                required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="ngaySinh">Ngày Sinh:</label>
                                                            <input type="date" class="form-control" id="ngaySinh"
                                                                :value="getDateOfBirth(formData.ngaySinh)" required
                                                                >
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="gioiTinh">Giới Tính:</label>
                                                            <select class="form-control" id="gioiTinh"
                                                                v-model="formData.gioiTinh" required>
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
                                                            <input type="text" class="form-control" id="anhHS"
                                                                v-model="formData.anhHS" placeholder="Ảnh học sinh"
                                                                required>
                                                            <img :src="`/src/assets/images/imgstudent/${formData.anhHS}`" alt="Ảnh học sinh" style="width: 100px; height: auto;">
                                                            <p></p>
                                                            
                                                            <input type="file" class="form-control-file" id="anhHS"
                                                                @change="handleFileChange">
                                                            <img v-if="imageUrl" :src="imageUrl" class="img-fluid"
                                                                alt="Ảnh Học Sinh">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="queQuan">Quê Quán:</label>
                                                            <input type="text" class="form-control" id="queQuan"
                                                                v-model="formData.queQuan" placeholder="Quê Quán">
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="thoiGianNH">Ngày nhập học:</label>
                                                            <input type="date" class="form-control" id="thoiGianNH"
                                                                :value="getDateOfBirth(formData.thoiGianNH)" required
                                                               >
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenLop">Lớp:</label>
                                                            <select class="form-control" id="tenLop"
                                                                v-model="formData.tenLop" required>
                                                                <option v-for="clas in classes" :value="clas.tenLop">{{
                                                                    clas.tenLop }}</option>
                                                            </select>
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';

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
        }
    },
    mounted() {
        this.fetchClassData();
    },
    created() {
        const route = useRoute();
        const studentId = ref(route.params.id);
        if (studentId.value) {
            this.getStudent(studentId.value);
        }
    },
    methods: {
        getStudent(studentId) {
            axios.get(`https://localhost:7186/api/HocSinh/getStudent/${studentId}`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching student data:', error);
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
        getXepLoai(gioiTinh) {
            return gioiTinh === 0 ? "Nam" : "Nữ";
        },
        getDateOfBirth(date) {
            // Kiểm tra nếu ngày nhập học không được định nghĩa hoặc null
            if (!date) return '';
            return date.split('T')[0];
        },
        // updateDate(value) {
        //     // Thực hiện cập nhật giá trị ngày tháng khi người dùng thay đổi input
        //     this.formData.thoiGianNH = value;
        // },
        submitForm() {
            let formData = new FormData();
            formData.append('maHS', this.formData.maHS);
            formData.append('tenPH', this.formData.tenPH);
            formData.append('diaChi', this.formData.diaChi);
            formData.append('sdt', this.formData.sdt);
            formData.append('email', this.formData.email);
            formData.append('tenHS', this.formData.tenHS);
            formData.append('ngaySinh', this.formData.ngaySinh);
            formData.append('gioiTinh', this.formData.gioiTinh);
            formData.append('anhHS', this.formData.anhHS.name);
            formData.append('queQuan', this.formData.queQuan);
            formData.append('tenLop', this.formData.tenLop);
            formData.append('thoiGianNH', this.formData.thoiGianNH);

            axios.patch(`https://localhost:7186/api/HocSinh/updateStudent/${this.formData.maHS}`, formData)
                .then(response => {
                    if (response.data) {
                        alert("Sửa học sinh thành công!");
                        this.$router.push('/studentlist');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi sửa học sinh', 'error');
                });
        },
        handleFileChange(event) {
            this.formData.anhHS = event.target.files[0];
        },
    }
}
</script>