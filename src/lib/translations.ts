export type Language = "bn";
export type TranslationKey = keyof typeof translations.bn;

export const translations = {
  bn: {
    filter: "ফিল্টার করুন",
    all_products: "সব প্রোডাক্ট",
    clear_all: "সব মুছুন",
    clear_all_filters: "সব ফিল্টার মুছুন",
    price_range: "মূল্য পরিসীমা",

    // Price Filter
    min_price: "সর্বনিম্ন",
    max_price: "সর্বোচ্চ",
    
    // Units
    unit_kg: "কেজি",
    unit_g: "গ্রাম",
    unit_mg: "মিলিগ্রাম",
    unit_l: "লিটার",
    unit_ml: "মিলি",
    unit_piece: "পিস",
    unit_pack: "প্যাক",
    unit_box: "বক্স",
    unit_bottle: "বোতল",
    unit_dozen: "ডজন",
    default_unit: "ইউনিট",
    

    // Product Details
    added_to_cart: "কার্টে যোগ করা হয়েছে",
    added_to_wishlist: "উইশলিস্টে যোগ করা হয়েছে",
    removed_from_wishlist: "উইশলিস্ট থেকে সরানো হয়েছে",
    wishlist_add: "উইশলিস্টে রাখুন",
    wishlist_remove: "সরিয়ে ফেলুন",
    out_of_stock_label: "স্টকে নেই",
    stock_available: "স্টক আছে",
    low_stock: "স্টক সীমিত",
    reviews_count: "রিভিউ",
    current_price: "বর্তমান মূল্য",
    authentic_product: "অরজিনাল পণ্য",
    sourced_from_source: "সরাসরি সোর্স থেকে সংগ্রহকৃত",
    fast_delivery: "দ্রুত ডেলিভারি",
    delivery_within_24h: "২৪ ঘন্টার মধ্যে ডেলিভারি",
    return_policy_7_days: "৭ দিনের রিটার্ন পলিসি",
    easy_return_policy: "সহজ রিটার্ন পলিসি",
    products_suffix: "পণ্য",
    buy_now: "এখনই কিনুন",
    add_to_cart: "কার্টে যোগ করুন",
    share: "শেয়ার করুন",
    share_text: "ইমরান শপে এই পণ্যটি দেখুন!",
    share_success: "লিঙ্ক কপি করা হয়েছে",
    off: "ছাড়",
    items: "আইটেম",
    shop_now: "কিনুন",
    
    // Header
    brand_name_first: "ইমরান",
    brand_name_second: "শপ",
    brand_tagline: "সেরা মানের পণ্য, সঠিক দামে",
    nav_offers: "অফার",
    nav_deals: "ডিলস",
    nav_new: "নতুন",
    nav_popular: "জনপ্রিয়",
    free_delivery_msg: "১০০০ টাকার উপরে ফ্রি ডেলিভারি",
    all_categories: "সকল ক্যাটাগরি",
    search_placeholder: "আপনার প্রয়োজনীয় পণ্যটি খুঁজুন...",
    search_placeholder_short: "সার্চ করুন...",
    voice_search_not_supported: "আপনার ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়।",
    recent_searches: "সাম্প্রতিক সার্চ",
    suggested_categories: "সম্ভাব্য ক্যাটাগরি",
    products_title_search: "পণ্যসমূহ",
    no_products_found: "দুঃখিত, কোনো পণ্য পাওয়া যায়নি!",
    try_changing_filters: "আপনার অনুসন্ধান বা ফিল্টার পরিবর্তন করে চেষ্টা করুন",
    categories: "ক্যাটাগরি",
    select_location: "লোকেশন নির্বাচন করুন",
    cat_fruits: "ফলমূল",
    cat_fruits_desc: "তাজা ও ফরমালিন মুক্ত ফল",
    cat_vegetables: "শাক-সবজি",
    cat_vegetables_desc: "সরাসরি কৃষকের ক্ষেত থেকে",
    cat_meat: "মাছ ও মাংস",
    cat_meat_desc: "দেশি মুরগি ও গরুর মাংস",
    cat_fish: "মাছ",
    cat_fish_desc: "নদীর ও পুকুরের তাজা মাছ",
    cat_dairy: "দুগ্ধজাত পণ্য",
    cat_dairy_desc: "দুধ, ডিম ও অন্যান্য",
    cat_frozen: "ফ্রোজেন ফুড",
    cat_frozen_desc: "সহজ ও ঝটপট নাস্তা",
    cat_bakery: "বেকারি",
    cat_bakery_desc: "বিস্কুট, কেক ও ব্রেড",
    cat_beauty: "সৌন্দর্য চর্চা",
    cat_beauty_desc: "স্কিন ও হেয়ার কেয়ার",
    cat_baby_care: "শিশুদের যত্ন",
    cat_baby_care_desc: "ডায়পার ও খাবার",
    cat_cleaning: "পরিচ্ছন্নতা",
    cat_cleaning_desc: "ডিটারজেন্ট ও ক্লিনার",
    browse_collections: "কালেকশন দেখুন",
    collection: "কালেকশন",
    help: "সহায়তা",
    track_order: "অর্ডার ট্র্যাক করুন",
    track_order_title_prefix: "আপনার অর্ডার",
    track_order_title_highlight: "ট্র্যাক করুন",
    track_order_subtitle: "আপনার অর্ডারের বর্তমান অবস্থা জানুন",
    order_id_placeholder: "অর্ডার আইডি লিখুন...",
    search_order: "খুঁজুন",
    cart: "কার্ট",
    wishlist: "উইশলিস্ট",
    wishlist_title: "আপনার উইশলিস্ট",
    wishlist_desc: "আপনার পছন্দের প্রোডাক্টগুলো এখানে সংরক্ষিত আছে",
    empty_wishlist_title: "আপনার উইশলিস্ট খালি",
    empty_wishlist_desc: "আপনার পছন্দের পণ্যগুলো পরে কেনার জন্য উইশলিস্টে জমা করে রাখুন।",
    browse_products: "পণ্য দেখতে যান",
    nav_wishlist: "উইশলিস্ট",
    dashboard: "ড্যাশবোর্ড",
    my_orders: "আমার অর্ডার",
    about_us: "আমাদের সম্পর্কে",

    // Profile
    name_missing: "নাম নেই",
    email_missing: "ইমেইল নেই",
    verified: "যাচাইকৃত",
    not_provided: "দেওয়া হয়নি",
    address_missing: "ঠিকানা নেই",
    delivery_address: "ডেলিভারি ঠিকানা",
    my_addresses_title: "আমার ঠিকানা",
    my_addresses_desc: "আপনার ডেলিভারি ঠিকানাগুলি পরিচালনা করুন",
    add_new_address: "নতুন ঠিকানা যোগ করুন",
    address_type_home: "বাসা",
    address_type_office: "অফিস",
    default_label: "ডিফল্ট",
    timeline_placed: "অর্ডার করা হয়েছে",
    timeline_processing: "প্রসেসিং",
    timeline_on_way: "পথে আছে",
    timeline_delivered_past: "ডেলিভারি হয়েছে",
    profile_update_success: "প্রোফাইল আপডেট সফল হয়েছে",
    profile_edit_title: "প্রোফাইল এডিট",
    profile_edit_desc: "আপনার ব্যক্তিগত তথ্য আপডেট করুন",
    enter_name_placeholder: "আপনার নাম লিখুন",
    email_label: "ইমেইল",
    enter_email_placeholder: "আপনার ইমেইল লিখুন",
    enter_phone_placeholder: "আপনার ফোন নম্বর লিখুন",
    enter_address_placeholder: "আপনার বিস্তারিত ঠিকানা লিখুন",
    save_button: "সেভ করুন",

    // Profile Menu
    profile_menu_profile: "প্রোফাইল",
    profile_menu_orders: "আমার অর্ডারসমূহ",
    profile_menu_wishlist: "উইশলিস্ট",
    profile_menu_addresses: "ঠিকানাসমূহ",
    profile_menu_payments: "পেমেন্ট পদ্ধতি",
    profile_menu_loyalty: "লয়্যালটি পয়েন্ট",
    profile_menu_subscription: "সাবস্ক্রিপশন",

    // Subscription
    active_subscription: "অ্যাক্টিভ সাবস্ক্রিপশন",
    weekly_grocery: "সাপ্তাহিক বাজার",
    every_tuesday: "প্রতি মঙ্গলবার",
    time_8_10: "সকাল ৮:০০ - ১০:০০",
    manage_btn: "ম্যানেজ করুন",
    next_delivery_items: "পরবর্তী ডেলিভারি আইটেম",
    total_estimated_bill: "মোট আনুমানিক বিল",
    subscription_benefits: "সাবস্ক্রিপশন সুবিধা",
    sub_benefit_free_delivery: "ফ্রি ডেলিভারি",
    sub_benefit_free_delivery_desc: "সব সাবস্ক্রিপশন ডেলিভারি ফ্রি",
    sub_benefit_best_quality: "সেরা মান",
    sub_benefit_best_quality_desc: "সরাসরি ফার্ম থেকে তাজা পণ্য",
    sub_item_milk: "তাজা গরুর দুধ",
    sub_item_eggs: "দেশি মুরগির ডিম",
    sub_item_veg_box: "মৌসুমি সবজি বক্স",
    unit_2_liter: "২ লিটার",
    unit_1_dozen: "১ ডজন",
    unit_1_pc: "১টি",

    // Loyalty
    your_current_points: "আপনার বর্তমান পয়েন্ট",
    points_earning_rule: "৳১ খরচ করলে ১ পয়েন্ট পাবেন",
    gift_label: "উপহার",
    level_up_label: "লেভেল আপ",
    point_history: "পয়েন্ট হিস্ট্রি",
    redeem_title: "রিডিম করুন",
    reward_50_off: "৳৫০ ডিসকাউন্ট",
    reward_100_off: "৳১০০ ডিসকাউন্ট",
    reward_free_delivery: "ফ্রি ডেলিভারি",
    points_suffix: " পয়েন্ট",
    review_bonus: "রিভিউ বোনাস",
    discount_redeem: "ডিসকাউন্ট রিডিম",

    // Payment Methods
    payment_methods_title: "পেমেন্ট পদ্ধতি",
    payment_methods_desc: "আপনার সেভ করা কার্ড এবং পেমেন্ট মেথড",
    add_new_card: "নতুন কার্ড",
    card_type: "কার্ডের ধরন",
    expiry_date: "মেয়াদ উত্তীর্ণের তারিখ",
    add_mobile_banking_desc: "আপনার মোবাইল ব্যাংকিং অ্যাকাউন্ট সেভ করুন",

    // Wishlist header
    home_breadcrumb: "হোম",
    your_wishlist: "আপনার উইশলিস্ট",
    wishlist_saved_prefix: "আপনার পছন্দের",
    wishlist_saved_suffix: "টি পণ্য এখানে সংরক্ষিত আছে",
    clear_all_wishlist: "সবগুলো মুছে ফেলুন",
    // Footer
    helpline: "হেল্পলাইন",
    helpline_number: "+৮৮০ ১২৩৪-৫৬৭৮৯০",
    quick_links: "দ্রুত লিঙ্ক",
    customer_service: "কাস্টমার সার্ভিস",
    contact_us: "যোগাযোগ করুন",
    settings: "সেটিংস",
    address: "ঠিকানা",
    address_value: "জনের মোড়, গোহাটা, নাগরপুর, টাঙ্গাইল",
    email: "ইমেইল",
    premium_grocery: "প্রিমিয়াম গ্রোসারি শপ",
    footer_desc: "আমরা আপনার নিত্যপ্রয়োজনীয় সব পণ্য সরাসরি খামার থেকে আপনার দোরগোড়ায় পৌঁছে দিতে প্রতিশ্রুতিবদ্ধ।",
    all_rights_reserved: "সর্বস্বত্ব সংরক্ষিত।",
    cookies: "কুকিজ",

    terms_conditions: "শর্তাবলী",
    privacy_policy: "গোপনীয়তা নীতি",
    live_chat: "লাইভ চ্যাট",
    shipping_policy: "শিপিং পলিসি",
    return_policy: "রিটার্ন পলিসি",

    // Home
    categories_title: "সব ক্যাটাগরি",

    // Product
    add_to_cart_btn: "কার্টে যুক্ত করুন",
    out_of_stock: "স্টকে নেই",
    related_products: "সম্পর্কিত পণ্য",
    related_products_title: "সম্পর্কিত পণ্য",
    description: "বিস্তারিত",
    reviews: "রিভিউ",
    review_submitted_success: "রিভিউ সফলভাবে জমা দেওয়া হয়েছে",
    review_submit_error: "রিভিউ জমা দেওয়া সম্ভব হয়নি",
    reviews_title: "গ্রাহক রিভিউ",
    average_rating: "গড় রেটিং",
    total_reviews: "টি রিভিউ",
    write_review: "রিভিউ লিখুন",
    rating_label: "আপনার রেটিং",
    comment_label: "আপনার মতামত",
    comment_placeholder: "পণ্য সম্পর্কে আপনার অভিজ্ঞতা লিখুন...",
    submit_review: "রিভিউ জমা দিন",
    submitting: "জমা হচ্ছে...",
    login_to_review: "রিভিউ দিতে লগইন করুন",
    verified_purchase: "যাচাইকৃত কেনাকাটা",
    no_reviews: "এখনো কোনো রিভিউ নেই",
    be_first_review: "প্রথম রিভিউটি লিখুন",
    load_more_reviews: "আরও রিভিউ দেখুন",
    customer_experience_shared_prefix: "",
    customer_experience_shared_suffix: " জন কাস্টমার তাদের অভিজ্ঞতা শেয়ার করেছেন",
    helpful: "সহায়ক",
    reply: "রিপ্লাই",
    verified_buyer: "যাচাইকৃত ক্রেতা",
    review_date_prefix: "",
    review_date_suffix: " আগে",
    your_name: "আপনার নাম",
    your_rating: "রেটিং",
    your_review: "আপনার রিভিউ",
    products_breadcrumb: "পণ্যসমূহ",
    price_label: "মূল্য",
    order_now: "অর্ডার করুন",
    thumbnail: "থাম্বনেইল",
    grocery: "মুদি",

    // Cart & Checkout
    my_bag: "আপনার শপিং ব্যাগ",
    total: "মোট",
    checkout: "চেকআউট",
    delivery_time_label: "ডেলিভারি সময়",
    back_to_prev: "ফিরে যান",
    next_step: "পরবর্তী ধাপ",
    time_and_payment: "সময় ও পেমেন্ট",
    bkash_payment: "বিকাশ পেমেন্ট",
    nagad_payment: "নগদ পেমেন্ট",
    card_payment: "কার্ড পেমেন্ট",
    payment_instruction: "অনুগ্রহ করে পেমেন্ট করার পর ট্রানজেকশন আইডি দিন",
    transaction_id_placeholder: "ট্রানজ্যাকশন আইডি (যেমন: 8N7A6D5C)",
    ordering_status: "অর্ডার হচ্ছে...",

    order_date: "অর্ডারের তারিখ",
    bkash: "বিকাশ",
    nagad: "নগদ",
    cod_payment: "ক্যাশ অন ডেলিভারি",
    payment_method: "পেমেন্ট মেথড",
    delivery_address_label: "ডেলিভারি ঠিকানা",
    transaction_id_label: "ট্রানজেকশন আইডি",

    // Order Status
    status_pending: "অপেক্ষমান",
    status_processing: "প্রসেসিং",
    status_shipped: "পাঠানো হয়েছে",
    status_delivered: "ডেলিভারি হয়েছে",
    status_cancelled: "বাতিল",
    order_id_label: "অর্ডার আইডি",
    total_with_delivery: "সর্বমোট (ডেলিভারি সহ)",
    items_added_to_cart: "সব আইটেম কার্টে যোগ করা হয়েছে",
    total_amount: "মোট পরিমাণ",
    // duplicate key removed – my_orders already defined above
    loading_orders: "অর্ডার লোড হচ্ছে...",
    no_orders: "আপনার কোন অর্ডার নেই",
    reorder: "রি-অর্ডার",
    view_details: "বিস্তারিত দেখুন",
    hide_details: "বিস্তারিত লুকান",
    delivery_info: "ডেলিভারি তথ্য",
    confirm_order: "অর্ডার নিশ্চিত করুন",
    coupon_code: "কুপন কোড",
    apply: "অ্যাপ্লাই",
    order_success_title: "অর্ডার সফল হয়েছে!",
    order_success_desc: "আপনার অর্ডারের জন্য ধন্যবাদ। আমরা এটি পেয়েছি।",
    view_my_orders: "আমার অর্ডার দেখুন",
    continue_shopping: "কেনাকাটা চালিয়ে যান",

    // Common
    see_all: "সবগুলো দেখুন",
    back: "ফিরে যান",
    loading: "লোড হচ্ছে...",
    error: "দুঃখিত, কোনো সমস্যা হয়েছে!",
    category_subtitle: "আপনার পছন্দের পণ্যটি খুঁজে নিন",
    sub_categories_suffix: "টি সাব-ক্যাটাগরি",
    more_plus: " আরো",
    view_all_products_card: "সব পণ্য দেখুন",
    all_categories_back: "সব ক্যাটাগরি",
    category_header_desc_suffix: " ক্যাটাগরির সেরা এবং তাজা পণ্যগুলো আমাদের সংগ্রহে রয়েছে।",
    items_count_suffix: "টি পণ্য",
    items_suffix: "টি আইটেম",
    all_categories_hero_prefix: "সকল",
    all_categories_hero_highlight: "ক্যাটাগরি",
    category_hero_desc: "সেরা মানের তাজা পণ্যগুলো আপনার জন্য সাজানো হয়েছে ক্যাটাগরি অনুযায়ী",
    total_found: "মোট পাওয়া গেছে:",
    products_count_suffix: " টি প্রোডাক্ট",
    search_results_prefix: "“",
    search_results_suffix: "” এর ফলাফল",

    // Pagination
    showing_text: "দেখাচ্ছে",
    to_text: "থেকে",
    of_text: "এর মধ্যে",
    products_text: "পণ্য",
    previous_page: "পূর্ববর্তী পৃষ্ঠা",
    next_page: "পরবর্তী পৃষ্ঠা",

    // Hero
    hero_badge_1: "নতুন অফার - ২০% ছাড়",
    hero_title_1: "তাজা বাজার",
    hero_subtitle_1: "৬০ মিনিটে ডেলিভারি",
    hero_desc_1:
      "সরাসরি ফার্ম থেকে সংগৃহীত সেরা মানের পণ্য এখন আপনার দোরগোড়ায়।",
    hero_badge_2: "ফ্রি হোম ডেলিভারি",
    hero_title_2: "অর্গানিক ফল",
    hero_subtitle_2: "১০০% প্রাকৃতিক গুণমান",
    hero_desc_2:
      "কোনো রকম কেমিক্যাল ছাড়াই উৎপাদিত সেরা মানের ফল সংগ্রহ করুন আমাদের থেকে।",
    hero_badge_3: "আজকের সেরা ডিল",
    hero_title_3: "সেরা মুদি বাজার",
    hero_subtitle_3: "সাশ্রয়ী মূল্যে সেরা পণ্য",
    hero_desc_3:
      "চাউল, ডাল, তেল সহ সকল নিত্যপ্রয়োজনীয় পণ্য কিনুন সবচেয়ে কম দামে।",

    // Home Headings
    fresh_organic: "তাজা ও অর্গানিক গ্রোসারি",
    recently_viewed: "আপনার সম্প্রতি দেখা পণ্যসমূহ",
    flash_deals: "ফ্ল্যাশ ডিল",
    featured_products: "ফিচারড পণ্য",
    fresh_arrivals: "নতুন আগমন",
    product_section_title: "আমাদের সেরা কালেকশন",
    product_section_desc: "আপনার প্রতিদিনের প্রয়োজনের জন্য সেরা মানের পণ্যগুলো আমরা বেছে নিয়েছি।",
    product_section_subtitle: "আপনার জন্য বাছাইকৃত সেরা পণ্য",
    shop_all_products: "সব পণ্য দেখুন",
    combo_offers: "কম্বো অফার",
    special_offers: "স্পেশাল অফার",
    login: "লগইন",
    register: "রেজিস্টার",

    // Combo Offers
    combo_badge: "সেরা সাশ্রয়ী অফার",
    combo_title_1: "একসাথে কিনুন",
    combo_title_2: "বেশি সাশ্রয় করুন",
    combo_desc:
      "আমাদের বিশেষ কম্বো প্যাকগুলো আপনার পরিবারের মাসিক বাজারকে করবে আরও সহজ এবং সাশ্রয়ী। আজই বেছে নিন আপনার প্রয়োজনীয় প্যাকটি।",
    combo_family_pack: "ফ্যামিলি বাজার প্যাক",
    combo_breakfast: "ব্রেকফাস্ট কম্বো",
    combo_kitchen_kit: "রান্নাঘর কিট",
    combo_tag_best_value: "বেস্ট ভ্যালু",
    combo_tag_popular: "জনপ্রিয়",
    combo_tag_super_saver: "সুপার সেভার",
    combo_unit: "প্যাক",
    add_to_cart_success: "কার্টে যোগ করা হয়েছে!",
    wishlist_add_success: "উইশলিস্টে যোগ করা হয়েছে",
    wishlist_remove_success: "উইশলিস্ট থেকে সরানো হয়েছে",
    link_copied: "লিঙ্ক কপি করা হয়েছে",

    // Features
    feature_title_1: "দ্রুত ডেলিভারি",
    feature_desc_1: "ঢাকার ভেতরে ২৪ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি।",
    feature_title_2: "নিরাপদ পেমেন্ট",
    feature_desc_2: "আপনার পেমেন্ট শতভাগ নিরাপদ এবং সুরক্ষিত।",
    feature_title_3: "২৪/৭ সাপোর্ট",
    feature_desc_3: "যেকোনো সমস্যায় আমরা আছি আপনার পাশে সবসময়।",
    feature_title_4: "ক্যাশ অন ডেলিভারি",
    feature_desc_4: "পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা।",
    feature_title_5: "সতেজ পণ্য",
    feature_desc_5: "সরাসরি খামার থেকে সংগৃহীত বিষমুক্ত সতেজ সবজি।",
    feature_title_6: "সহজ রিটার্ন",
    feature_desc_6: "পণ্য পছন্দ না হলে ৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা।",

    // Daily Deals
    daily_deals_badge: "ফ্ল্যাশ ডিল - শুধুমাত্র আজকের জন্য",
    daily_deals_title: "সেরা বাজার",
    daily_deals_subtitle: "অর্ধেক দামে!",
    daily_deals_desc:
      "প্রতিদিন নতুন নতুন গ্রোসারি আইটেমে পাচ্ছেন ৫০% পর্যন্ত ডিসকাউন্ট। সময় শেষ হওয়ার আগেই লুফে নিন।",
    daily_deals_hour: "ঘণ্টা",
    daily_deals_minute: "মিনিট",
    daily_deals_second: "সেকেন্ড",
    daily_deals_view_offers: "অফার দেখুন",
    see_all_deals: "সব ডিল দেখুন",
    daily_deals_product_name: "তাজা আপেল",
    daily_deals_off: "ছাড়",
    daily_deals_max: "সর্বোচ্চ",

    // Ramadan Offers
    ramadan_badge: "রমজানুল মোবারক স্পেশাল",
    ramadan_title: "বরকতময় রমজানে",
    ramadan_subtitle: "সাশ্রয়ী বাজার",
    ramadan_desc:
      "সেহরি ও ইফতারের সব প্রয়োজনীয় পণ্য এখন পাচ্ছেন বিশেষ মূল্যে। সরাসরি আপনার ঘরে পৌঁছে দিচ্ছি আমরা।",
    ramadan_view_all: "সব অফার দেখুন",
    ramadan_more_offers: "আরও অফার",
    ramadan_combo_title: "ইফতার কম্বো",
    ramadan_combo_off: "১৫% ছাড়",
    ramadan_dates_title: "খেজুর ও বাদাম",
    ramadan_dates_off: "২০% ছাড়",
    ramadan_drinks_title: "শরবত ও পানীয়",
    ramadan_drinks_off: "১০% ছাড়",

    // Buy More Save More
    buy_more_title: "যত বেশি, তত সাশ্রয়!",
    buy_more_desc: "বেশি পরিমাণে কিনুন আর প্রতি ইউনিটে ডিসকাউন্ট পান।",
    buy_more_badge: "ভলিউম ডিসকাউন্ট",
    buy_more_regular_price: "সাধারণ দাম",
    buy_more_save_direct: "সরাসরি!",
    buy_more_increase_qty: "পরিমাণ বাড়ান",
    buy_more_save: "সাশ্রয়",
    buy_more_unit_kg: "কেজি",
    buy_more_unit_liter: "লিটার",
    buy_more_unit_pack: "প্যাক",
    buy_more_rice: "মিনিকেট চাল",
    buy_more_oil: "সয়াবিন তেল",
    buy_more_sugar: "চিনি (সাদা)",
    buy_more_dal: "মসুর ডাল",
    buy_more_soap: "গুড়ো সাবান",
    buy_more_rice_tiered: "৫কেজি কিনলে ৳৭০/কেজি",
    buy_more_oil_tiered: "৫লিটার কিনলে ৳১৫৮/লিটার",
    buy_more_sugar_tiered: "৩কেজি কিনলে ৳১৩৫/কেজি",
    buy_more_dal_tiered: "৫কেজি কিনলে ৳১২৮/কেজি",
    buy_more_soap_tiered: "৩প্যাক কিনলে ৳১১০/প্যাক",

    // Combo Packs (API Based)
    combo_packs_badge: "সাশ্রয়ী কম্বো",
    combo_packs_title: "বেস্ট ভ্যালু বান্ডেল",
    combo_packs_subtitle: "আপনার পরিবারের জন্য সেরা কম্বো প্যাক",
    combo_pack_save: "সাশ্রয়",
    combo_pack_items: "টি আইটেম",
    add_combo_to_cart: "কার্টে যোগ করুন",
    combo_stock_out: "স্টক আউট",
    view_deal: "ডিল দেখুন",
    combo_packs_title_accent: "একসাথে সব!",
    combo_packs_desc: "আলাদা কেনার চেয়ে কম্বোতে কিনলে সাশ্রয় হয় বেশি।",
    combo_packs_buy_now: "কম্বোটি কিনুন",
    combo_packs_save: "সাশ্রয়",

    // Eid Special
    eid_badge: "ঈদুল ফিতর স্পেশাল",
    eid_title: "ঈদের আনন্দ হোক",
    eid_subtitle: "সাশ্রয়ী কেনাকাটায়",
    eid_promo_label: "প্রোমোকোড",
    eid_add_to_bag: "ব্যাগে যোগ করুন",
    eid_tag: "ঈদের অফার",
    eid_unit_piece: "পিস",
    eid_semai: "লাচ্ছা সেমাই বক্স",
    eid_rice: "পোলাও চাল ৫কেজি",
    eid_milk: "গুড়ো দুধ ১কেজি",
    eid_spices: "মসলা গিফট বক্স",

    // Flash Deals (Section)
    flash_deals_badge: "লিমিটেড টাইম অফার",
    flash_deals_title_1: "আজকের",
    flash_deals_title_2: "ফ্ল্যাশ ডিল",
    flash_deals_off_text: "ছাড়",

    // Featured Products (Section)
    featured_products_title_1: "বাছাইকৃত",
    featured_products_title_2: "সেরা পণ্য",
    featured_products_desc:
      "সবচেয়ে জনপ্রিয় এবং নতুন আসা পণ্যের সমাহার থেকে আপনার পছন্দের পণ্যটি বেছে নিন।",
    featured_products_tab_trending: "ট্রেন্ডিং",
    featured_products_tab_bestsellers: "বেস্ট সেলার",
    featured_products_tab_new: "নতুন পণ্য",

    // Newsletter
    newsletter_badge: "নিউজলেটার সাবস্ক্রিপশন",
    newsletter_title_1: "পাওয়ারফুল ডিল মিস",
    newsletter_title_2: "করতে না চাইলে",
    newsletter_title_3: "সাবস্ক্রাইব করুন",
    newsletter_desc:
      "আমাদের নতুন প্রোডাক্ট এবং স্পেশাল অফারগুলো সরাসরি আপনার ইমেইলে পেতে এখনই সাবস্ক্রাইব করে রাখুন।",
    newsletter_placeholder: "আপনার ইমেইল অ্যাড্রেস লিখুন...",
    newsletter_button: "সাবস্ক্রাইব",
    newsletter_spam_note:
      "আমরা স্প্যাম পছন্দ করি না। আপনার ইমেইল নিরাপদ থাকবে।",

    // App Download
    app_download_badge: "মোবাইল অ্যাপ",
    app_download_title_1: "আপনার হাতের মুঠোয়",
    app_download_title_2: "সেরা বাজার",
    app_download_desc:
      "আমাদের মোবাইল অ্যাপ ডাউনলোড করুন এবং যেকোনো সময় যেকোনো জায়গা থেকে অর্ডার করুন। পাচ্ছেন আকর্ষণীয় সব ডিসকাউন্ট অফার!",
    app_download_benefit_1: "সহজ ও দ্রুত অর্ডার করার সুবিধা",
    app_download_benefit_2: "শুধুমাত্র অ্যাপ ব্যবহারকারীদের জন্য বিশেষ অফার",
    app_download_benefit_3: "রিয়েল-টাইম অর্ডার ট্র্যাকিং",
    app_download_benefit_4: "নিরাপদ পেমেন্ট গেটওয়ে",
    get_it_on: "আজই ডাউনলোড করুন",
    google_play: "গুগল প্লে স্টোর",
    download_on: "অ্যাপ স্টোরে পাবেন",
    app_store: "অ্যাপল স্টোর",

    // Testimonials
    testimonials_badge: "কাস্টমার ফিডব্যাক",
    testimonials_title_1: "আমাদের প্রিয়",
    testimonials_title_2: "কাস্টমাররা যা বলেন",
    testimonial_1_content:
      "আমি গত ৩ মাস ধরে এই দোকান থেকে বাজার করছি। পণ্যের মান সবসময়ই সেরা থাকে। বিশেষ করে তাদের দ্রুত ডেলিভারি সার্ভিস আমাকে মুগ্ধ করেছে। ঢাকার মধ্যে এতো দ্রুত ডেলিভারি আর কোথাও পাইনি।",
    testimonial_1_author: "সাকিব আহমেদ",
    testimonial_1_role: "রেগুলার কাস্টমার",
    testimonial_2_content:
      "অর্গানিক ফলের খোঁজে অনেক ঘুরেছি, শেষ পর্যন্ত এখানেই ভরসা পেলাম। ফ্রেশ এবং সুস্বাদু!",
    testimonial_2_author: "মারুফ হাসান",
    testimonial_2_role: "ফল প্রেমী",
    testimonial_3_content:
      "প্যাকিং কোয়ালিটি খুবই উন্নত। কোনো পণ্যই নষ্ট হওয়ার ভয় থাকে না।",
    testimonial_3_author: "রাহুল দাশ",
    testimonial_3_role: "চাকুরীজীবী",
    testimonial_4_content:
      "কাস্টমার সাপোর্ট অনেক হেল্পফুল। যেকোনো সমস্যার দ্রুত সমাধান দেন তারা। তাদের ব্যবহারের জন্য আমি বার বার ফিরে আসি।",
    testimonial_4_author: "আনিসা রহমান",
    testimonial_4_role: "গৃহিণী",
    testimonial_5_content:
      "দাম অনুযায়ী পণ্যের মান অনেক ভালো। বাজারের থেকে সাশ্রয়ী মনে হয়েছে।",
    testimonial_5_author: "তানভীর হোসেন",
    testimonial_5_role: "স্টুডেন্ট",

    // Combo Items
    combo_item_rice_5kg: "৫ কেজি চাল",
    combo_item_oil_2l: "২ লিটার তেল",
    combo_item_dal_1kg: "১ কেজি ডাল",
    combo_item_sugar_1kg: "১ কেজি চিনি",
    combo_item_bread_1p: "১ প্যাকেট পাউরুটি",
    combo_item_eggs_1d: "১ ডজন ডিম",
    combo_item_jelly_500g: "৫০০ গ্রাম জেলি",
    combo_item_banana_1kg: "১ কেজি কলা",
    combo_item_onion_1kg: "১ কেজি পেঁয়াজ",
    combo_item_garlic_500g: "৫০০ গ্রাম রসুন",
    combo_item_ginger_250g: "২৫০ গ্রাম আদা",
    combo_item_potato_1kg: "১ কেজি আলু",

    // Special Offer Banners
    banner_1_badge: "স্পেশাল অফার",
    banner_1_title: "তাজা ফলমূল ও সবজি",
    banner_1_desc: "সরাসরি বাগান থেকে সংগৃহীত, ১০০% ফরমালিন মুক্ত পণ্য।",
    banner_1_button: "অর্ডার দিন",
    banner_2_badge: "বিকেলের নাস্তা",
    banner_2_title: "বিস্কুট ও স্ন্যাকস আইটেম",
    banner_2_desc:
      "সেরা ব্র্যান্ডের ফ্রেশ বিস্কুট ও স্ন্যাকস এখন হাতের নাগালে।",
    banner_2_button: "সংগ্রহ করুন",

    // Product Section

    // SubCategory Spotlight
    subcategory_spotlight_badge: "পপুলার চয়েস",
    subcategory_spotlight_title_1: "জনপ্রিয়",
    subcategory_spotlight_title_2: "সাব-ক্যাটাগরি",
    


    

    // Prices & Savings
    price_75_tk: "৳৭৫",
    price_25_tk: "৳২৫",
    price_165_tk: "৳১৬৫",
    price_35_tk: "৳৩৫",
    price_140_tk: "৳১৪০",
    price_15_tk: "৳১৫",
    price_135_tk: "৳১৩৫",
    price_120_tk: "৳১২০",
    price_30_tk: "৳৩০",
    price_80_tk: "৳৮০",
    price_160_tk: "৳১৬০",
    percent_50: "৫০%",
    nav_products: "পণ্যসমূহ",
    nav_cart: "কার্ট",
    nav_home: "হোম",
    nav_search: "সার্চ",
    nav_categories: "ক্যাটাগরি",
    nav_profile: "প্রোফাইল",
    currency_symbol: "৳",
    cart_empty_title: "আপনার কার্ট খালি!",
    cart_empty_desc:
      "মনে হচ্ছে আপনি এখনো কিছু পছন্দ করেননি। আমাদের সেরা অফারগুলো দেখতে পারেন।",
    cart_start_shopping: "বাজার শুরু করুন",
    order_summary: "অর্ডার সামারি",
    discount_code: "ডিসকাউন্ট কোড",
    coupon_placeholder: "কুপন কোড দিন",
    apply_coupon: "অ্যাপ্লাই",
    subtotal: "সাব-টোটাল",
    delivery_charge: "ডেলিভারি চার্জ",
    free: "ফ্রি",
    vat: "ভ্যাট",
    vat_percentage: " (৫%)",
    discount: "ডিসকাউন্ট",
    grand_total: "সর্বমোট",
    secure_info_text:
      "আপনার সকল তথ্য নিরাপদ রাখা হবে। ক্যাশ অন ডেলিভারিতে কোনো অগ্রিম টাকা প্রদান করতে হয় না।",
    checkout_button: "চেকআউট করুন",
    secure_payment_guarantee: "নিরাপদ পেমেন্ট গ্যারান্টি",
    my_cart: "আমার কার্ট",
    
    promo_success: "প্রোমো কোড সফলভাবে যুক্ত হয়েছে!",
    promo_applied: "অ্যাপ্লাই করা হয়েছে",
    you_are_saving: "আপনি সাশ্রয় করছেন",
    coupon_invalid: "কুপনটি কার্যকর নয়",
    promo_error: "ভুল প্রোমো কোড",
    
    server_error: "সার্ভারে সমস্যা হয়েছে",
    notifications: "নোটিফিকেশন",
    new_count: "নতুন",
    no_notifications: "কোনো নোটিফিকেশন নেই",
    no_orders_found: "কোন অর্ডার পাওয়া যায়নি",
    no_orders_desc: "আপনি এখন পর্যন্ত কোনো অর্ডার করেননি। এখনই কেনাকাটা শুরু করুন!",
    shop_now_btn: "বাজার করুন",
    checkout_step_1: "ডেলিভারি তথ্য",
    checkout_step_2: "সময় নির্বাচন",
    checkout_step_3: "পেমেন্ট পদ্ধতি",
    checkout_step_4: "অর্ডার রিভিউ",
    popular_searches_title: "জনপ্রিয় সার্চ",
    popular_search_1: "তাজা সবজি",
    popular_search_2: "ইলিশ মাছ",
    popular_search_3: "দেশি মুরগি",
    popular_search_4: "চিনি",
    popular_search_5: "সয়াবিন তেল",
    
    off_20_percent: "-২০% ছাড়",
    rating: "রেটিং",
    delivery_slot_morning: "সকাল (৯টা - ১২টা)",
    delivery_slot_afternoon: "দুপুর (১২টা - ৩টা)",
    delivery_slot_evening: "বিকাল (৩টা - ৬টা)",
    delivery_slot_night: "রাত (৬টা - ৯টা)",
    see_all_notifications: "সবগুলো দেখুন",
    full_name: "পুরো নাম",
    name_placeholder: "আপনার নাম লিখুন",
    phone_number: "ফোন নম্বর",
    phone_placeholder: "০১XXXXXXXXX",
    detailed_address: "বিস্তারিত ঠিকানা (বাসা নং, রোড নং)",
    address_placeholder: "আপনার বিস্তারিত ঠিকানা লিখুন",
    continue: "এগিয়ে যান",
    select_delivery_time: "ডেলিভারি সময় নির্বাচন করুন",
    
    order_review: "অর্ডার রিভিউ",
    
    see_all_categories: "সবগুলো দেখুন",
    bundle_offer_title: "একসাথেই কিনুন (ব্যান্ডেল অফার)",
    bundle_total_price: "মোট মূল্য",
    bundle_extra_discount: "ব্যান্ডেলে অতিরিক্ত ৫% ছাড়!",
    bundle_add_all: "সবগুলো যুক্ত করুন",
    bundle_success: "সবগুলো আইটেম কার্টে যোগ করা হয়েছে",
    sub_category_label: "সাব-ক্যাটাগরি:",
    
    special_recommendations: "আপনার জন্য স্পেশাল রিকমেন্ডেশন",
    recommendations_desc: "আপনার পছন্দের ক্যাটাগরি থেকে বাছাইকৃত পণ্য",
    hero_welcome:
      "মোহাম্মদ ইমরান হোসাইন মুদির দোকানে আপনাকে স্বাগতম। সরাসরি ফার্ম থেকে সংগৃহীত সেরা মানের পণ্য এখন আপনার দোরগোড়ায়।",
    hero_start_shopping: "বাজার শুরু করুন",
    hero_todays_offers: "আজকের অফার",
    hero_bg_alt: "তাজা মুদি পণ্য",
    countdown_hours: "ঘন্টা",
    countdown_minutes: "মিনিট",
    countdown_seconds: "সেকেন্ড",
    countdown_flash_sale: "ফ্ল্যাশ সেল!",
    countdown_limited_time: "সীমিত সময়ের জন্য",
    stats_rating: "৪.৯ রেটিং",
    stats_satisfied: "৫০০০+ সন্তুষ্ট কাস্টমার",
    stats_fast_delivery: "দ্রুত ডেলিভারি",
    stats_at_doorstep: "৩০ মিনিটে আপনার দোরগোড়ায়",
    shop_name: "ইমরান শপ",
    welcome_back: "স্বাগতম",
    login_signup: "লগইন / সাইনআপ",
    navigation: "নেভিগেশন",
    home_page: "হোম পেজ",
    
    offers: "অফারসমূহ",
    top_categories: "টপ ক্যাটাগরি",
    logout: "লগ আউট",
    products_label: "পণ্যসমূহ",
    see_all_products: "সব প্রোডাক্ট দেখুন",
    category_not_found: "ক্যাটাগরি পাওয়া যায়নি",
    items_count: " টি পণ্য",
    
    results_label: "ফলাফল",
    sorting_label: "সর্টিং",
    category_empty_desc: "এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই। অন্য কোনো ক্যাটাগরি ট্রাই করুন।",
    search_product_placeholder: "পছন্দের পণ্য খুঁজুন...",
    search_button: "খুঁজুন",
    logged_in_as: "লগইন করেছেন",
    sort_newest: "নতুন পণ্য",
    sort_oldest: "পুরাতন পণ্য",
    sort_price_low: "দাম (কম থেকে বেশি)",
    sort_price_high: "দাম (বেশি থেকে কম)",
    apply_filter: "ফিল্টার প্রয়োগ করুন",
    
    checkout_title: "চেকআউট",
    step_text: "ধাপ",
    confirm_order_title: "অর্ডার নিশ্চিত করুন",
    confirm_order_text: "আপনি কি আপনার অর্ডারটি কনফার্ম করতে চান?",
    yes_order: "হ্যাঁ, অর্ডার করুন",
    no_go_back: "না, ফিরে যান",
    order_id: "অর্ডার আইডি",
    submit_error: "অর্ডার সাবমিট করতে সমস্যা হয়েছে",
    server_issue: "সার্ভারে সমস্যা হয়েছে, দয়া করে আবার চেষ্টা করুন",
    track_order_title: "আপনার অর্ডার ট্র্যাক করুন",
    
    track_step_1_title: "আইডি দিন",
    track_step_1_desc: "আপনার অর্ডার আইডিটি ইনপুট দিন",
    track_step_2_title: "অবস্থান দেখুন",
    track_step_2_desc: "রিয়েল-টাইম আপডেট পান",
    track_step_3_title: "ডেলিভারি নিন",
    track_step_3_desc: "পণ্য বুঝে নিন",



    // Order Tracking Page
    order_received: "অর্ডার রিসিভড",
    order_received_desc: "আপনার অর্ডারটি আমরা পেয়েছি",
    order_confirmed: "অর্ডার কনফার্মড",
    order_confirmed_desc: "আপনার অর্ডারটি নিশ্চিত করা হয়েছে",
    packing_in_progress: "প্যাকিং চলছে",
    packing_in_progress_desc: "আপনার পণ্যগুলো প্যাক করা হচ্ছে",
    shipped: "ডেলিভারিতে আছে",
    shipped_desc: "আপনার অর্ডারটি ডেলিভারির জন্য পাঠানো হয়েছে",
    delivered: "ডেলিভারি সম্পন্ন",
    delivered_desc: "অর্ডারটি আপনার কাছে পৌঁছেছে",
    order_not_found: "অর্ডার পাওয়া যায়নি",
    order_not_found_desc:
      "আপনার দেওয়া অর্ডার আইডিটি সঠিক নয় অথবা অর্ডারটি মুছে ফেলা হয়েছে।",
    back_to_order_list: "অর্ডার লিস্টে ফিরে যান",
    go_back: "ফিরে যান",
    order_tracking_label: "অর্ডার ট্র্যাকিং",
    
    
    // Order Status (use canonical set above)
    status_confirmed: "নিশ্চিত করা হয়েছে",
    
    // Order Timeline
    timeline_order_received: "অর্ডার গৃহীত",
    timeline_packing: "প্যাকিং চলছে",
    timeline_shipping: "রাস্তায় আছে",
    timeline_delivered: "ডেলিভারি সম্পন্ন",
    timeline_in_progress: "ইন প্রগ্রেস",

    expected_delivery: "আশা করা হচ্ছে: ২৪ ঘণ্টার মধ্যে",
    last_updated: "সর্বশেষ আপডেট",
    completed: "সম্পন্ন",
    
    delivery_boy: "ডেলিভারি বয়",

    
    
    

    
    
    // Order Status
    
    
    
    // Category Map
    category_map_title: "ক্যাটাগরি ম্যাপ",
    category_map_desc: "এক নজরে আমাদের সব কালেকশন দেখে নিন এবং সরাসরি আপনার পছন্দের সেকশনে চলে যান।",
    view_all_arrow: "সবগুলো দেখুন →",
    
    // Timeline (Profile)

    // Terms
    terms_title: "টার্মস ও কন্ডিশন",
    terms_content: "আমাদের সেবা ব্যবহারের ক্ষেত্রে কিছু নিয়ম ও শর্তাবলী প্রযোজ্য। অনুগ্রহ করে এগুলো মনোযোগ দিয়ে পড়ুন।",
    
    // Privacy
    privacy_title: "প্রাইভেসি পলিসি",
    privacy_content: "আপনার ব্যক্তিগত তথ্যের সুরক্ষা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা আপনার তথ্য কীভাবে সংগ্রহ এবং ব্যবহার করি তা এখানে বর্ণনা করা হয়েছে।",

    // Cart
    your_shopping_bag: "আপনার শপিং ব্যাগ",
    items_in_bag_count_prefix: "মোট",
    items_in_bag_count_suffix: "টি পণ্য আপনার ব্যাগে আছে",
    your_bag: "আপনার ব্যাগ",
    view_cart: "কার্ট দেখুন",
    total_label: "সর্বমোট",
    
    // Product Details
    product_details_title: "পণ্যের বিবরণ",
    product_details_desc_prefix: "আমাদের",
    product_details_desc_suffix: "সরাসরি সেরা উৎস থেকে সংগৃহীত। আমরা প্রতিটি পণ্যের গুণমান কঠোরভাবে যাচাই করি যাতে আপনি সেরা অভিজ্ঞতা পান। এটি একটি স্বাস্থ্যকর এবং পুষ্টিকর পছন্দ।",
    features_title: "বৈশিষ্ট্যসমূহ:",
    feature_1: "১০০% তাজা ও প্রাকৃতিক",
    feature_2: "কোনো ভেজাল বা প্রিজারভেটিভ নেই",
    feature_3: "সঠিক ওজন ও পরিমাপ",
    feature_4: "স্বাস্থ্যসম্মতভাবে প্যাক করা",
    delivery_info_title: "ডেলিভারি তথ্য:",
    delivery_info_desc: "অর্ডার কনফার্ম করার ২৪ ঘন্টার মধ্যে ঢাকা শহরের ভেতরে এবং ২-৩ দিনের মধ্যে সারা বাংলাদেশে ডেলিভারি করা হয়। ক্যাশ অন ডেলিভারি সুবিধা আছে।",
    
    in_stock_label: "স্টকে আছে",
    

    // Customer Reviews
    customer_reviews_title: "কাস্টমার রিভিউ",
    

    
    
    
    
    // Profile & Loyalty
    
    
    // Address & Payment
    
    add_bkash_nagad: "বিকাশ / নগদ যোগ করুন",
    
    
    // Profile Edit
    

    // App Download
    app_mockup_alt: "অ্যাপ মকআপ",

    

    
    
    
  },
};
