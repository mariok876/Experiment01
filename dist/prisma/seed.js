"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create a comprehensive list of permissions with colon-based slugs
    const permissions = [
        // User Permissions
        { name: 'Create User', slug: 'user:create' },
        { name: 'View All Users', slug: 'user:view:all' },
        { name: 'View User Details', slug: 'user:view' },
        { name: 'Update User', slug: 'user:update' },
        { name: 'Delete User', slug: 'user:delete' },
        // Role Permissions
        { name: 'Create Role', slug: 'role:create' },
        { name: 'View All Roles', slug: 'role:view:all' },
        { name: 'View Role Details', slug: 'role:view' },
        { name: 'Update Role', slug: 'role:update' },
        { name: 'Delete Role', slug: 'role:delete' },
        { name: 'Assign Role to User', slug: 'role:assign' },
        // Permission Permissions
        { name: 'Create Permission', slug: 'permission:create' },
        { name: 'View All Permissions', slug: 'permission:view:all' },
        { name: 'View Permission Details', slug: 'permission:view' },
        { name: 'Update Permission', slug: 'permission:update' },
        { name: 'Delete Permission', slug: 'permission:delete' },
        // Session Permissions
        { name: 'View All Sessions', slug: 'session:view:all' },
        { name: 'Revoke User Session', slug: 'session:revoke' },
    ];
    // Create or update all defined permissions
    for (const permission of permissions) {
        yield prisma.permission.upsert({
            where: { slug: permission.slug },
            update: { name: permission.name },
            create: permission,
        });
    }
    console.log('Permissions seeded successfully.');
    // Create Roles
    const adminRole = yield prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
            name: 'ADMIN',
            description: 'Administrator with all permissions',
            permissions: {
                // Connect all existing permissions to the ADMIN role
                connect: yield prisma.permission.findMany().then(p => p.map(i => ({ id: i.id }))),
            },
        },
    });
    const userRole = yield prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
            name: 'USER',
            description: 'Standard user with basic permissions',
            permissions: {
                // Connect a specific set of permissions for the USER role
                connect: [
                    { slug: 'user:view' },
                    { slug: 'role:view' },
                    { slug: 'permission:view' },
                ],
            },
        },
    });
    console.log('Roles seeded successfully.');
    // Create Admin User if it doesn't exist
    const hashedPassword = yield bcrypt_1.default.hash(process.env.ADMIN_PASSWORD || 'password', 10);
    yield prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });
    console.log('Admin user seeded successfully.');
    console.log('Seeding completed.');
});
main()
    .catch(e => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
