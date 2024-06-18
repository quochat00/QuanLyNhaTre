import { createRouter, createWebHistory } from 'vue-router'
import Signin from '../views/Signin.vue'
import SignUp from '../views/SignUp.vue'
import StudentView from '@/views/Students/StudentView.vue'
import TeacherView from '@/views/Teachers/TeacherView.vue'
import ClassView from '@/views/Class/ClassView.vue'
import StudentOfClass from '@/views/Students/StudentOfClass.vue'
import TeacherEdit from '@/views/Teachers/TeacherEdit.vue'
import StudentEdit from '@/views/Students/StudentEdit.vue'
import StudentList from '@/views/Students/StudentList.vue'
import Statistical from '@/views/Statistical.vue'
import ScheduleList from '@/views/Schedules/ScheduleList.vue'
import HocPhiView from '@/views/HocPhis/HocPhiView.vue'
import ScheduleDate from '@/views/Schedules/ScheduleDate.vue'
import DishView from '@/views/Dishes/DishView.vue'
import DishClass from '@/views/Dishes/DishClass.vue'
import AttendanceList from '@/views/DiemDanhs/AttendanceList.vue'
import AttendanceClass from '@/views/DiemDanhs/AttendanceHS.vue'
import HocPhiClass from '@/views/HocPhis/HocPhiClass.vue'
import UserHome from '@/views/Users/UserHome.vue'
import UserOfClass from '@/views/Users/UserOfClass.vue'
import ScheduleUser from '@/views/Users/ScheduleUser.vue'
import AttendanceUser from '@/views/Users/AttendanceUser.vue'
import DishUser from '@/views/Users/DishUser.vue'
import HocPhiUser from '@/views/Users/HocPhiUser.vue'
import StudentTaiKhoan from '@/views/Students/StudentTaiKhoan.vue'
import HocPhiEdit from '@/views/HocPhis/HocPhiEdit.vue'

const checkAuth = () => {
  // Lấy token từ localStorage
  const token = localStorage.getItem('authToken');
  return !!token;
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Signin
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/studentview',
      name: 'studentview',
      component: StudentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/thongke',
      name: 'thongke',
      component: Statistical,
      meta: { requiresAuth: true }
    },
    {
      path: '/studentlist',
      name: 'studentlist',
      component: StudentList,
      meta: { requiresAuth: true }
    },
    {
      path: '/editStudent/:id',
      name: 'Student.edit',
      component: StudentEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView,
      meta: { requiresAuth: true }
    },
    {
      path: '/editTeacher/:id',
      name: 'Teacher.edit',
      component: TeacherEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/classView',
      name: 'classView',
      component: ClassView,
      meta: { requiresAuth: true }
    },
    {
      path: '/stofclass/:id',
      name: 'Class.stofclass',
      component: StudentOfClass,
      meta: { requiresAuth: true }
    },
    {
      path: '/scheduleList/:id',
      name: 'Schedule.Class',
      component: ScheduleList,
      meta: { requiresAuth: true }
    },
    {
      path: '/scheduleDate/:id',
      name: 'Schedule.Date',
      component: ScheduleDate,
      meta: { requiresAuth: true }
    },
    {
      path: '/hocphi',
      name: 'hocphi',
      component: HocPhiView,
      meta: { requiresAuth: true }
    },
    {
      path: '/editHocPhi/:id',
      name: 'Edit.HocPhi',
      component: HocPhiEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/taikhoan',
      name: 'taikhoan',
      component: StudentTaiKhoan,
      meta: { requiresAuth: true }
    },
    {
      path: '/hocphiClass/:id',
      name: 'HocPhi.Class',
      component: HocPhiClass,
      meta: { requiresAuth: true }
    },
    {
      path: '/dishView',
      name: 'DishView',
      component: DishView,
      meta: { requiresAuth: true }
    },
    {
      path: '/dishClass/:id',
      name: 'Dish.Class',
      component: DishClass,
      meta: { requiresAuth: true }
    },
    {
      path: '/attendanceView',
      name: 'AttendanceView',
      component: AttendanceList,
      meta: { requiresAuth: true }
    },
    {
      path: '/attendanceClass/:id',
      name: 'Attendance.Class',
      component: AttendanceClass,
      meta: { requiresAuth: true }
    },
    {
      path: '/userHome/:id',
      name: 'User.Home',
      component: UserHome,
      meta: { requiresAuth: true }
    },
    {
      path: '/userClass/:id',
      name: 'User.Class',
      component: UserOfClass,
      meta: { requiresAuth: true }
    },
    {
      path: '/userSchedule/:id',
      name: 'User.Schedule',
      component: ScheduleUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/userAttendance/:id',
      name: 'User.Attendance',
      component: AttendanceUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/userDish/:id',
      name: 'User.Dish',
      component: DishUser,
      meta: { requiresAuth: true }
    },
    {
      path: '/userHocPhi/:id',
      name: 'User.HocPhi',
      component: HocPhiUser,
      meta: { requiresAuth: true }
    }
  ]
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!checkAuth()) {
      alert('Bạn phải đăng nhập');
      next('/signin');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
