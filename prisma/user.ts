import { UserRole } from '@prisma/client';
export default [{

    userName: "nguyphuquy1",
    email: "nguyphuquy1@gmail.com",
    password: "123",
    emailConfirm: true,
    role: UserRole.admin,
    createAt: String(Date.now()),
    updateAt: String(Date.now()),
    avatar: "https://www.shutterstock.com/image-vector/admin-account-user-avatar-25-260nw-2335684007.jpg",


}]