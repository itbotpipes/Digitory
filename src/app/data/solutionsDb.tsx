import React from 'react';

// Define structures for data
export interface WhyChooseItem {
  title: string;
  desc: string;
}

export interface FeatureItem {
  title: string;
  desc: string;
  icon?: React.ReactNode;
}

export interface BusinessTypeItem {
  name: string;
  desc: string;
  icon?: React.ReactNode;
}

export interface IntegrationCategory {
  title: string;
  items: string;
}

export interface SolutionData {
  id: string;
  shortLabel: string;
  icon: React.ReactNode;
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  ctaText: string;
  trustText: string;
  whyChoose: WhyChooseItem[];
  featuresTitle: string;
  features: FeatureItem[];
  businessTypes: BusinessTypeItem[];
  integrations?: IntegrationCategory[];
  extraGrowth?: {
    title: string;
    desc: string;
  };
  extraOwnersChoice?: {
    title: string;
    desc: string;
  };
  supportItems?: string[];
  securityItems?: string[];
  ctaBlock: {
    title: string;
    desc: string;
  };
}

// Reusable SVG Library for Business Types
const icons = {
  restaurant: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a1 1 0 011 1v1a9 9 0 019 9H2a9 9 0 019-9V4a1 1 0 011-1zM2 17h20v2H2v-2z" />
    </svg>
  ),
  bar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a6 6 0 006-6V4H6v5a6 6 0 006 6zm0 0v6m-4 0h8" />
    </svg>
  ),
  brewery: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h1a2 2 0 012 2v4a2 2 0 01-2 2h-1M6 20h10a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zM9 8h4M9 12h4" />
    </svg>
  ),
  pub: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  cafe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h10a2 2 0 012 2v5a4 4 0 01-4 4H9a4 4 0 01-4-4V8z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 10h1a2 2 0 012 2v1a2 2 0 01-2 2h-1M7 3v2M10 3v2M13 3v2" />
    </svg>
  ),
  bakery: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6zm2-6a2 2 0 012-2h8a2 2 0 012 2v4H6V6zm6-3v3m0 0a1 1 0 011 1v0a1 1 0 01-1 1" />
    </svg>
  ),
  cloudKitchen: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  ),
  qsr: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11a7 7 0 0114 0H5zm-1 3h16m-16 3h16m-15 3h14a2 2 0 002-2H3a2 2 0 002 2z" />
    </svg>
  ),
  chain: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  venue: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
    </svg>
  )
};

export const solutionsDb: Record<string, SolutionData> = {
  pos: {
    id: "pos",
    shortLabel: "Integrated POS",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    badge: "01 • Multi-Channel POS",
    title: "Multi-channel integrated POS",
    subtitle: "Restaurant POS software built for real restaurant work",
    description: "Digitory helps restaurants, cafés, bars, breweries, and cloud kitchens manage their daily operations with one simple system. Take orders, create bills, track inventory, manage staff, and view business reports, all from one platform. Whether you have one outlet or many, Digitory helps you save time, reduce mistakes, and run your business with confidence.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, and breweries across India.",
    whyChoose: [
      {
        title: "Built for Indian restaurants",
        desc: "Running a restaurant in India comes with unique challenges. Online orders, GST, busy weekends, multiple outlets, and changing menus can quickly become difficult to manage. Digitory is designed to handle these everyday challenges so your team can work faster and more efficiently."
      },
      {
        title: "Everything in one place",
        desc: "There's no need for separate software for billing, inventory, online orders, or reports. Digitory brings everything together into one easy-to-use system. Fewer app switches mean fewer mistakes and more time for your customers."
      },
      {
        title: "Manage your business from anywhere",
        desc: "Keep an eye on your restaurant even when you're away. View sales, orders, inventory, and reports in real time from your phone or computer. No matter where you are, you'll always know how your business is performing."
      }
    ],
    featuresTitle: "Everything you need to run your restaurant",
    features: [
      {
        title: "Smart billing and order management",
        desc: "Take orders for dine-in, takeaway, delivery, and online platforms from one screen. Split bills, merge tables, apply discounts, and complete billing quickly.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: "Easy menu management",
        desc: "Update your menu once and apply the changes across all your outlets and online ordering platforms. You can also schedule offers, happy hours, and special menus in advance.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2h-2M5 11V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M5 7h14" />
          </svg>
        )
      },
      {
        title: "Inventory made simple",
        desc: "Track ingredients automatically whenever an order is placed. Get low-stock alerts, reduce food waste, and always know what needs to be reordered.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7.5l-8 4-8-4M12 11.5v9M20 7.5v9l-8 4M20 7.5L12 3.5M4 7.5v9l8 4M4 7.5L12 3.5" />
          </svg>
        )
      },
      {
        title: "Staff management",
        desc: "Track staff attendance, sales performance, work shifts, and user permissions from one dashboard. Keep your team organised and your operations running smoothly.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: "Reports that help you make decisions",
        desc: "See what's selling the most, monitor sales trends, track inventory, and compare outlet performance with easy-to-read reports. Instead of guessing, you can make decisions based on real numbers.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      }
    ],
    integrations: [
      { title: "Accounting", items: "Tally, Zoho Books, QuickBooks" },
      { title: "Payments", items: "Razorpay, Paytm, Google Pay, UPI, Credit Cards" },
      { title: "Online Ordering", items: "Swiggy, Zomato, DotPe, Thrive, and more" },
      { title: "Customer Engagement", items: "WhatsApp automation, SMS campaigns, loyalty programs, and CRM tools" }
    ],
    businessTypes: [
      { 
        name: "Restaurants", 
        desc: "Manage tables, route kitchen orders, customise bills, and collect customer feedback.",
        icon: icons.restaurant
      },
      { 
        name: "Bars", 
        desc: "Manage bar tabs, track liquor inventory, monitor recipes, and improve service speed.",
        icon: icons.bar
      },
      { 
        name: "Breweries", 
        desc: "Track brewing batches, manage tap sales, and reward loyal customers with custom loyalty programs.",
        icon: icons.brewery
      },
      { 
        name: "Pubs", 
        desc: "Run happy hour offers, manage promotions, reward regular customers, and handle event billing with ease.",
        icon: icons.pub
      },
      { 
        name: "Cafés", 
        desc: "Handle busy rush hours with fast billing, combo offers, mobile POS, and quick counter service.",
        icon: icons.cafe
      },
      { 
        name: "Bakeries & Dessert Shops", 
        desc: "Manage item-wise or weight-based billing, monitor expiry dates, and increase sales with smart product recommendations.",
        icon: icons.bakery
      }
    ],
    extraGrowth: {
      title: "Grow your business with confidence",
      desc: "Whether you have one outlet or a growing chain, Digitory grows with you. Manage all your locations from one dashboard. Keep menus consistent, update prices, manage franchises, and control outlet-specific offers with ease."
    },
    extraOwnersChoice: {
      title: "Why restaurant owners choose Digitory",
      desc: "Restaurants using Digitory have reduced food waste, improved inventory control, expanded to multiple locations more easily, and simplified their daily operations. Our goal is simple: help restaurant owners spend less time solving problems and more time growing their business."
    },
    supportItems: [
      "Training for your team",
      "Quick onboarding",
      "Phone, chat, and email support",
      "Compatibility with printers, cash drawers, and POS hardware",
      "Custom dashboards for owners, managers, accountants, chefs, and staff"
    ],
    securityItems: [
      "Secure cloud storage",
      "Automatic backups",
      "GST-compliant billing and reports",
      "User access controls",
      "Activity logs for better security"
    ],
    ctaBlock: {
      title: "Ready to simplify your restaurant operations?",
      desc: "Digitory helps restaurants save time, reduce manual work, and stay in control of every part of the business. From neighbourhood cafés to multi-outlet restaurant chains, restaurants across India trust Digitory to help them grow."
    }
  },
  kds: {
    id: "kds",
    shortLabel: "Kitchen KDS",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
    badge: "02 • Kitchen Display System",
    title: "Kitchen Display System (KDS)",
    subtitle: "Kitchen Display System (KDS) for faster, smarter kitchens",
    description: "A busy kitchen needs more than skilled chefs. It needs a system that keeps every order organised. Digitory's Kitchen Display System (KDS) sends orders directly from the billing counter to the kitchen screen in real time. No paper tickets, no confusion, and no missed orders. Whether you run a restaurant, café, bar, brewery, or cloud kitchen, Digitory helps your team prepare food faster and serve customers on time.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, and breweries across India.",
    whyChoose: [
      {
        title: "Orders reach the kitchen instantly",
        desc: "The moment an order is placed, it appears on the kitchen screen. Your chefs can start preparing food immediately without waiting for printed tickets."
      },
      {
        title: "Fewer mistakes",
        desc: "Digital orders are clear and easy to read. Special instructions like 'less spicy,' 'no onions,' or allergy requests are displayed clearly, helping your team prepare every order correctly."
      },
      {
        title: "Live updates for everyone",
        desc: "The front desk and kitchen stay connected. As an order moves from preparation to serving, everyone sees the latest status in real time."
      },
      {
        title: "Faster kitchen operations",
        desc: "Similar orders are grouped together, making it easier for chefs to prepare multiple dishes at once. This saves time, especially during lunch and dinner rush."
      }
    ],
    featuresTitle: "Why every modern restaurant needs a KDS",
    features: [
      {
        title: "No more lost paper tickets",
        desc: "Paper KOTs can get misplaced, damaged, or forgotten during busy hours. With Digitory KDS, every order appears instantly on the kitchen screen, so nothing gets missed.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7C4.547 9.547 4.5 10.768 4.5 12s.047 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.092-1.209.138-2.43.138-3.662zM9 10.5h6M9 13.5h6m-6 3h4.5" />
          </svg>
        )
      },
      {
        title: "Faster preparation and quicker service",
        desc: "Chefs can clearly see which orders need to be prepared first. This helps reduce waiting time and allows tables to be served faster.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Save money and reduce waste",
        desc: "By replacing printed kitchen tickets with digital screens, restaurants can reduce paper usage and lower printing costs. It's better for your business and better for the environment.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Prep time tracking",
        desc: "Track how long each order takes to prepare. Managers can quickly identify delays and improve kitchen performance using real numbers.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Works even during internet issues",
        desc: "If the internet connection drops, the system continues working locally and syncs everything once the connection returns.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5zM18.364 5.636a9 9 0 00-12.728 0M16.243 7.757a6 6 0 00-8.486 0M14.121 9.879a3 3 0 00-4.242 0" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { 
        name: "Restaurants", 
        desc: "Manage multiple kitchen stations, course timing, and large order volumes with ease.",
        icon: icons.restaurant
      },
      { 
        name: "Cafés", 
        desc: "Prepare beverages and food together while keeping every order organised during peak hours.",
        icon: icons.cafe
      },
      { 
        name: "Bars", 
        desc: "Separate drink orders from food orders so every station knows exactly what to prepare.",
        icon: icons.bar
      },
      { 
        name: "Breweries", 
        desc: "Send different parts of the same order to the right kitchen stations, whether it's the grill, pizza oven, or bar.",
        icon: icons.brewery
      },
      { 
        name: "Pubs", 
        desc: "Handle busy evenings and happy hours without overwhelming your kitchen. The system helps balance incoming orders.",
        icon: icons.pub
      },
      { 
        name: "Cloud Kitchens", 
        desc: "Manage delivery orders from multiple platforms in one place and keep preparation running smoothly.",
        icon: icons.cloudKitchen
      }
    ],
    extraGrowth: {
      title: "Better insights for better decisions",
      desc: "Digitory helps you understand how your kitchen performs every day. Find dishes that take the longest to prepare, identify your busiest hours, plan staff schedules more efficiently, and improve menu performance using real kitchen data."
    },
    extraOwnersChoice: {
      title: "What makes Digitory KDS different?",
      desc: "Digitory is built for the way Indian restaurants actually work. From weekend rushes to online delivery spikes, it helps kitchens stay organised even during the busiest hours. Instant order updates from POS, QR ordering, Swiggy, and Zomato appear on the kitchen screen almost instantly."
    },
    ctaBlock: {
      title: "Make your kitchen faster and more organised",
      desc: "A great kitchen isn't just about cooking good food. It's about preparing every order accurately, reducing delays, and keeping your team working together. Digitory's Kitchen Display System helps restaurants do exactly that, every single day."
    }
  },
  inventory: {
    id: "inventory",
    shortLabel: "Inventory Control",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    badge: "03 • Smart Inventory Management",
    title: "Automated inventory management",
    subtitle: "Automated inventory management for restaurants",
    description: "Good food starts with good inventory management. If you don't know what you have in stock, you can end up wasting food, running out of ingredients, or spending more than you should. Digitory's automated Inventory Management System helps you track every ingredient automatically, so you always know what's available and what needs to be reordered.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "Automatic inventory tracking",
        desc: "Every time an order is billed, the required ingredients are automatically deducted from your inventory. No manual updates. No guesswork. Just accurate stock levels at all times."
      },
      {
        title: "Know what's in stock",
        desc: "See your inventory anytime, from anywhere. Check what's available, what's running low, and what needs to be ordered from one simple dashboard."
      },
      {
        title: "Reduce food waste",
        desc: "Track expiry dates and monitor ingredient usage so you can use stock before it goes to waste. Buying the right quantity at the right time helps reduce unnecessary losses."
      }
    ],
    featuresTitle: "Better control over every ingredient",
    features: [
      {
        title: "Low-stock alert triggers reorder",
        desc: "Digitory sends low-stock alerts before ingredients finish. The system also recommends when it's time to reorder based on your daily usage.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Recipe auto-deduct",
        desc: "Every recipe is connected to your inventory. When you sell a pizza, coffee, dosa, or cocktail, the exact ingredients used are updated automatically.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        )
      },
      {
        title: "Manage multiple outlets with ease",
        desc: "Whether you have one restaurant or many locations, Digitory keeps all your inventory connected. View stock across all outlets, transfer inventory between locations, track your central kitchen, and manage supplier deliveries.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
      {
        title: "Reduce stock loss and theft",
        desc: "Digitory helps you spot unusual stock differences, compare sales with inventory usage, and control who can access inventory data.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { 
        name: "Restaurants", 
        desc: "Track ingredients automatically, monitor suppliers, and manage changing menus with confidence.",
        icon: icons.restaurant
      },
      { 
        name: "Bars", 
        desc: "Track liquor by volume, monitor bottle usage, record breakages, and manage stock more accurately.",
        icon: icons.bar
      },
      { 
        name: "Breweries", 
        desc: "Manage raw materials, brewing batches, packaging stock, and production planning from one system.",
        icon: icons.brewery
      },
      { 
        name: "Cafés", 
        desc: "Track fast-moving ingredients, connect with your central kitchen, and stay prepared for busy hours.",
        icon: icons.cafe
      },
      { 
        name: "Cloud Kitchens", 
        desc: "Manage inventory across multiple brands and delivery locations while keeping stock updated in real time.",
        icon: icons.cloudKitchen
      }
    ],
    extraGrowth: {
      title: "Make better business decisions",
      desc: "Digitory gives you simple reports that help you understand your inventory. See your most-used ingredients, fast-moving stock, slow-moving stock, food wastage, purchase history, stock value, and inventory trends. Make smarter purchasing decisions based on real data."
    },
    extraOwnersChoice: {
      title: "Why inventory management matters",
      desc: "Managing inventory manually takes time and often leads to mistakes. Stock can run out unexpectedly, food can expire before it's used, and ingredients can be over-ordered. Digitory helps you avoid these problems by keeping your inventory updated in real time."
    },
    ctaBlock: {
      title: "Spend less time counting stock",
      desc: "Inventory shouldn't be stressful. Digitory helps you reduce manual work, lower food waste, avoid stock shortages, and keep every ingredient under control. That means you can spend less time managing inventory and more time running your restaurant."
    }
  },
  "control-system": {
    id: "control-system",
    shortLabel: "Multi-Outlet Control",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
    badge: "05 • Multi-Outlet & Control",
    title: "Digi Food, Liquor & Multi-Outlet Control",
    subtitle: "Managing food, liquor, and multiple branches shouldn't be difficult",
    description: "Digitory's central management and auditing system helps you keep track of every ingredient, every recipe, and every branch location with accuracy. Set prices globally, push menus to all outlets, manage central kitchen inventory, and view consolidation reports from one system. Digitory helps you scale without losing control of your F&B operations.",
    ctaText: "Request a Demo",
    trustText: "Trusted by multi-outlet restaurants, bars, breweries, and cafés across India.",
    whyChoose: [
      {
        title: "Central Menu & Price Push",
        desc: "Update your pricing or add menu items once and push them to all outlets instantly. Control local variations, tax mappings, and menu availability centrally."
      },
      {
        title: "Complete Stock Auditing",
        desc: "Compare theoretical inventory usage with actual kitchen variance. Spot differences, prevent leakages, and track liquor stock by volume with absolute precision."
      },
      {
        title: "Franchise & Outlet Permissions",
        desc: "Establish granular user roles. Control who can edit menus, approve purchase orders, view consolidated financial reports, or access local outlet data."
      }
    ],
    featuresTitle: "Everything you need to manage food, liquor, and branch operations",
    features: [
      {
        title: "Multi-Outlet menu sync",
        desc: "Update details on one screen and sync them to all branches, Swiggy, and Zomato instantly. Schedule price variations for premium locations.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
        )
      },
      {
        title: "Audit checks and tracking",
        desc: "Audit liquor inventory with precise measurements. Spot variances, log breakages, and trace ingredient movements step-by-step.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )
      },
      {
        title: "Central kitchen management",
        desc: "Create production plans, manage raw material transfers, track dispatch orders, and monitor recipes across all central units.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        )
      },
      {
        title: "Consolidated reports",
        desc: "Compare sales performance, tax reports, profit margins, and inventory patterns across multiple locations from one dashboard.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { 
        name: "Restaurants Chains", 
        desc: "Manage multi-brand outlets, central kitchens, and localized pricing policies with confidence.",
        icon: icons.chain
      },
      { 
        name: "Bar Groups", 
        desc: "Audit high-value liquor inventory, reduce pouring variances, and keep stock counts aligned.",
        icon: icons.bar
      },
      { 
        name: "Breweries", 
        desc: "Control raw material purchases, track brewing schedules, and oversee distribution channels.",
        icon: icons.brewery
      },
      { 
        name: "Cloud Kitchen Networks", 
        desc: "Coordinate stock levels across multiple virtual brands and preparation facilities.",
        icon: icons.cloudKitchen
      }
    ],
    extraGrowth: {
      title: "Scale your F&B business smoothly",
      desc: "Adding new outlets shouldn't mean adding operational stress. Digitory keeps your templates, recipes, and operations consistent, making it easier to scale from a single F&B outlet to a national brand."
    },
    extraOwnersChoice: {
      title: "Built for growth-oriented owners",
      desc: "F&B groups using Digitory report reduced menu update times, better central kitchen coordination, lower stock variances, and easier multi-location financial consolidation."
    },
    ctaBlock: {
      title: "Take control of your branch network",
      desc: "When you have absolute visibility into every kitchen, bar, and cash register across all your locations, scaling your restaurant business becomes simple. Digitory keeps your multi-outlet network completely integrated."
    }
  },
  reports: {
    id: "reports",
    shortLabel: "Live Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0017.75 3.75H6.25A2.25 2.25 0 004 6v12A2.25 2.25 0 006.25 20.25z" />
      </svg>
    ),
    badge: "04 • Live Business Dashboard",
    title: "Live Business Dashboard & Reports",
    subtitle: "Dashboard & reports system for smarter restaurant decisions",
    description: "Sales, orders, inventory, customer visits, and staff performance all tell you how your business is doing. Digitory brings all this information together in one place, so you can understand your restaurant better and make smarter decisions. Whether you have one outlet or many, Digitory gives you the insights you need to grow your business.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, cafés, bars, breweries, and cloud kitchens across India.",
    whyChoose: [
      {
        title: "See your business in one dashboard",
        desc: "View your sales, orders, inventory, and other important numbers from one simple dashboard. Instead of checking different reports, everything you need is available in one place."
      },
      {
        title: "Get live updates",
        desc: "Your dashboard updates in real time. Check sales, orders, and restaurant performance as they happen, so you can respond quickly whenever needed."
      },
      {
        title: "Reports that fit your business",
        desc: "Every restaurant is different. Digitory lets you create reports based on the information that matters most to your business."
      },
      {
        title: "Compare all your outlets",
        desc: "Running multiple locations becomes much easier. View each outlet's performance from one dashboard and quickly identify which locations are doing well and where improvements are needed."
      }
    ],
    featuresTitle: "Understand your restaurant better",
    features: [
      {
        title: "Track your sales",
        desc: "See how much your restaurant earns every day, week, or month. Understand which days are busiest and monitor your business growth over time.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      {
        title: "Learn how customers spend",
        desc: "Find out the average amount customers spend on each visit and on every order. This helps you create better offers and improve your menu.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        )
      },
      {
        title: "Understand what sells best",
        desc: "See which dishes and drinks are your top performers. Use this information to improve your menu and focus on items that bring in more revenue.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.195-.49.886-.49 1.08 0l2.122 5.196 5.616.487c.53.046.74.698.348 1.087l-4.137 3.861 1.258 5.48c.123.535-.453.94-.897.643L12 17.51l-4.954 2.84c-.444.296-.92-.108-.797-.643l1.257-5.48-4.137-3.861c-.39-.389-.18-1.042.348-1.087l5.616-.487 2.122-5.196z" />
          </svg>
        )
      },
      {
        title: "Monitor taxes and revenue",
        desc: "View your total sales, taxes, service charges, and overall revenue in clear, easy-to-read reports. Everything is organised so you always know where your business stands.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { 
        name: "Restaurants", 
        desc: "Track sales, customer preferences, and staff performance to improve daily operations.",
        icon: icons.restaurant
      },
      { 
        name: "Quick Service Restaurants (QSRs)", 
        desc: "Monitor high-volume sales, improve pricing, and keep inventory under control.",
        icon: icons.qsr
      },
      { 
        name: "Cafés", 
        desc: "Understand customer buying habits, track popular products, and build stronger customer loyalty.",
        icon: icons.cafe
      },
      { 
        name: "Bars & Pubs", 
        desc: "Monitor food and liquor sales, identify peak business hours, and improve inventory planning.",
        icon: icons.bar
      },
      { 
        name: "Multi-outlet chains", 
        desc: "Manage reports from all your outlets in one place and compare performance across locations with ease.",
        icon: icons.chain
      }
    ],
    extraGrowth: {
      title: "Make better business decisions",
      desc: "Digitory's reports help you answer important questions like: Which dishes sell the most? Which outlet performs best? When are your busiest hours? Which products generate the highest revenue? How is your inventory performing? With the right information, making decisions becomes much easier."
    },
    extraOwnersChoice: {
      title: "Turn your data into better decisions",
      desc: "Running a successful restaurant isn't about guessing. It's about understanding what's working and improving what isn't. Digitory's Analytics & Reporting System gives you clear insights into your business, helping you increase sales, improve efficiency, and make better decisions every day."
    },
    ctaBlock: {
      title: "Ready to grow with confidence?",
      desc: "Whether you're opening your first restaurant or managing a growing chain, Digitory grows with your business. Your reports stay organised, your data stays connected, and your team always has the information they need."
    }
  },
  "event-management": {
    id: "event-management",
    shortLabel: "One Connected System",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    badge: "06 • One Connected System",
    title: "One Connected System & Event Management",
    subtitle: "Connect billing, kitchen, inventory, events, and reports together",
    description: "Stop wasting time jumping between separate software tools for billing, KDS, inventory, events, or audits. Digitory's One Connected System coordinates operations so that every department stays aligned in real time. Guests can register for events, pay cashlessly, and order food, while inventory updates and bills sync instantly.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, bars, breweries, cafés, and event venues across India.",
    whyChoose: [
      {
        title: "Complete operational sync",
        desc: "Orders from tables, QR codes, delivery apps, or bars flow directly into the KDS. Inventory drops, billing reconciles, and reports update instantly."
      },
      {
        title: "Cashless event control",
        desc: "Manage tickets, entries, bar queues, and guest billing via contactless RFID, NFC, or QR codes during live music events and parties."
      },
      {
        title: "Fewer manual mistakes",
        desc: "With one source of truth, there are no double entries, paper ticket losses, or communication delays between your front and back of house."
      }
    ],
    featuresTitle: "Connect every part of your food business",
    features: [
      {
        title: "Real-time order routing",
        desc: "Send food items to the kitchen display and drink orders to the bar terminal instantly. Keep guest tickets updated.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4-4m-4 4l4 4" />
          </svg>
        )
      },
      {
        title: "Contactless event ticketing",
        desc: "Manage entries at the door with QR code scans. Reconcile entry payments with your restaurant dashboard.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        )
      },
      {
        title: "Unified reports and BI",
        desc: "Track dining room revenue, delivery sales, event check-ins, and stock valuation in one comprehensive dashboard.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6m3 5v-4m3 5v-6m2 10H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: "Central support network",
        desc: "One system means one point of contact. Resolve inquiries across hardware, software, payments, and integrations instantly.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M3 21l2.828-2.828M3 3l18 18" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { 
        name: "Full-Service Restaurants", 
        desc: "Unify dine-in tables, takeaway desks, and delivery orders into a single, clean workspace.",
        icon: icons.restaurant
      },
      { 
        name: "Bars & Clubs", 
        desc: "Coordinate high-speed drinks tabs, entry tickets, and live event menus from one system.",
        icon: icons.bar
      },
      { 
        name: "Brewpubs", 
        desc: "Sync tap-room billing, kitchen orders, membership perks, and brewing inventory.",
        icon: icons.brewery
      },
      { 
        name: "Food Courts & Events", 
        desc: "Manage multi-vendor ordering kiosks, cashless cards, and unified customer check-in gates.",
        icon: icons.venue
      }
    ],
    extraGrowth: {
      title: "Simplicity at any scale",
      desc: "A fully integrated F&B workspace reduces staff training overhead, increases service speed, lowers operational stress, and keeps your entire team focused on what matters: the customer experience."
    },
    extraOwnersChoice: {
      title: "Loved by operators and staff alike",
      desc: "Staff spend less time running paper tickets or re-keying entries, and operators get accurate, auditable reports of sales, stock, and event status."
    },
    ctaBlock: {
      title: "Make your business work as one",
      desc: "Experience the convenience of a fully connected system. From neighbourhood cafés to multi-brand food groups, Digitory unifies billing, kitchen, stock, and events into a single, robust platform."
    }
  },
  "qr-ordering": {
    id: "qr-ordering",
    shortLabel: "QR Dine-in Ordering",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5zM13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
      </svg>
    ),
    badge: "07 • QR Ordering",
    title: "Contactless QR Dine-in Ordering",
    subtitle: "Dine-in ordering made fast, simple, and self-serve",
    description: "Let your guests view the menu, customize their dishes, and order directly from their tables. Digitory's QR Dine-in Ordering connects directly to your POS terminal and kitchen display. It reduces order preparation delays, increases average table check sizes, and lets your waitstaff focus on providing premium hospitality instead of writing down orders.",
    ctaText: "Request a Demo",
    trustText: "Trusted by cafés, fine-dine restaurants, and food courts across India.",
    whyChoose: [
      {
        title: "Increase average order value",
        desc: "Smart menu recommendations suggest add-ons, extra toppings, and drinks automatically, increasing check sizes by up to 22%."
      },
      {
        title: "Faster table turnaround",
        desc: "Guests don't have to wait for a waiter to take their order or bring the bill, speeding up operations during busy hours."
      },
      {
        title: "Reduce staff workload",
        desc: "Waitstaff spend less time taking orders and more time serving food, allowing you to manage busy hours with fewer workers."
      }
    ],
    featuresTitle: "Self-serve dine-in ordering that actually works",
    features: [
      {
        title: "Instant KOT routing",
        desc: "Orders sent by guests flow directly to the KDS and billing counter instantly. No manual approval required.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      {
        title: "Easy menu updates",
        desc: "Mark items out-of-stock or change prices in real time, preventing guests from ordering unavailable dishes.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18v3" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Cafés", desc: "Speed up counter service and let guests order as they sit.", icon: icons.cafe },
      { name: "QSRs", desc: "Handle long queues easily with table QR codes.", icon: icons.qsr }
    ],
    ctaBlock: {
      title: "Launch contactless QR ordering today",
      desc: "Provide your guests with a faster dining experience and boost your sales. Get started with Digitory QR Ordering."
    }
  },
  "loyalty": {
    id: "loyalty",
    shortLabel: "CRM & Loyalty",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    badge: "08 • Customer Loyalty & CRM",
    title: "CRM & Custom Customer Loyalty Program",
    subtitle: "Turn first-time diners into regular customers",
    description: "Build lasting relationships with your guests using Digitory's integrated CRM. Collect customer information during checkout, create personalized loyalty campaigns, and send automated WhatsApp offers. Track guest preferences, visit history, and average spends to create targeted rewards that keep customers coming back.",
    ctaText: "Request a Demo",
    trustText: "Trusted by restaurants, bars, and dessert shops across India.",
    whyChoose: [
      {
        title: "Automated WhatsApp alerts",
        desc: "Send personalized greetings, cashback details, and weekend offers to your guests directly on WhatsApp."
      },
      {
        title: "Point-based loyalty system",
        desc: "Configure points rewards, cashback percentages, or tier-based membership benefits that work instantly during checkout."
      }
    ],
    featuresTitle: "Tools to increase customer retention",
    features: [
      {
        title: "Smart customer profiles",
        desc: "Save phone numbers, visit history, favorite dishes, and preferences automatically to build a detailed guest profile.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.5-1.619z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Fine Dine", desc: "Recognize regular VIP guests and offer custom menu previews.", icon: icons.restaurant },
      { name: "Bakery", desc: "Bring customers back with birthday discount coupons.", icon: icons.bakery }
    ],
    ctaBlock: {
      title: "Build your loyal customer base",
      desc: "Stop relying on third-party aggregators. Build direct relationships with your diners using Digitory's CRM."
    }
  },
  "booking": {
    id: "booking",
    shortLabel: "Waitlist & Booking",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    badge: "09 • Waitlist & Table Booking",
    title: "Digital Waitlist & Table Booking System",
    subtitle: "Manage walk-ins and reservations efficiently",
    description: "Manage table bookings, restaurant walk-ins, and guest waiting lists with a single digital system. Digitory coordinates reservations with your live table layout to prevent double-booking. Keep guests updated on their waiting status with automated SMS alerts, and optimize seating layouts to maximize your restaurant's capacity.",
    ctaText: "Request a Demo",
    trustText: "Trusted by fine-dine restaurants, pubs, and microbreweries.",
    whyChoose: [
      {
        title: "Live waitlist updates",
        desc: "Send automated alerts to waiting guests when their table is ready, reducing crowd sizes at your entry gate."
      },
      {
        title: "Smart seating layout",
        desc: "Coordinate upcoming bookings with live dining room sessions to improve table turnaround speeds."
      }
    ],
    featuresTitle: "Features to manage dining reservations",
    features: [
      {
        title: "Visual table layout manager",
        desc: "View reservation details, guest notes, occupancy status, and table blocks on one screen.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Fine Dine Restaurants", desc: "Manage premium table reservation settings.", icon: icons.restaurant },
      { name: "Microbreweries", desc: "Organize large group bookings and VIP tables easily.", icon: icons.brewery }
    ],
    ctaBlock: {
      title: "Streamline your reservations",
      desc: "Improve guest satisfaction and maximize dining room efficiency with Digitory Booking."
    }
  },
  "purchasing": {
    id: "purchasing",
    shortLabel: "Purchase & Supplier",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    badge: "10 • Supplier Management",
    title: "Purchase & Supplier Management System",
    subtitle: "Simplify purchasing, invoice logs, and supplier tracking",
    description: "Manage purchase orders, supplier invoices, payments, and delivery logs in one dashboard. Digitory helps you track ingredient price variations, manage supplier accounts, and log goods received notes (GRN) to keep your kitchen stock costs completely accurate.",
    ctaText: "Request a Demo",
    trustText: "Trusted by microbreweries, central kitchens, and cafés.",
    whyChoose: [
      {
        title: "Track ingredient price trends",
        desc: "Monitor raw material price changes over time to optimize purchasing budgets."
      },
      {
        title: "Manage supplier payments",
        desc: "Log invoices, credit terms, pending bills, and payments for all your food suppliers."
      }
    ],
    featuresTitle: "Procurement tools for food businesses",
    features: [
      {
        title: "Easy Goods Received (GRN)",
        desc: "Match delivered items with purchase orders to spot quantity issues instantly.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Central Kitchens", desc: "Manage bulk purchases and outlet supplies.", icon: icons.cloudKitchen },
      { name: "Café Chains", desc: "Keep raw ingredient supplies consistent across all locations.", icon: icons.cafe }
    ],
    ctaBlock: {
      title: "Streamline your restaurant supply chain",
      desc: "Reduce raw material costs and coordinate inventory purchases with Digitory Supplier Hub."
    }
  },
  "payroll": {
    id: "payroll",
    shortLabel: "Shift & Payroll",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A12.018 12.018 0 0112 21c-3.11 0-5.92-.1-8.349-2.883m14.733-5.144A4.5 4.5 0 1119.5 9h-1.688a4.5 4.5 0 01-1.688-3.072M12 9a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0 0v-8.25m-9.75 16.5c0-2.209 1.79-4 4-4h11.5c2.21 0 4 1.791 4 4v.75H2.25v-.75z" />
      </svg>
    ),
    badge: "11 • Staff & Payroll Control",
    title: "Employee Shift, Attendance & Payroll",
    subtitle: "Manage staff shifts, track attendance, and simplify payroll",
    description: "Manage shift schedules, attendance logs, performance metrics, and payroll configurations for all your kitchen and service staff. Digitory coordinates biometric or mobile check-ins with sales records to track employee performance and calculate monthly payouts automatically.",
    ctaText: "Request a Demo",
    trustText: "Trusted by fine-dine groups, microbreweries, and bars.",
    whyChoose: [
      {
        title: "Track staff performance",
        desc: "Monitor tables served, average order values, and checkout speeds for each waitstaff member."
      },
      {
        title: "Easy shift scheduling",
        desc: "Schedule daily shifts, track leaves, and manage shift change requests from one dashboard."
      }
    ],
    featuresTitle: "Employee management tools",
    features: [
      {
        title: "Biometric attendance sync",
        desc: "Sync check-in logs with shift schedules to calculate overtime or unpaid leaves automatically.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Fine Dine Restaurants", desc: "Set table zones for service staff.", icon: icons.restaurant },
      { name: "Microbreweries", desc: "Manage large service team shifts.", icon: icons.brewery }
    ],
    ctaBlock: {
      title: "Organize your restaurant workforce",
      desc: "Simplify attendance tracking and calculate staff salaries accurately with Digitory Staff Hub."
    }
  },
  "central-kitchen": {
    id: "central-kitchen",
    shortLabel: "Central Kitchen",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    badge: "12 • Central Kitchen Controls",
    title: "Central Kitchen & Recipe Management",
    subtitle: "Unify batch recipes, outlet logs, and distribution",
    description: "Manage large-scale batch recipes, coordinate food preparation, track outlet stock requests, and monitor raw material deliveries. Digitory helps you maintain consistent dish flavors and control ingredient usage across all your outlets from one central dashboard.",
    ctaText: "Request a Demo",
    trustText: "Trusted by cloud kitchen networks, bakeries, and food chains.",
    whyChoose: [
      {
        title: "Maintain recipe consistency",
        desc: "Log exact batch recipe ingredients and preparation steps centrally to ensure consistent taste across all locations."
      },
      {
        title: "Outlet request management",
        desc: "Accept and fulfill raw material or prepared food requests from individual outlets through automated workflows."
      }
    ],
    featuresTitle: "Recipe and kitchen production tools",
    features: [
      {
        title: "Batch recipe logging",
        desc: "Determine exact batch production costs, raw ingredient requirements, and wastage percentages.",
        icon: (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2h-2M5 11V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M5 7h14" />
          </svg>
        )
      }
    ],
    businessTypes: [
      { name: "Cloud Kitchen Networks", desc: "Oversee raw material supplies for virtual brands.", icon: icons.cloudKitchen },
      { name: "Bakery Chains", desc: "Coordinate base kitchen preparation and outlet deliveries.", icon: icons.bakery }
    ],
    ctaBlock: {
      title: "Organize your central kitchen",
      desc: "Improve recipe consistency and control distribution operations with Digitory Central Kitchen."
    }
  }
};
