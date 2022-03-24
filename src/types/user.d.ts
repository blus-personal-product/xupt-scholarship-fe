interface IUser {
  name: string;
  email: string;
  user_id: string;
  avatar: string;
  phone: string;
  identity: "student" | "manager" | "student,manger";
}