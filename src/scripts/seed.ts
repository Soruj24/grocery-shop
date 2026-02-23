import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import dbConnect from '../lib/mongodb';
import Product from '../models/Product';
import Category from '../models/Category';

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
          
          products.push({
            name: productName,
            description: `${productName} এর বিস্তারিত বিবরণ এখানে দেওয়া হবে। এটি একটি উন্নত মানের পণ্য।`,
            price: Math.floor(Math.random() * 1000) + 50,
            category: subCat._id,
            image: `https://picsum.photos/seed/${encodeURIComponent(productName)}/500/500`,
            stock: Math.floor(Math.random() * 100) + 10,
            unit: "কেজি/পিস",
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
