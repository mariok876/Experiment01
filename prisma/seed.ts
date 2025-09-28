
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

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
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'password', 10);
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
