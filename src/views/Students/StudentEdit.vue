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
                                            <h6 class="m-0 font-weight-bold text-primary">Sửa học sinh</h6>
                                        </div>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenPH">Tên Phụ Huynh:</label>
                                                            <input type="text" class="form-control" id="tenPH"
                                                                v-model="formData.tenPH" placeholder="Tên Phụ Huynh"
                                                                required />
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="diaChi">Địa chỉ:</label>
                                                            <input type="text" class="form-control" id="diaChi"
                                                                v-model="formData.diaChi" placeholder="Địa chỉ"
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="sdt">Số điện thoại:</label>
                                                            <input type="text" class="form-control" id="sdt"
                                                                v-model="formData.sdt" placeholder="Số điện thoại"
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="email">Email:</label>
                                                            <input type="email" class="form-control" id="email"
                                                                v-model="formData.email" placeholder="Email" required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenHS">Tên Học Sinh:</label>
                                                            <input type="text" class="form-control" id="tenHS"
                                                                v-model="formData.tenHS" placeholder="Tên Học Sinh"
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="ngaySinh">Ngày Sinh:</label>
                                                            <input type="date" class="form-control" id="ngaySinh"
                                                                v-model="formattedNgaySinh" required />
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
                                                            <br />
                                                            <input type="text" class="form-control" id="anhHS"
                                                                v-model="formData.anhHS" placeholder="Ảnh học sinh"
                                                                required />
                                                            <p></p>
                                                            <input type="file" class="form-control-file" id="anhHS"
                                                                @change="handleFileChange" />
                                                            <img v-if="imageUrl" :src="imageUrl"
                                                                style="width: 100px; height: auto;"
                                                                alt="Ảnh Học Sinh" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="queQuan">Quê Quán:</label>
                                                            <input type="text" class="form-control" id="queQuan"
                                                                v-model="formData.queQuan" placeholder="Quê Quán" />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="thoiGianNH">Ngày nhập học:</label>
                                                            <input type="date" class="form-control" id="thoiGianNH"
                                                                v-model="formattedThoiGianNH" required />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <div class="col-lg-8">
                                                            <label for="tenLop">Lớp:</label>
                                                            <select class="form-control" id="tenLop"
                                                                v-model="formData.maLop" required>
                                                                <option v-for="clas in classes" :value="clas.maLop"
                                                                    :key="clas.maLop">
                                                                    {{ clas.tenLop }}
                                                                </option>
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
                tenPH: '',
                diaChi: '',
                sdt: '',
                email: '',
                tenHS: '',
                ngaySinh: '',
                gioiTinh: '0',
                anhHS: '',
                queQuan: '',
                maLop: '',
                thoiGianNH: ''
            },
            imageUrl: null
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
            axios.get(`https://localhost:7186/api/HocSinh/getStudent/${studentId}`)
                .then(response => {
                    this.formData = response.data;
                    this.imageUrl = `/src/assets/images/imgstudent/${this.formData.anhHS}`;
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
            for (const key in this.formData) {
                if (key === 'anhHS' && typeof this.formData[key] === 'object') {
                    formData.append(key, this.formData[key]);
                } else {
                    formData.append(key, this.formData[key]);
                }
            }

            axios.patch(`https://localhost:7186/api/HocSinh/updateStudent/${this.formData.maHS}`, formData)
                .then(response => {
                    if (response.data) {
                        alert("Sửa học sinh thành công!");
                        this.$router.go(-1);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Đã xảy ra lỗi khi sửa học sinh');
                });
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.formData.anhHS = file.name;
                this.imageUrl = URL.createObjectURL(file);

                // Hiển thị tên file
                document.getElementById('fileNameDisplay').innerText = file.name;
            }
        },

        formatDate(date) {
            if (!date) return '';
            return date.split('T')[0];
        }
    },
    computed: {
        formattedNgaySinh: {
            get() {
                return this.formatDate(this.formData.ngaySinh);
            },
            set(newValue) {
                this.formData.ngaySinh = newValue;
            }
        },
        formattedThoiGianNH: {
            get() {
                return this.formatDate(this.formData.thoiGianNH);
            },
            set(newValue) {
                this.formData.thoiGianNH = newValue;
            }
        }
    }
};
</script>
