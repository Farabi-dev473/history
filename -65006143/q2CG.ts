import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const mainCategory = await prisma.mainCategories.create({
    data: {
      name: "Test",
      imageUrl: "https://picsum.photos/200",
    },
  });

  // Category
  const category = await prisma.categories.create({
    data: {
        name: "Test",
        imageUrl: "https://picsum.photos/200",
        mainCategoriesId: mainCategory.id,
    },
    });

  // SubCategory
  await prisma.subCategories.create({
    data: { name: "Test", subCategoriesId: category.id },
  });

  //   console.log({mainCategories});
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });