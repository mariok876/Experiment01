"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const main = async () => {
    // Create Permissions
    const permissions = [
        { name: 'Create User', slug: 'create_user' },
        { name: 'View Users', slug: 'view_users' },
        { name: 'Edit User', slug: 'edit_user' },
        { name: 'Delete User', slug: 'delete_user' },
        { name: 'Assign Role', slug: 'assign_role' },
    ];
    for (const permission of permissions) {
        await prisma.permission.upsert({
            where: { slug: permission.slug },
            update: {},
            create: permission,
        });
    }
    // Create Roles
    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
            name: 'ADMIN',
            description: 'Administrator with all permissions',
            permissions: {
                connect: await prisma.permission.findMany().then(p => p.map(i => ({ id: i.id }))),
            },
        },
    });
    const userRole = await prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
            name: 'USER',
            description: 'Standard user with basic permissions',
            permissions: {
                connect: [
                    { slug: 'view_users' },
                ],
            },
        },
    });
    // Create Admin User
    const hashedPassword = await bcrypt_1.default.hash(process.env.ADMIN_PASSWORD || 'password', 10);
    await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });
    console.log('Seeding completed.');
};
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
