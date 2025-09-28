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
const process_1 = __importDefault(require("process"));
const prisma = new client_1.PrismaClient();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create Permissions
    const permissions = [
        { name: 'Create User', slug: 'create_user' },
        { name: 'View Users', slug: 'view_users' },
        { name: 'Edit User', slug: 'edit_user' },
        { name: 'Delete User', slug: 'delete_user' },
        { name: 'Assign Role', slug: 'assign_role' },
    ];
    for (const permission of permissions) {
        yield prisma.permission.upsert({
            where: { slug: permission.slug },
            update: {},
            create: permission,
        });
    }
    // Create Roles
    const allPermissions = yield prisma.permission.findMany();
    const adminRole = yield prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: {
            name: 'ADMIN',
            description: 'Administrator with all permissions',
            permissions: {
                connect: allPermissions.map(p => ({ id: p.id })),
            },
        },
    });
    yield prisma.role.upsert({
        where: { name: 'USER' },
        update: {},
        create: {
            name: 'USER',
            description: 'Standard user with basic permissions',
            permissions: {
                connect: [{ slug: 'view_users' }],
            },
        },
    });
    // Create Admin User
    const hashedPassword = yield bcrypt_1.default.hash(process_1.default.env.ADMIN_PASSWORD || 'password', 10);
    yield prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            roleId: adminRole.id,
        },
    });
    console.log('Seeding completed.');
});
main()
    .catch(e => {
    console.error(e);
    process_1.default.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
