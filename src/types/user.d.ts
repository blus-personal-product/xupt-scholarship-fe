interface IUser {
  name: string;
  email: string;
  user_id: string;
  avatar: string;
  phone: string;
  identity: "student" | "manager" | "student,manager";
}

interface IStudentInfo {
  professional: string;
  grade: number;
  class: number;
  college: string;
}

interface IManagerInfo {
  department: string;
  office: string;
  position: string;
}