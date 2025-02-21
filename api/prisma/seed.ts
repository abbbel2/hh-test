import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Check if the menu already exists
  const existingMenu = await prisma.menu.findUnique({
    where: { name: "System Management" },
  });

  if (!existingMenu) {
    await prisma.menu.create({
      data: {
        name: "System Management",
      },
    });
    console.log("✅ 'System Management' menu added!");
  } else {
    console.log("⚠️ 'System Management' menu already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
