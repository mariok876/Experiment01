
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
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
    { name: 'View All Permissions', slug: 'permission:view:all' },
    { name: 'View Permission Details', slug: 'permission:view' },
    { name: 'Update Permission', slug: 'permission:update' },

    // Session Permissions
    { name: 'View All Sessions', slug: 'session:view:all' },
    { name: 'Revoke User Session', slug: 'session:revoke' },
  ];

  // Create or update all defined permissions
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { slug: permission.slug },
      update: { name: permission.name },
      create: permission,
    });
  }

  console.log('Permissions seeded successfully.');

  // Create Roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: {
      name: 'ADMIN',
      description: 'Administrator with all permissions',
      permissions: {
        // Connect all existing permissions to the ADMIN role
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

  console.log('Admin user seeded successfully.');
  console.log('Seeding completed.');
};

main()
  .catch(e => {
    console.error('An error occurred during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
