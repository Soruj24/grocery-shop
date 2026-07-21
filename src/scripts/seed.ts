import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import dbConnect from '@/config/mongodb';
import Product from '@/schemas/Product';
import Category from '@/schemas/Category';
import { PRODUCT_BRANDS } from '@/constants/brands';

const mainCategories = [
  "চাল (Rice)", "ডাল (Lentils)", "তেল ও ঘি (Oil & Ghee)", "মশলা (Spices)", 
  "চিনি ও লবণ (Sugar & Salt)", "চা ও কফি (Tea & Coffee)", "বিস্কুট ও স্ন্যাকস (Biscuits & Snacks)", 
  "নুডলস ও পাস্তা (Noodles & Pasta)", "পানীয় (Beverages)", "সাবান ও ডিটারজেন্ট (Soap & Detergent)", 
  "ব্যক্তিগত যত্ন (Personal Care)", "শিশু খাদ্য (Baby Food)", "ফল ও সবজি (Fruits & Vegetables)", 
  "আটা ও ময়দা (Flour & Grains)", "বেকারি আইটেম (Bakery)", "হিমায়িত খাদ্য (Frozen Foods)", 
  "দুগ্ধজাত পণ্য (Dairy)", "মাছ ও মাংস (Fish & Meat)", "গৃহস্থালি সরঞ্জাম (Household)", 
  "স্টেশনারি (Stationery)"
];

const subCategoryPrefixes = [
  "প্রিমিয়াম", "দেশি", "আমদানিকৃত", "অর্গানিক", "স্পেশাল", "বাজেট", "তাজা", "প্যাকেটজাত", "গুড়া", "আস্ত"
];

const productPrefixes = [
  "সেরা মানের", "তাজা", "খাটি", "প্রিমিয়াম", "স্পেশাল"
];

async function seed() {
  try {
    console.log('Connecting to database...');
    await dbConnect();

    console.log('Cleaning existing data...');
    await Category.deleteMany({});
    await Product.deleteMany({});

    const categories = [];
    const products = [];

    console.log('Generating 300 categories...');
    
    // 1. Create 20 Main Categories
    for (let i = 0; i < mainCategories.length; i++) {
      const mainCat = await Category.create({
        name: mainCategories[i],
        image: `https://picsum.photos/seed/${encodeURIComponent(mainCategories[i])}/500/500`,
        isActive: true
      });
      categories.push(mainCat);

      // 2. Create 14 Sub-categories for each Main Category (Total 20 * 14 = 280)
      // Total categories = 20 + 280 = 300
      for (let j = 1; j <= 14; j++) {
        const prefix = subCategoryPrefixes[j % subCategoryPrefixes.length];
        const subCatName = `${prefix} ${mainCategories[i]} ${j}`;
        
        const subCat = await Category.create({
          name: subCatName,
          parentId: mainCat._id,
          image: `https://picsum.photos/seed/${encodeURIComponent(subCatName)}/500/500`,
          isActive: true
        });
        categories.push(subCat);

        // 3. Create 2-3 products for each sub-category
        const productCount = Math.floor(Math.random() * 2) + 2;
        for (let k = 1; k <= productCount; k++) {
          const prodPrefix = productPrefixes[Math.floor(Math.random() * productPrefixes.length)];
          const productName = `${prodPrefix} ${subCatName} Item ${k}`;
          const basePrice = Math.floor(Math.random() * 1000) + 50;
          const seed = encodeURIComponent(productName);

          const gallery = [
            `https://picsum.photos/seed/${seed}/800/800`,
            `https://picsum.photos/seed/${seed}-2/800/800`,
            `https://picsum.photos/seed/${seed}-3/800/800`,
            `https://picsum.photos/seed/${seed}-4/800/800`,
          ];

          const hasVideo = k % 3 === 0;
          const has360 = k % 2 === 0;
          const hasVariant = k % 2 === 1;

          const variantGroups = hasVariant
            ? [
                {
                  name: "ওজন",
                  options: [
                    { label: "১ কেজি", price: basePrice, stock: Math.floor(Math.random() * 50) + 5 },
                    { label: "২ কেজি", price: basePrice * 2 - 20, stock: Math.floor(Math.random() * 40) + 5 },
                    { label: "৫ কেজি", price: basePrice * 5 - 80, stock: Math.floor(Math.random() * 30) + 5 },
                  ],
                },
              ]
            : [];

          const specifications = [
            { label: "ব্র্যান্ড", value: PRODUCT_BRANDS[Math.floor(Math.random() * PRODUCT_BRANDS.length)] },
            { label: "উৎপত্তি", value: "বাংলাদেশ" },
            { label: "স্টোরেজ", value: "শুকনো ও ঠান্ডা স্থানে রাখুন" },
            { label: "শেলফ লাইফ", value: "৬ মাস" },
            { label: "ওজন", value: "১ কেজি" },
          ];

          const questions = [
            {
              question: "এটি কি ফ্রেশ?",
              answer: "হ্যাঁ, আমরা সবসময় তাজা পণ্য ডেলিভারি দিই।",
              user: "ক্রেতা",
              createdAt: new Date().toISOString(),
            },
            {
              question: "ডেলিভারি কতক্ষণ লাগে?",
              answer: "সাধারণত ৩০ মিনিটের মধ্যে ডেলিভারি পেয়ে যাবেন।",
              user: "ক্রেতা",
              createdAt: new Date().toISOString(),
            },
          ];

          products.push({
            name: productName,
            description: `${productName} এর বিস্তারিত বিবরণ এখানে দেওয়া হবে। এটি একটি উন্নত মানের পণ্য।`,
            price: basePrice,
            brand: PRODUCT_BRANDS[Math.floor(Math.random() * PRODUCT_BRANDS.length)],
            category: subCat._id,
            image: gallery[0],
            images: gallery,
            video: hasVideo
              ? "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              : undefined,
            view360: has360 ? gallery.slice(0, 4) : [],
            stock: Math.floor(Math.random() * 100) + 10,
            unit: "কেজি/পিস",
            variants: variantGroups,
            specifications,
            questions,
            aiSummary: `এই ${productName} পণ্যটি ক্রেতাদের কাছে বেশ জনপ্রিয়। সাশ্রয়ী মূল্যে উচ্চ মানের এবং দ্রুত ডেলিভারি পাওয়া যায়। বেশিরভাগ ক্রেতা পণ্যের গুণমান ও ফ্রেশনেস নিয়ে সন্তুষ্ট।`,
            isActive: true
          });
        }
      }
    }

    console.log(`Inserting ${products.length} products...`);
    await Product.insertMany(products);

    console.log('Seeding completed successfully!');
    console.log(`Total Categories: ${categories.length}`);
    console.log(`Total Products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
