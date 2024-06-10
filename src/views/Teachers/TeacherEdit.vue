<template>
    <div id="page-top">
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex column">
                <div id="content">
                    <Navbar />
                    <form style="margin: 100px;" @submit.prevent="submitForm()" enctype="multipart/form-data">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="card shadow mb-4">
                                        <div class="card-header py-3">
                                            <h6 class="m-0 font-weight-bold text-primary">Sửa giáo viên</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-gruop">
                                                        <div class="col-lg-8">
                                                            <label for="tenGV">Tên Giáo Viên:</label>
                                                            <input type="text" class="form-control" id="tenGV"
                                                                v-model="formData.tenGV" placeholder="Tên Giáo Viên"
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
                                                </div>
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="email">Email:</label>
                                                            <input type="email" class="form-control" id="email"
                                                                v-model="formData.email" placeholder="Email" required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="vaiTro">Vai Trò:</label>
                                                            <input type="text" class="form-control" id="vaiTro"
                                                                v-model="formData.vaiTro" placeholder="Vai Trò"
                                                                required>
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="xepLoai">Xếp loại:</label>
                                                            <select class="form-control" id="xepLoai"
                                                                v-model="formData.xepLoai" required>
                                                                <option value="0">Giỏi</option>
                                                                <option value="1">Khá</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="modal-footer">
                                                <button type="submit" class="btn btn-primary">Gửi</button>
                                                <router-link to="/teacher">
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
import { useRoute } from 'vue-router';
import { ref } from 'vue';


export default {
    components: {
        Sidebar,
        Navbar
    },
    name: 'TeacherAdd',
    data() {
        return {
            formData: {
                maGV: '',
                tenGV: '',
                diaChi: '',
                sdt: '',
                email: '',
                vaiTro: '',
                xepLoai: '0',
            }
        }
    },
    mounted() { },
    created() {
        const route = useRoute(); // Không thể sử dụng `useRoute` ở đây, vì nó không được import từ router
        const teacherId = ref(route.params.id); // Sử dụng ref để theo dõi giá trị tham số id từ route
        if (teacherId.value) {
            this.getTeacher(teacherId.value);
        }
    },
    methods: {
        getTeacher(teacherId) { // Chuyển đổi thành phương thức của component
            axios.get(`https://localhost:7186/api/GiaoVien/${teacherId}`)
                .then(response => {
                    this.formData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching teacher data:', error);
                });
        },
        submitForm() {
            let formData = new FormData();
            formData.append('maGV', this.formData.maGV);
            formData.append('tenGV', this.formData.tenGV);
            formData.append('diaChi', this.formData.diaChi);
            formData.append('sdt', this.formData.sdt);
            formData.append('email', this.formData.email);
            formData.append('vaiTro', this.formData.vaiTro);
            formData.append('xepLoai', this.formData.xepLoai);

            axios.patch(`https://localhost:7186/api/GiaoVien/${this.formData.maGV}`, formData)
                .then(response => {
                    if (response.data) {
                        alert("Sửa giáo viên thành công!");
                        this.$router.push('/teacher');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.$swal.fire('Lỗi', 'Đã xảy ra lỗi khi thêm giáo viên', 'error');
                });
        }

    }
}
</script>