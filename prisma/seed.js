import prisma from "../src/lib/prisma.js";

async function main() {
  // Seed Categories
  const coffeeCategory = await prisma.category.upsert({
    where: { name: 'Kopi' },
    update: {},
    create: {
      name: 'Kopi',
      icon: '☕',
      description: 'Berbagai jenis kopi pilihan'
    }
  });

  const drinksCategory = await prisma.category.upsert({
    where: { name: 'Minuman' },
    update: {},
    create: {
      name: 'Minuman',
      icon: '🥤',
      description: 'Minuman segar dan hangat'
    }
  });

  const foodCategory = await prisma.category.upsert({
    where: { name: 'Makanan' },
    update: {},
    create: {
      name: 'Makanan',
      icon: '🍽️',
      description: 'Makanan ringan dan berat'
    }
  });

  // Seed Menu Items - Coffee
  const coffeeItems = [
    {
      name: 'Kopi Hitam',
      price: 8000,
      description: 'Kopi hitam asli tanpa gula',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
      categoryId: coffeeCategory.id
    },
    {
      name: 'Kopi Susu',
      price: 12000,
      description: 'Kopi hitam dengan susu segar',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop',
      categoryId: coffeeCategory.id
    },
    {
      name: 'Cappuccino',
      price: 18000,
      description: 'Kopi dengan foam susu yang creamy',
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=300&h=200&fit=crop',
      categoryId: coffeeCategory.id
    },
    {
      name: 'Espresso',
      price: 15000,
      description: 'Kopi espresso murni yang kuat',
      image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=200&fit=crop',
      categoryId: coffeeCategory.id
    },
    {
      name: 'Latte',
      price: 20000,
      description: 'Kopi dengan susu steamed yang lembut',
      image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=300&h=200&fit=crop',
      categoryId: coffeeCategory.id
    }
  ];

  // Seed Menu Items - Drinks
  const drinkItems = [
    {
      name: 'Es Teh Manis',
      price: 5000,
      description: 'Teh manis dingin yang menyegarkan',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=200&fit=crop',
      categoryId: drinksCategory.id
    },
    {
      name: 'Jus Jeruk',
      price: 10000,
      description: 'Jus jeruk segar alami',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=200&fit=crop',
      categoryId: drinksCategory.id
    },
    {
      name: 'Es Kelapa Muda',
      price: 12000,
      description: 'Air kelapa muda segar dengan daging kelapa',
      image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=300&h=200&fit=crop',
      categoryId: drinksCategory.id
    },
    {
      name: 'Teh Hangat',
      price: 4000,
      description: 'Teh hangat klasik',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
      categoryId: drinksCategory.id
    },
    {
      name: 'Es Campur',
      price: 15000,
      description: 'Es campur dengan topping lengkap',
      image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=300&h=200&fit=crop',
      categoryId: drinksCategory.id
    }
  ];

  // Seed Menu Items - Food
  const foodItems = [
    {
      name: 'Nasi Goreng',
      price: 15000,
      description: 'Nasi goreng spesial dengan telur',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    },
    {
      name: 'Mie Ayam',
      price: 12000,
      description: 'Mie ayam dengan topping lengkap',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    },
    {
      name: 'Roti Bakar',
      price: 8000,
      description: 'Roti bakar dengan selai dan mentega',
      image: 'https://images.unsplash.com/photo-1586985564150-0cac34fe4912?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    },
    {
      name: 'Pisang Goreng',
      price: 6000,
      description: 'Pisang goreng crispy dengan madu',
      image: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    },
    {
      name: 'Sate Ayam',
      price: 18000,
      description: 'Sate ayam dengan bumbu kacang',
      image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    },
    {
      name: 'Gado-gado',
      price: 13000,
      description: 'Gado-gado dengan sayuran segar',
      image: 'https://images.unsplash.com/photo-1596040033229-a0b3b7d7d4e8?w=300&h=200&fit=crop',
      categoryId: foodCategory.id
    }
  ];

  // Create all menu items - Using findFirst + create since name is not unique
  const allMenuItems = [...coffeeItems, ...drinkItems, ...foodItems];
  
  for (const item of allMenuItems) {
    const existingItem = await prisma.menuItem.findFirst({
      where: { name: item.name }
    });
    
    if (!existingItem) {
      await prisma.menuItem.create({
        data: item
      });
    }
  }

  // Seed Tables - can use upsert since number is unique
  const tables = [
    { number: '1', capacity: 2 },
    { number: '2', capacity: 4 },
    { number: '3', capacity: 4 },
    { number: '4', capacity: 2 },
    { number: '5', capacity: 6 },
    { number: '6', capacity: 4 },
    { number: '7', capacity: 2 },
    { number: '8', capacity: 8 }
  ];

  for (const table of tables) {
    await prisma.table.upsert({
      where: { number: table.number },
      update: {},
      create: table
    });
  }

  // Seed Staff
  const staffMembers = [
    {
      name: 'Ahmad Rizki',
      email: 'ahmad@warkopkita.com',
      phone: '081234567890',
      role: 'ADMIN'
    },
    {
      name: 'Siti Nurhaliza',
      email: 'siti@warkopkita.com',
      phone: '081234567891',
      role: 'MANAGER'
    },
    {
      name: 'Budi Santoso',
      email: 'budi@warkopkita.com',
      phone: '081234567892',
      role: 'CASHIER'
    },
    {
      name: 'Dewi Lestari',
      email: 'dewi@warkopkita.com',
      phone: '081234567893',
      role: 'BARISTA'
    },
    {
      name: 'Agus Wijaya',
      email: 'agus@warkopkita.com',
      phone: '081234567894',
      role: 'WAITER'
    }
  ];

  for (const staff of staffMembers) {
    await prisma.staff.upsert({
      where: { email: staff.email },
      update: {},
      create: staff
    });
  }

  // Seed Sample Customer
  const sampleCustomer = await prisma.customer.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      name: 'Pelanggan Contoh',
      email: 'customer@example.com',
      phone: '081234567895',
      address: 'Jl. Contoh No. 123, Jakarta'
    }
  });

  console.log('Database has been seeded successfully!');
  console.log('Created categories:', await prisma.category.count());
  console.log('Created menu items:', await prisma.menuItem.count());
  console.log('Created tables:', await prisma.table.count());
  console.log('Created staff:', await prisma.staff.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });