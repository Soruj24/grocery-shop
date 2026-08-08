import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import dbConnect from '@/config/mongodb';
import Product from '@/schemas/Product';
import Category from '@/schemas/Category';
import Brand from '@/schemas/Brand';

// ============================================================================
// BRANDS
// ============================================================================
const brands = [
  { name: "FreshFarm", slug: "freshfarm", image: "https://picsum.photos/seed/brand-freshfarm/200/200", description: "তাজা কৃষিজাত পণ্য", isActive: true },
  { name: "OrganicCo", slug: "organicco", image: "https://picsum.photos/seed/brand-organicco/200/200", description: "অর্গানিক পণ্য", isActive: true },
  { name: "GoldenGrain", slug: "goldengrain", image: "https://picsum.photos/seed/brand-goldengrain/200/200", description: "সোনালি শস্য পণ্য", isActive: true },
  { name: "NatureBest", slug: "naturebest", image: "https://picsum.photos/seed/brand-naturebest/200/200", description: "প্রকৃতির সেরা", isActive: true },
  { name: "DailyHarvest", slug: "dailyharvest", image: "https://picsum.photos/seed/brand-dailyharvest/200/200", description: "দৈনিক ফসল", isActive: true },
  { name: "GreenLeaf", slug: "greenleaf", image: "https://picsum.photos/seed/brand-greenleaf/200/200", description: "সবুজ পাতা", isActive: true },
  { name: "PureRoot", slug: "pureroot", image: "https://picsum.photos/seed/brand-pureroot/200/200", description: "বিশুদ্ধ মূল", isActive: true },
  { name: "FarmToHome", slug: "farmtohome", image: "https://picsum.photos/seed/brand-farmtohome/200/200", description: "খামার থেকে ঘরে", isActive: true },
  { name: "SweetOrchard", slug: "sweetchard", image: "https://picsum.photos/seed/brand-sweetchard/200/200", description: "মিষ্টি বাগান", isActive: true },
  { name: "AquaFresh", slug: "aquafresh", image: "https://picsum.photos/seed/brand-aquafresh/200/200", description: "জলজ সতেজ", isActive: true },
  { name: "Rupchanda", slug: "rupchanda", image: "https://picsum.photos/seed/brand-rupchanda/200/200", description: "রূপচাঁদা পণ্য", isActive: true },
  { name: "PranRuchir", slug: "pranruchir", image: "https://picsum.photos/seed/brand-pranruchir/200/200", description: "প্রাণ রুচির", isActive: true },
  { name: "Radhuni", slug: "radhuni", image: "https://picsum.photos/seed/brand-radhuni/200/200", description: "রাধুনী মশলা", isActive: true },
  { name: "Teer", slug: "teer", image: "https://picsum.photos/seed/brand-teer/200/200", description: "তীর চাল", isActive: true },
  { name: "Fresh", slug: "fresh", image: "https://picsum.photos/seed/brand-fresh/200/200", description: "ফ্রেশ পণ্য", isActive: true },
];

const brandNames = brands.map(b => b.name);

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================
interface CategoryDef {
  name: string;
  keyword: string;
  products: { name: string; price: number; unit: string; desc: string }[];
}

const categoryDefs: CategoryDef[] = [
  {
    name: "চাল (Rice)",
    keyword: "rice",
    products: [
      { name: "কাস্টম মিনিকেট চাল", price: 120, unit: "কেজি", desc: "উন্নত মানের মিনিকেট চাল, তাজা ও সুগন্ধি।" },
      { name: "পোলাও চাল", price: 150, unit: "কেজি", desc: "মোটিশ পোলাও চাল, লম্বা ও সাদা।" },
      { name: "চিনিগ্রাস বাসমতি চাল", price: 180, unit: "কেজি", desc: "বাসমতি চাল, পোলাও ও বিরিয়ানির জন্য আদর্শ।" },
      { name: "ব্রোইলার চিকেন চাল", price: 95, unit: "কেজি", desc: "দৈনিক ব্যবহারের জন্য মানসম্মত চাল।" },
      { name: "জিআ সাদা চাল", price: 110, unit: "কেজি", desc: "জিআ প্রজাতির সাদা চাল।" },
      { name: "নাজিরশাহ চাল", price: 130, unit: "কেজি", desc: "নাজিরশাহ চাল, সুগন্ধি ও মানসম্মত।" },
      { name: "লালচাল", price: 85, unit: "কেজি", desc: "পুষ্টিসমৃদ্ধ লাল চাল।" },
      { name: "সেলিব্রেশন খাইরা চাল", price: 200, unit: "কেজি", desc: "প্রিমিয়াম খাইরা চাল।" },
      { name: "স্বর্ণা চাল", price: 105, unit: "কেজি", desc: "সোনালি রঙের স্বর্ণা চাল।" },
      { name: "ফুলবাজার চিনি", price: 140, unit: "কেজি", desc: "ফুলবাজার প্রকারের চাল।" },
      { name: "আইআর-৩৬ চাল", price: 78, unit: "কেজি", desc: "সাধারণ ব্যবহারের আইআর-৩৬ চাল।" },
      { name: "ব্রাউন রাইস", price: 160, unit: "কেজি", desc: "স্বাস্থ্যকর ব্রাউন রাইস।" },
      { name: "চিনিগ্রাস বাসমতি পোলাও", price: 195, unit: "কেজি", desc: "পোলাওর জন্য বিশেষ বাসমতি।" },
      { name: "পেশোয়ারি চাল", price: 170, unit: "কেজি", desc: "পেশোয়ারি ধরনের চাল।" },
      { name: "মিনিকেট সাদা চাল", price: 115, unit: "কেজি", desc: "সাদা মিনিকেট চাল।" },
    ],
  },
  {
    name: "ডাল (Lentils)",
    keyword: "lentil",
    products: [
      { name: "মসুর ডাল", price: 130, unit: "কেজি", desc: "লাল মসুর ডাল, দ্রুত সেদ্ধ হয়।" },
      { name: "মুগ ডাল", price: 145, unit: "কেজি", desc: "সবুজ মুগ ডাল, পুষ্টিসমৃদ্ধ।" },
      { name: "ছোলা ডাল", price: 155, unit: "কেজি", desc: "কালো ছোলা ডাল।" },
      { name: "কালায়ত ডাল", price: 165, unit: "কেজি", desc: "কালায়ত ডাল, মানসম্মত।" },
      { name: "রাজমা ডাল", price: 175, unit: "কেজি", desc: "লাল রাজমা ডাল।" },
      { name: "তুর ডাল", price: 125, unit: "কেজি", desc: "হলুদ তুর ডাল।" },
      { name: "মসুর ডাল পেস্ট", price: 140, unit: "কেজি", desc: "পিষ্ট মসুর ডাল।" },
      { name: "মাশকলাই ডাল", price: 135, unit: "কেজি", desc: "মাশকলাই ডাল।" },
      { name: "চাকি ডাল", price: 120, unit: "কেজি", desc: "চাকি ডাল, সাশ্রয়ী মূল্যে।" },
      { name: "বুট ডাল", price: 150, unit: "কেজি", desc: "বুট ডাল, পুষ্টিকর।" },
      { name: "আসলি মসুর ডাল", price: 160, unit: "কেজি", desc: "আসলি মসুর ডাল, উন্নত মান।" },
      { name: "ডাল মিক্স", price: 145, unit: "কেজি", desc: "বিভিন্ন ডালের মিশ্রণ।" },
    ],
  },
  {
    name: "তেল ও ঘি (Oil & Ghee)",
    keyword: "oil",
    products: [
      { name: "সয়াবিন তেল", price: 180, unit: "লিটার", desc: "শুদ্ধ সয়াবিন তেল।" },
      { name: "সূর্যমুখী তেল", price: 200, unit: "লিটার", desc: "সূর্যমুখী তেল, স্বাস্থ্যকর।" },
      { name: "পাম অয়েল", price: 160, unit: "লিটার", desc: "পাম তেল।" },
      { name: "রিফাইনড সয়াবিন", price: 190, unit: "লিটার", desc: "রিফাইনড সয়াবিন তেল।" },
      { name: "মাস্টার সয়াবিন তেল", price: 175, unit: "লিটার", desc: "মাস্টার ব্র্যান্ডের সয়াবিন তেল।" },
      { name: "পুরান গরুর ঘি", price: 450, unit: "লিটার", desc: "আসল পুরান গরুর ঘি।" },
      { name: "ফরচুন সয়াবিন তেল", price: 195, unit: "লিটার", desc: "ফরচুন ব্র্যান্ডের সয়াবিন তেল।" },
      { name: "তিলের তেল", price: 350, unit: "লিটার", desc: "শুদ্ধ তিলের তেল।" },
      { name: "নারিকেল তেল", price: 280, unit: "লিটার", desc: "নারিকেল তেল।" },
      { name: "মাখন", price: 320, unit: "কেজি", desc: "তাজা মাখন।" },
      { name: "ডাচ বেবি ঘি", price: 380, unit: "লিটার", desc: "ডাচ বেবি ঘি।" },
      { name: "কাঁড়া তেল", price: 400, unit: "লিটার", desc: "কাঁড়া তেল, বিশেষ সুগন্ধি।" },
    ],
  },
  {
    name: "মশলা (Spices)",
    keyword: "spice",
    products: [
      { name: "হলুদ গুঁড়া", price: 80, unit: "কেজি", desc: "শুদ্ধ হলুদ গুঁড়া।" },
      { name: "মরিচ গুঁড়া", price: 120, unit: "কেজি", desc: "তীব্র লাল মরিচ গুঁড়া।" },
      { name: "ধনিয়া গুঁড়া", price: 90, unit: "কেজি", desc: "ধনিয়া গুঁড়া।" },
      { name: "জিরা গুঁড়া", price: 100, unit: "কেজি", desc: "জিরা গুঁড়া।" },
      { name: "তেল মরিচ", price: 150, unit: "কেজি", desc: "তেল মরিচ, ঝাল।" },
      { name: "গরম মশলা", price: 180, unit: "কেজি", desc: "মিশ্র গরম মশলা।" },
      { name: "কালিজিরা গুঁড়া", price: 110, unit: "কেজি", desc: "কালিজিরা গুঁড়া।" },
      { name: "রাধুনি মশলা মিক্স", price: 160, unit: "কেজি", desc: "রাধুনি বিশেষ মশলা মিশ্রণ।" },
      { name: "কারি পাতা", price: 60, unit: "কেজি", desc: "তাজা কারি পাতা।" },
      { name: "লবঙ্গ", price: 200, unit: "কেজি", desc: "লবঙ্গ।" },
      { name: "দারুচিনি", price: 250, unit: "কেজি", desc: "দারুচিনি।" },
      { name: "এলাচ", price: 300, unit: "কেজি", desc: "এলাচ।" },
      { name: "মেথি গুঁড়া", price: 85, unit: "কেজি", desc: "মেথি গুঁড়া।" },
      { name: "পাঁচ ফোরন", price: 140, unit: "কেজি", desc: "পাঁচ ফোরন মশলা।" },
      { name: "কাউন গুঁড়া", price: 75, unit: "কেজি", desc: "কাউন গুঁড়া।" },
    ],
  },
  {
    name: "চিনি ও লবণ (Sugar & Salt)",
    keyword: "sugar",
    products: [
      { name: "চিনি (পাক্কা)", price: 110, unit: "কেজি", desc: "পাক্কা চিনি।" },
      { name: "গুড়", price: 130, unit: "কেজি", desc: "তাজা গুড়।" },
      { name: "লবণ", price: 30, unit: "কেজি", desc: "সাধারণ লবণ।" },
      { name: "বিশেষ লবণ", price: 50, unit: "কেজি", desc: "বিশেষ পরিশোধিত লবণ।" },
      { name: "ব্ল্যাক সল্ট", price: 70, unit: "কেজি", desc: "কালো লবণ।" },
      { name: "ইয়োডিন লবণ", price: 40, unit: "কেজি", desc: "ইয়োডিনযুক্ত লবণ।" },
      { name: "মিশ্রি চিনি", price: 180, unit: "কেজি", desc: "মিশ্রি চিনি।" },
      { name: "ব্রাউন শুগার", price: 150, unit: "কেজি", desc: "ব্রাউন শুগার।" },
      { name: "পাউডার চিনি", price: 120, unit: "কেজি", desc: "পাউডার চিনি।" },
      { name: "চিনি পাক্কা মিক্স", price: 115, unit: "কেজি", desc: "মিশ্রিত চিনি।" },
    ],
  },
  {
    name: "চা ও কফি (Tea & Coffee)",
    keyword: "tea",
    products: [
      { name: "ব্রুক বন্ড রেড লেবল", price: 180, unit: "প্যাকেট", desc: "ব্রুক বন্ড রেড লেবল চা।" },
      { name: "সিলেট ব্ল্যাক টি", price: 220, unit: "প্যাকেট", desc: "সিলেট ব্ল্যাক টি।" },
      { name: "নেসক্যাফে কফি", price: 350, unit: "প্যাকেট", desc: "নেসক্যাফে কফি।" },
      { name: "ব্রুক বন্ড গ্রিন টি", price: 200, unit: "প্যাকেট", desc: "গ্রিন টি।" },
      { name: "টুইনিংস ইংলিশ ব্রাকফাস্ট", price: 450, unit: "প্যাকেট", desc: "টুইনিংস চা।" },
      { name: "নেসক্যাফে ক্লাসিক", price: 380, unit: "প্যাকেট", desc: "নেসক্যাফে ক্লাসিক।" },
      { name: "ম্যাক্সওয়েল হাউজ কফি", price: 320, unit: "প্যাকেট", desc: "ম্যাক্সওয়েল হাউজ।" },
      { name: "গ্রিন টি লেমন", price: 210, unit: "প্যাকেট", desc: "লেমন ফ্লেভার গ্রিন টি।" },
      { name: "এরেল চকলেট কফি", price: 280, unit: "প্যাকেট", desc: "চকলেট ফ্লেভার কফি।" },
      { name: "চা পাতা (পূর্ণা)", price: 160, unit: "প্যাকেট", desc: "পূর্ণা চা পাতা।" },
    ],
  },
  {
    name: "বিস্কুট ও স্ন্যাকস (Biscuits & Snacks)",
    keyword: "biscuit",
    products: [
      { name: "রিলাক্স বিস্কুট", price: 30, unit: "প্যাকেট", desc: "রিলাক্স বিস্কুট।" },
      { name: "গুপ্তা ব্রাদার্স কারামেল", price: 40, unit: "প্যাকেট", desc: "কারামেল বিস্কুট।" },
      { name: "প্রাণ চিজ স্টিক", price: 35, unit: "প্যাকেট", desc: "চিজ স্টিক।" },
      { name: "লে স্টার্চ", price: 25, unit: "প্যাকেট", desc: "লে স্টার্চ স্ন্যাক।" },
      { name: "পুরী স্ন্যাক", price: 30, unit: "প্যাকেট", desc: "পুরী স্ন্যাক।" },
      { name: "প্রিট্জেল", price: 45, unit: "প্যাকেট", desc: "প্রিট্জেল স্ন্যাক।" },
      { name: "লাইস চিপস", price: 20, unit: "প্যাকেট", desc: "লাইস চিপস।" },
      { name: "ফুডিজ নাচোজ", price: 50, unit: "প্যাকেট", desc: "নাচোজ চিপস।" },
      { name: "অরিও বিস্কুট", price: 35, unit: "প্যাকেট", desc: "অরিও বিস্কুট।" },
      { name: "মারি বিস্কুট", price: 25, unit: "প্যাকেট", desc: "মারি বিস্কুট।" },
      { name: "ডাইজেস্টিভ বিস্কুট", price: 30, unit: "প্যাকেট", desc: "ডাইজেস্টিভ বিস্কুট।" },
      { name: "প্রাণ পটাটো চিপস", price: 40, unit: "প্যাকেট", desc: "পটাটো চিপস।" },
      { name: "চকলেট কুকিজ", price: 55, unit: "প্যাকেট", desc: "চকলেট কুকিজ।" },
      { name: "কর্ন স্ন্যাক", price: 30, unit: "প্যাকেট", desc: "কর্ন স্ন্যাক।" },
      { name: "সমুচা স্ন্যাক", price: 45, unit: "প্যাকেট", desc: "সমুচা স্ন্যাক।" },
    ],
  },
  {
    name: "নুডলস ও পাস্তা (Noodles & Pasta)",
    keyword: "noodle",
    products: [
      { name: "ইন্ডোমি মি", price: 25, unit: "প্যাকেট", desc: "ইন্ডোমি মি।" },
      { name: "ম্যাগি নুডলস", price: 20, unit: "প্যাকেট", desc: "ম্যাগি নুডলস।" },
      { name: "চো চো পাস্তা", price: 45, unit: "প্যাকেট", desc: "চো চো পাস্তা।" },
      { name: "ইটালিয়ানো পাস্তা", price: 55, unit: "প্যাকেট", desc: "ইটালিয়ানো পাস্তা।" },
      { name: "রেডি মি নুডলস", price: 30, unit: "প্যাকেট", desc: "রেডি মি নুডলস।" },
      { name: "কিং সোয়া নুডলস", price: 35, unit: "প্যাকেট", desc: "কিং সোয়া নুডলস।" },
      { name: "ইটালিয়ানো ম্যাকারনি", price: 50, unit: "প্যাকেট", desc: "ম্যাকারনি পাস্তা।" },
      { name: "সাম সাম নুডলস", price: 15, unit: "প্যাকেট", desc: "সাম সাম নুডলস।" },
      { name: "নিস্তার নুডলস", price: 28, unit: "প্যাকেট", desc: "নিস্তার নুডলস।" },
      { name: "তৈরি পাস্তা সস", price: 80, unit: "প্যাকেট", desc: "পাস্তা সস।" },
    ],
  },
  {
    name: "পানীয় (Beverages)",
    keyword: "beverage",
    products: [
      { name: "কোকাকোলা", price: 25, unit: "বোতল", desc: "কোকাকোলা।" },
      { name: "স্প্রাইট", price: 25, unit: "বোতল", desc: "স্প্রাইট।" },
      { name: "ফান্টা", price: 25, unit: "বোতল", desc: "ফান্টা।" },
      { name: "মিরিন্ডা", price: 25, unit: "বোতল", desc: "মিরিন্ডা।" },
      { name: "পেপসি", price: 25, unit: "বোতল", desc: "পেপসি।" },
      { name: "মাউনেটিন ডিউ", price: 30, unit: "বোতল", desc: "মাউনেটিন ডিউ।" },
      { name: "স্কট এমর", price: 35, unit: "বোতল", desc: "স্কট এমর।" },
      { name: "রয়েল স্টগ", price: 30, unit: "বোতল", desc: "রয়েল স্টগ।" },
      { name: "প্রাণ জুস (আপেল)", price: 40, unit: "বোতল", desc: "আপেল জুস।" },
      { name: "প্রাণ জুস (পেঁপে)", price: 40, unit: "বোতল", desc: "পেঁপে জুস।" },
      { name: "ফুঁ ফুঁ পানি", price: 20, unit: "বোতল", desc: "মিনারেল পানি।" },
      { name: "মোজার্ট এনার্জি ড্রিঙ্ক", price: 50, unit: "বোতল", desc: "এনার্জি ড্রিঙ্ক।" },
      { name: "এপেল জুস (আম্ব্রুকা)", price: 55, unit: "বোতল", desc: "আম্ব্রুকা জুস।" },
      { name: "রসুন জুস", price: 60, unit: "বোতল", desc: "রসুন জুস।" },
      { name: "লেবু পানি", price: 15, unit: "প্যাকেট", desc: "লেবু পানি।" },
    ],
  },
  {
    name: "ফল ও সবজি (Fruits & Vegetables)",
    keyword: "fruit",
    products: [
      { name: "কলা", price: 60, unit: "কেজি", desc: "তাজা কলা।" },
      { name: "আপেল", price: 200, unit: "কেজি", desc: "তাজা আপেল।" },
      { name: "কমলা", price: 120, unit: "কেজি", desc: "তাজা কমলা।" },
      { name: "পেঁপে", price: 80, unit: "কেজি", desc: "পাকা পেঁপে।" },
      { name: "তরমুজ", price: 40, unit: "কেজি", desc: "মিষ্টি তরমুজ।" },
      { name: "আম", price: 150, unit: "কেজি", desc: "পাকা আম।" },
      { name: "পেয়ারা", price: 100, unit: "কেজি", desc: "পাকা পেয়ারা।" },
      { name: "কাঁঠাল", price: 80, unit: "কেজি", desc: "পাকা কাঁঠাল।" },
      { name: "লিচু", price: 180, unit: "কেজি", desc: "তাজা লিচু।" },
      { name: "জাম", price: 90, unit: "কেজি", desc: "তাজা জাম।" },
      { name: "আলু", price: 40, unit: "কেজি", desc: "তাজা আলু।" },
      { name: "পেঁয়াজ", price: 50, unit: "কেজি", desc: "তাজা পেঁয়াজ।" },
      { name: "টমেটো", price: 60, unit: "কেজি", desc: "তাজা টমেটো।" },
      { name: "শসা", price: 70, unit: "কেজি", desc: "তাজা শসা।" },
      { name: "গাজর", price: 55, unit: "কেজি", desc: "তাজা গাজর।" },
    ],
  },
  {
    name: "দুগ্ধজাত পণ্য (Dairy)",
    keyword: "milk",
    products: [
      { name: "ভ্যালু মিল্ক", price: 65, unit: "লিটার", desc: "ভ্যালু মিল্ক।" },
      { name: "পুরান দই", price: 80, unit: "কেজি", desc: "পুরান দই।" },
      { name: "আমুল চিজ", price: 120, unit: "পিস", desc: "আমুল চিজ।" },
      { name: "পনির", price: 150, unit: "কেজি", desc: "তাজা পনির।" },
      { name: "ল্যাকটোজ ফ্রি মিল্ক", price: 85, unit: "লিটার", desc: "ল্যাকটোজ ফ্রি দুধ।" },
      { name: "ইয়োগার্ট", price: 60, unit: "পিস", desc: "ইয়োগার্ট।" },
      { name: "মিল্কমেইড", price: 90, unit: "টিন", desc: "মিল্কমেইড।" },
      { name: "বাটার", price: 110, unit: "পিস", desc: "মাখন।" },
      { name: "গরুর দুধ", price: 70, unit: "লিটার", desc: "গরুর তাজা দুধ।" },
      { name: "খাবারের ঘি", price: 280, unit: "লিটার", desc: "খাবারের ঘি।" },
      { name: "চিজ স্লাইস", price: 130, unit: "প্যাকেট", desc: "চিজ স্লাইস।" },
      { name: "মিল্ক পাউডার", price: 200, unit: "কেজি", desc: "দুধের পাউডার।" },
    ],
  },
  {
    name: "মাছ ও মাংস (Fish & Meat)",
    keyword: "fish",
    products: [
      { name: "ইলিশ মাছ", price: 500, unit: "কেজি", desc: "তাজা ইলিশ মাছ।" },
      { name: "রুই মাছ", price: 300, unit: "কেজি", desc: "তাজা রুই মাছ।" },
      { name: "পাঙ্গাস মাছ", price: 200, unit: "কেজি", desc: "পাঙ্গাস মাছ।" },
      { name: "চিংড়ি", price: 400, unit: "কেজি", desc: "তাজা চিংড়ি।" },
      { name: "মুরগির মাংস", price: 280, unit: "কেজি", desc: "তাজা মুরগির মাংস।" },
      { name: "গরুর মাংস", price: 600, unit: "কেজি", desc: "তাজা গরুর মাংস।" },
      { name: "খসির মাংস", price: 550, unit: "কেজি", desc: "তাজা খসির মাংস।" },
      { name: "ডিম", price: 120, unit: "পিস", desc: "তাজা ডিম।" },
      { name: "কাঁচা আইলিশ", price: 480, unit: "কেজি", desc: "কাঁচা আইলিশ।" },
      { name: "রোহিতা মাছ", price: 250, unit: "কেজি", desc: "রোহিতা মাছ।" },
      { name: "চ্যাপটা মাছ", price: 220, unit: "কেজি", desc: "চ্যাপটা মাছ।" },
      { name: "মুরগির বাদাম", price: 350, unit: "কেজি", desc: "মুরগির বাদাম।" },
      { name: "কিমা মাংস", price: 320, unit: "কেজি", desc: "কিমা মাংস।" },
      { name: "ফ্রিজার মুরগি", price: 260, unit: "কেজি", desc: "ফ্রিজার মুরগি।" },
      { name: "স্মোকড ফিশ", price: 380, unit: "কেজি", desc: "স্মোকড মাছ।" },
    ],
  },
  {
    name: "সাবান ও ডিটারজেন্ট (Soap & Detergent)",
    keyword: "soap",
    products: [
      { name: "লাইফবয় সাবান", price: 45, unit: "পিস", desc: "লাইফবয় সাবান।" },
      { name: "রিক্স সাবান", price: 40, unit: "পিস", desc: "রিক্স সাবান।" },
      { name: "সার্ফ এক্সেল", price: 80, unit: "প্যাকেট", desc: "সার্ফ এক্সেল।" },
      { name: "এরিয়েল ডিটারজেন্ট", price: 120, unit: "প্যাকেট", desc: "এরিয়েল ডিটারজেন্ট।" },
      { name: "নামাল সাবান", price: 35, unit: "পিস", desc: "নামাল সাবান।" },
      { name: "হামাম সাবান", price: 50, unit: "পিস", desc: "হামাম সাবান।" },
      { name: "ডাইল সাবান", price: 55, unit: "পিস", desc: "ডাইল সাবান।" },
      { name: "প্রাণ সাবান", price: 30, unit: "পিস", desc: "প্রাণ সাবান।" },
      { name: "টাইড পাউডার", price: 150, unit: "প্যাকেট", desc: "টাইড পাউডার।" },
      { name: "ভিম ডিশবার", price: 25, unit: "পিস", desc: "ভিম ডিশবার।" },
      { name: "ফ্যাব্রিক সফটনার", price: 100, unit: "প্যাকেট", desc: "ফ্যাব্রিক সফটনার।" },
      { name: "ডিশ ওয়াশ লিকুইড", price: 90, unit: "বোতল", desc: "ডিশ ওয়াশ লিকুইড।" },
    ],
  },
  {
    name: "ব্যক্তিগত যত্ন (Personal Care)",
    keyword: "beauty",
    products: [
      { name: "কোলগেট টুথপেস্ট", price: 90, unit: "টিউব", desc: "কোলগেট টুথপেস্ট।" },
      { name: "পেয়ার অয়েল", price: 120, unit: "বোতল", desc: "চুলের তেল।" },
      { name: "শ্যাম্পু", price: 150, unit: "বোতল", desc: "শ্যাম্পু।" },
      { name: "ফেস ক্রিম", price: 200, unit: "পিস", desc: "মুখমণ্ডলের ক্রিম।" },
      { name: "ডিওডরেন্ট", price: 180, unit: "পিস", desc: "ডিওডরেন্ট।" },
      { name: "টিশ্যু পেপার", price: 60, unit: "প্যাকেট", desc: "টিশ্যু পেপার।" },
      { name: "বেবি পাউডার", price: 70, unit: "পিস", desc: "বেবি পাউডার।" },
      { name: "হ্যান্ড ওয়াশ", price: 100, unit: "বোতল", desc: "হ্যান্ড ওয়াশ।" },
      { name: "সানস্ক্রিন লোশন", price: 250, unit: "পিস", desc: "সানস্ক্রিন লোশন।" },
      { name: "শেভিং ক্রিম", price: 120, unit: "পিস", desc: "শেভিং ক্রিম।" },
      { name: "মাউথওয়াশ", price: 130, unit: "বোতল", desc: "মাউথওয়াশ।" },
      { name: "বডি লোশন", price: 160, unit: "বোতল", desc: "বডি লোশন।" },
    ],
  },
  {
    name: "শিশু খাদ্য (Baby Food)",
    keyword: "baby",
    products: [
      { name: "নেসলে লাকটোজেন", price: 250, unit: "প্যাকেট", desc: "শিশুদের খাবার।" },
      { name: "গাজর-আলু পিউরি", price: 60, unit: "জার", desc: "শিশুদের গাজর-আলু পিউরি।" },
      { name: "বেবি কের", price: 180, unit: "প্যাকেট", desc: "বেবি কের।" },
      { name: "সেরালাক", price: 220, unit: "প্যাকেট", desc: "সেরালাক।" },
      { name: "বেবি ওয়াফার্স", price: 40, unit: "প্যাকেট", desc: "বেবি ওয়াফার্স।" },
      { name: "ফ্রুট পিউরি", price: 55, unit: "জার", desc: "ফ্রুট পিউরি।" },
      { name: "বেবি ফুড (মাংস)", price: 80, unit: "জার", desc: "মাংসের বেবি ফুড।" },
      { name: "বেবি ফর্মুলা", price: 300, unit: "প্যাকেট", desc: "বেবি ফর্মুলা।" },
      { name: "ইনফ্যান্ট মিল্ক", price: 280, unit: "প্যাকেট", desc: "ইনফ্যান্ট মিল্ক।" },
      { name: "বেবি স্ন্যাকস", price: 50, unit: "প্যাকেট", desc: "শিশুদের স্ন্যাকস।" },
    ],
  },
  {
    name: "বেকারি আইটেম (Bakery)",
    keyword: "bakery",
    products: [
      { name: "পাউরুটি", price: 50, unit: "প্যাকেট", desc: "তাজা পাউরুটি।" },
      { name: "ব্রেড", price: 45, unit: "প্যাকেট", desc: "সাদা ব্রেড।" },
      { name: "রুটি", price: 40, unit: "প্যাকেট", desc: "সাধারণ রুটি।" },
      { name: "তোস্ত", price: 55, unit: "প্যাকেট", desc: "তোস্ত।" },
      { name: "কেক", price: 250, unit: "পিস", desc: "চকলেট কেক।" },
      { name: "ক্রকেট", price: 30, unit: "পিস", desc: "ক্রকেট।" },
      { name: "পিরোশকি", price: 60, unit: "পিস", desc: "পিরোশকি।" },
      { name: "বান", price: 15, unit: "পিস", desc: "বান।" },
      { name: "ফ্ল্যাটব্রেড", price: 50, unit: "প্যাকেট", desc: "ফ্ল্যাটব্রেড।" },
      { name: "ক্রোয়াসান", price: 80, unit: "পিস", desc: "ক্রোয়াসান।" },
    ],
  },
  {
    name: "আটা ও ময়দা (Flour & Grains)",
    keyword: "flour",
    products: [
      { name: "গমের আটা", price: 65, unit: "কেজি", desc: "গমের আটা।" },
      { name: "ময়দা", price: 55, unit: "কেজি", desc: "ময়দা।" },
      { name: "সুজি", price: 70, unit: "কেজি", desc: "সুজি।" },
      { name: "বেসন", price: 90, unit: "কেজি", desc: "বেসন।" },
      { name: "চালের গুঁড়া", price: 60, unit: "কেজি", desc: "চালের গুঁড়া।" },
      { name: "ওটস", price: 150, unit: "কেজি", desc: "ওটস।" },
      { name: "কর্নফ্লার", price: 80, unit: "কেজি", desc: "কর্নফ্লার।" },
      { name: "রাগি আটা", price: 75, unit: "কেজি", desc: "রাগি আটা।" },
      { name: "মাকা আটা", price: 85, unit: "কেজি", desc: "মাকা আটা।" },
      { name: "বাজরা আটা", price: 70, unit: "কেজি", desc: "বাজরা আটা।" },
    ],
  },
  {
    name: "গৃহস্থালি সরঞ্জাম (Household)",
    keyword: "home",
    products: [
      { name: "প্লাস্টিক কাপ", price: 40, unit: "প্যাকেট", desc: "প্লাস্টিক কাপ।" },
      { name: "পেপার নেপকিন", price: 50, unit: "প্যাকেট", desc: "পেপার নেপকিন।" },
      { name: "অ্যালুমিনিয়াম ফয়েল", price: 80, unit: "রোল", desc: "অ্যালুমিনিয়াম ফয়েল।" },
      { name: "ক্লিং ফিল্ম", price: 60, unit: "রোল", desc: "ক্লিং ফিল্ম।" },
      { name: "জিপলক ব্যাগ", price: 45, unit: "প্যাকেট", desc: "জিপলক ব্যাগ।" },
      { name: "প্লাস্টিক কান্টেইনার", price: 100, unit: "পিস", desc: "প্লাস্টিক কান্টেইনার।" },
      { name: "গ্লাস বোতল", price: 120, unit: "পিস", desc: "গ্লাস বোতল।" },
      { name: "স্টিলের পাত্র", price: 250, unit: "পিস", desc: "স্টিলের পাত্র।" },
      { name: "বাঁশের ঝুড়ি", price: 80, unit: "পিস", desc: "বাঁশের ঝুড়ি।" },
      { name: "কাটিং বোর্ড", price: 150, unit: "পিস", desc: "কাটিং বোর্ড।" },
    ],
  },
  {
    name: "স্টেশনারি (Stationery)",
    keyword: "stationery",
    products: [
      { name: "কপি খাতা", price: 30, unit: "পিস", desc: "কপি খাতা।" },
      { name: "পেন", price: 15, unit: "পিস", desc: "বলপয়েন্ট পেন।" },
      { name: "পেন্সিল", price: 10, unit: "পিস", desc: "পেন্সিল।" },
      { name: "রাবার", price: 5, unit: "পিস", desc: "রাবার।" },
      { name: "পেন্সিল শার্পনার", price: 20, unit: "পিস", desc: "পেন্সিল শার্পনার।" },
      { name: "মার্কার", price: 25, unit: "পিস", desc: "মার্কার।" },
      { name: "ক্যালকুলেটর", price: 300, unit: "পিস", desc: "ক্যালকুলেটর।" },
      { name: "ফাইল", price: 35, unit: "পিস", desc: "ফাইল।" },
      { name: "স্কেল", price: 15, unit: "পিস", desc: "স্কেল।" },
      { name: "কাটার", price: 40, unit: "পিস", desc: "কাটার।" },
    ],
  },
  {
    name: "হিমায়িত খাদ্য (Frozen Foods)",
    keyword: "frozen",
    products: [
      { name: "ফ্রোজেন সমুচা", price: 180, unit: "প্যাকেট", desc: "ফ্রোজেন সমুচা।" },
      { name: "ফ্রোজেন পরোটা", price: 120, unit: "প্যাকেট", desc: "ফ্রোজেন পরোটা।" },
      { name: "ফ্রোজেন কাবাব", price: 250, unit: "প্যাকেট", desc: "ফ্রোজেন কাবাব।" },
      { name: "ফ্রোজেন চিকেন নাগেটেট", price: 200, unit: "প্যাকেট", desc: "চিকেন নাগেটেট।" },
      { name: "ফ্রোজেন ফিশ ফিঙ্গার", price: 220, unit: "প্যাকেট", desc: "ফিশ ফিঙ্গার।" },
      { name: "ফ্রোজেন আইসক্রিম", price: 150, unit: "প্যাকেট", desc: "আইসক্রিম।" },
      { name: "ফ্রোজেন পিজ্জা", price: 280, unit: "প্যাকেট", desc: "পিজ্জা।" },
      { name: "ফ্রোজেন স্প্রিং রোল", price: 160, unit: "প্যাকেট", desc: "স্প্রিং রোল।" },
      { name: "ফ্রোজেন মোমো", price: 180, unit: "প্যাকেট", desc: "মোমো।" },
      { name: "ফ্রোজেন চিকেন লেগ", price: 240, unit: "প্যাকেট", desc: "চিকেন লেগ।" },
    ],
  },
  {
    name: "কম্বো অফার (Combo Offers)",
    keyword: "combo",
    products: [
      { name: "ফ্যামিলি প্যাক (চাল + ডাল + তেল)", price: 450, unit: "সেট", desc: "ফ্যামিলি প্যাক।" },
      { name: "ব্রেকফাস্ট কম্বো", price: 200, unit: "সেট", desc: "ব্রেকফাস্ট কম্বো।" },
      { name: "কিচেন কিট", price: 350, unit: "সেট", desc: "কিচেন কিট।" },
      { name: "পার্টি প্ল্যাটার", price: 500, unit: "সেট", desc: "পার্টি প্ল্যাটার।" },
      { name: "স্ন্যাকস বাক্স", price: 150, unit: "সেট", desc: "স্ন্যাকস বাক্স।" },
      { name: "চা-কফি কম্বো", price: 300, unit: "সেট", desc: "চা-কফি কম্বো।" },
      { name: "মশলা সেট", price: 250, unit: "সেট", desc: "মশলা সেট।" },
      { name: "সুস্থ খাদ্য কম্বো", price: 400, unit: "সেট", desc: "সুস্থ খাদ্য কম্বো।" },
      { name: "দুগ্ধজাত কম্বো", price: 320, unit: "সেট", desc: "দুগ্ধজাত কম্বো।" },
      { name: "পিকনিক প্যাক", price: 380, unit: "সেট", desc: "পিকনিক প্যাক।" },
    ],
  },
];

// ============================================================================
// IMAGE MAPPING — keyword to Unsplash URL
// ============================================================================
const imageMap: Record<string, string> = {
  rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
  lentil: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=800",
  oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=800",
  spice: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
  sugar: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  tea: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=800",
  biscuit: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800",
  noodle: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=800",
  beverage: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800",
  fruit: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800",
  milk: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=800",
  fish: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&q=80&w=800",
  soap: "https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=800",
  beauty: "https://images.unsplash.com/photo-1596462502278-27bfdd403ccc?auto=format&fit=crop&q=80&w=800",
  baby: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  flour: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
  home: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800",
  stationery: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=800",
  frozen: "https://images.unsplash.com/photo-1563122904-8b6f3c4c6b8c?auto=format&fit=crop&q=80&w=800",
  combo: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
  default: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
};

function getImage(keyword: string): string {
  return imageMap[keyword] || imageMap.default;
}

// ============================================================================
// HELPERS
// ============================================================================
function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ============================================================================
// SEED FUNCTION
// ============================================================================
async function seed() {
  try {
    console.log("Connecting to database...");
    await dbConnect();

    console.log("Cleaning existing data...");
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Brand.deleteMany({});

    // 1. Create Brands
    console.log("Creating brands...");
    await Brand.insertMany(brands);

    // 2. Create Categories + Products
    console.log("Creating categories and products...");
    const allCategories: any[] = [];
    let totalProducts = 0;

    for (const catDef of categoryDefs) {
      // Create main category
      const mainCat = await Category.create({
        name: catDef.name,
        image: getImage(catDef.keyword),
        isActive: true,
      });
      allCategories.push(mainCat);

      // Create 3 sub-categories per main category
      const subCatNames = [
        `প্রিমিয়াম ${catDef.name}`,
        `দেশি ${catDef.name}`,
        `আমদানি ${catDef.name}`,
      ];

      for (const subName of subCatNames) {
        const subCat = await Category.create({
          name: subName,
          parentId: mainCat._id,
          image: getImage(catDef.keyword),
          isActive: true,
        });
        allCategories.push(subCat);
      }
    }

    // 3. Generate 200 products distributed across categories
    console.log("Generating 200 products...");

    // Calculate products per category (distribute 200 across 20 categories)
    const productsPerCat = Math.floor(200 / categoryDefs.length); // 10 per category
    const extraProducts = 200 - productsPerCat * categoryDefs.length; // remainder

    const allProducts: any[] = [];

    for (let catIdx = 0; catIdx < categoryDefs.length; catIdx++) {
      const catDef = categoryDefs[catIdx];
      const mainCat = allCategories[catIdx * 4]; // main category is at index 0, 4, 8, ...

      // Number of products for this category
      let count = productsPerCat;
      if (catIdx < extraProducts) count += 1; // distribute remainder

      // Pick products from the definition
      const availableProducts = catDef.products;
      const selectedProducts = availableProducts.slice(0, count);

      for (let pIdx = 0; pIdx < selectedProducts.length; pIdx++) {
        const p = selectedProducts[pIdx];
        const brand = pickRandom(brandNames);
        const imgBase = getImage(catDef.keyword);
        const seed = `${catDef.keyword}-${pIdx}`;

        const basePrice = p.price;
        const hasDiscount = Math.random() > 0.5;
        const discountPercent = hasDiscount ? randomBetween(5, 30) : 0;
        const discountPrice = hasDiscount
          ? Math.round(basePrice * (1 - discountPercent / 100))
          : basePrice;

        const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 - 5.0
        const reviewCount = randomBetween(5, 200);

        const isDeal = Math.random() > 0.7;
        const isPopular = Math.random() > 0.6;
        const isNewArrival = Math.random() > 0.7;

        const images = [
          imgBase,
          `https://picsum.photos/seed/${seed}-2/800/800`,
          `https://picsum.photos/seed/${seed}-3/800/800`,
          `https://picsum.photos/seed/${seed}-4/800/800`,
        ];

        const hasVariant = Math.random() > 0.6;
        const variants = hasVariant
          ? [
              {
                name: "ওজন",
                options: [
                  { label: `১ ${p.unit}`, price: basePrice, stock: randomBetween(10, 100) },
                  { label: `২ ${p.unit}`, price: basePrice * 2 - 20, stock: randomBetween(5, 80) },
                  { label: `৫ ${p.unit}`, price: basePrice * 5 - 100, stock: randomBetween(3, 50) },
                ],
              },
            ]
          : [];

        const specifications = [
          { label: "ব্র্যান্ড", value: brand },
          { label: "উৎপত্তি", value: pickRandom(["বাংলাদেশ", "ভারত", "চীন", "থাইল্যান্ড"]) },
          { label: "স্টোরেজ", value: "শুকনো ও ঠান্ডা স্থানে রাখুন" },
          { label: "শেলফ লাইফ", value: pickRandom(["৩ মাস", "৬ মাস", "১ বছর", "২ বছর"]) },
          { label: "ওজন", value: `১ ${p.unit}` },
        ];

        const reviewItems = Array.from({ length: randomBetween(2, 5) }, (_, i) => ({
          name: pickRandom(["রাশেদ", "ফারহানা", "তানভীর", "নাফিসা", "সাবরিনা", "আরিফ", "মেহেদী", "তাসনিম"]),
          rating: randomBetween(3, 5),
          comment: pickRandom([
            "খুব ভালো মানের পণ্য।",
            "দ্রুত ডেলিভারি পেয়েছি।",
            "মূল্য অনুযায়ী ভালো।",
            "আবার কিনব।",
            "মান ভালো নয়।",
            "প্যাকেটিং ভালো।",
            "ফ্রেশ পণ্য পেয়েছি।",
          ]),
          createdAt: new Date(Date.now() - randomBetween(1, 180) * 24 * 60 * 60 * 1000),
        }));

        allProducts.push({
          name: p.name,
          description: p.desc,
          price: basePrice,
          brand,
          category: mainCat._id,
          image: images[0],
          images,
          stock: randomBetween(10, 200),
          unit: p.unit,
          discount: discountPercent,
          discountPrice,
          isDeal,
          isPopular,
          isNewArrival,
          rating,
          reviews: reviewCount,
          reviewItems,
          variants,
          specifications,
          questions: [
            {
              question: "এটি কি ফ্রেশ?",
              answer: "হ্যাঁ, আমরা সবসময় তাজা পণ্য ডেলিভারি দিই।",
              user: "ক্রেতা",
              createdAt: new Date(),
            },
            {
              question: "ডেলিভারি কতক্ষণ লাগে?",
              answer: "সাধারণত ৩০ মিনিটের মধ্যে ডেলিভারি পেয়ে যাবেন।",
              user: "ক্রেতা",
              createdAt: new Date(),
            },
          ],
          aiSummary: `${p.name} পণ্যটি ক্রেতাদের কাছে বেশ জনপ্রিয়। সাশ্রয়ী মূল্যে উচ্চ মানের।`,
          isActive: true,
        });

        totalProducts++;
      }
    }

    // Ensure exactly 200 products — trim or pad
    if (allProducts.length > 200) {
      allProducts.length = 200;
    }

    console.log(`Inserting ${allProducts.length} products...`);
    await Product.insertMany(allProducts);

    console.log("Seeding completed successfully!");
    console.log(`Total Categories: ${allCategories.length}`);
    console.log(`Total Products: ${allProducts.length}`);
    console.log(`Total Brands: ${brands.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
