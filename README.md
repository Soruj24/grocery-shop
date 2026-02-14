# 🛒 Emran Shop - Premium Grocery E-commerce

Emran Shop is a modern, high-performance grocery e-commerce platform built with **Next.js 16**, **MongoDB**, and **Tailwind CSS**. It features a beautiful dark-themed UI, full Bengali language support, and a modular architecture for easy scalability.

![Emran Shop](https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200)

## ✨ Features

- **🚀 Modern UI/UX**: Clean, responsive, and high-performance user interface with dark mode support.
- **🇧🇩 Bengali Support**: Fully localized content in Bengali for a better local user experience.
- **🧩 Component-Based Architecture**: Highly modular code structure with reusable UI components.
- **🔐 Secure Authentication**: Integrated with NextAuth for secure user login and signup.
- **🛒 Shopping Cart & Wishlist**: Persistent cart and wishlist management with local storage integration.
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop devices.
- **🛠️ Admin Dashboard**: Comprehensive admin panel for managing products, categories, orders, and customers.
- **🤖 AI Integration**: Built-in AI chat assistant for customer support.
- **⚡ Fast Performance**: Powered by Next.js App Router and Turbopack for lightning-fast development and runtime.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API
- **AI**: LangChain & Ollama

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Soruj24/grocery-shop.git
   cd grocery-shop
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```text
src/
├── app/             # Next.js App Router (Routes & API)
├── components/      # Reusable UI Components
│   ├── admin/       # Admin Dashboard Components
│   ├── shop/        # Shop Specific Components
│   └── ui/          # Generic UI Elements
├── lib/             # Utilities, Auth, and Database Config
├── models/          # MongoDB Mongoose Models
├── types/           # TypeScript Type Definitions
└── scripts/         # Database Seeding Scripts
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## 📄 License

This project is private and for educational purposes.

---

Built with ❤️ by [Emran](https://github.com/Soruj24)
