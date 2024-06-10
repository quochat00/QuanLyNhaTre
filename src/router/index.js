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

let isAuthenticated = false;
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
    },
    {
      path: '/editStudent/:id',
      name: 'Student.edit',
      component: StudentEdit,
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: TeacherView,
    },
    {
      path: '/editTeacher/:id',
      name: 'Teacher.edit',
      component: TeacherEdit
    },
    {
      path: '/classView',
      name: 'classView',
      component: ClassView,
    },
    {
      path: '/stofclass/:id',
      name: 'Class.stofclass',
      component: StudentOfClass,
    },
    {
      path:'/scheduleList/:id',
      name: 'Schedule.Class',
      component: ScheduleList,
    },
    {
      path:'/scheduleDate/:id',
      name: 'Schedule.Date',
      component: ScheduleDate,
    },
    {
      path:'/hocphi',
      name: 'hocphi',
      component: HocPhiView,
    },
    {
      path:'/hocphiClass/:id',
      name: 'HocPhi.Class',
      component: HocPhiClass,
    },
    {
      path:'/dishView',
      name: 'DishView',
      component: DishView,
    },
    {
      path:'/dishClass/:id',
      name: 'Dish.Class',
      component: DishClass,
    },
    {
      path:'/attendanceView',
      name: 'AttendanceView',
      component: AttendanceList,
    },
    {
      path:'/attendanceClass/:id',
      name: 'Attendance.Class',
      component: AttendanceClass,
    },
    {
      path:'/userHome/:id',
      name: 'User.Home',
      component: UserHome,
    },
    {
      path:'/userClass/:id',
      name: 'User.Class',
      component: UserOfClass,
    },
    {
      path:'/userSchedule/:id',
      name: 'User.Schedule',
      component: ScheduleUser,
    },
    {
      path:'/userAttendance/:id',
      name: 'User.Attendance',
      component: AttendanceUser,
    },
    {
      path:'/userDish/:id',
      name: 'User.Dish',
      component: DishUser,
    },
    {
      path:'/userHocPhi/:id',
      name: 'User.HocPhi',
      component:HocPhiUser,
    }


  ]
  
})
// Navigation guard
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//       if (!isAuthenticated) {
//           alert('Bạn phải đăng nhập');
//           next('/signin');
//       } else {
//           next();
//       }
//   } else {
//       next(); // Always call next()!
//   }
// });

export default router
