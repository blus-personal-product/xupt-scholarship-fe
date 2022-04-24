interface IUser {
  name: string;
  email: string;
  user_id: string;
  avatar: string;
  phone: string;
  course: number;
  identity: "student" | "manager" | "student,manager";
  student?: IStudentInfo;
  manager?: IManagerInfo;
}

interface IStudentInfo {
  professional: string;
  grade: string;
  class: number;
  college: string;
  type: "bachelor_degree" | "profession_degree"
}

interface IManagerInfo {
  department: string;
  office: string;
  position: string;
}