export const products = [
  {
    id: 'coffee-lavender-latte',
    name: 'Lavender Blossom Latte',
    price: 5950,
    rating: 4.9,
    reviewsCount: 124,
    category: 'Coffee',
    description: 'An elegant espresso blend infused with organic lavender syrup, steamed oat milk, and a delicate touch of honey, topped with dried lavender petals.',
    ingredients: ['Espresso', 'Oat Milk', 'Organic Lavender Syrup', 'Wildflower Honey', 'Culinary Lavender Buds'],
    calories: 180,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/coffee_latte.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 800 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['0%', '25%', '50%', '100%'],
    toppings: [
      { name: 'Extra Espresso Shot', price: 1000 },
      { name: 'Whipped Cream', price: 500 },
      { name: 'Lavender Sprinkles', price: 250 }
    ]
  },
  {
    id: 'coffee-rose-espresso',
    name: 'Rose Gold Macchiato',
    price: 6250,
    rating: 4.8,
    reviewsCount: 89,
    category: 'Coffee',
    description: 'Rich espresso layered over velvety steamed almond milk and pure rosewater syrup, dusted with edible 24k gold leaf particles.',
    ingredients: ['Espresso', 'Almond Milk', 'Rosewater Syrup', 'Edible Gold Dust'],
    calories: 140,
    isSpecial: false,
    isBestSeller: false,
    isLimited: true,
    image: '/src/assets/images/rose_espresso.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 850 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['0%', '25%', '50%', '100%'],
    toppings: [
      { name: 'Extra Espresso Shot', price: 1000 },
      { name: 'Caramel Drizzle', price: 500 }
    ]
  },
  {
    id: 'matcha-velvet-latte',
    name: 'Pink Velvet Matcha',
    price: 6450,
    rating: 4.9,
    reviewsCount: 198,
    category: 'Matcha',
    description: 'Ceremonial grade Uji matcha whisked with water and poured over sweet, pink strawberry-infused milk and cold foam.',
    ingredients: ['Ceremonial Matcha', 'Strawberry Puree', 'Whole Milk', 'Vanilla Cold Foam'],
    calories: 220,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/matcha_latte.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 900 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['0%', '25%', '50%', '100%'],
    toppings: [
      { name: 'Extra Matcha Powder', price: 1250 },
      { name: 'Strawberry Cold Foam', price: 750 },
      { name: 'Whipped Cream', price: 500 }
    ]
  },
  {
    id: 'matcha-sakura',
    name: 'Sakura Matcha Cloud',
    price: 6750,
    rating: 4.7,
    reviewsCount: 64,
    category: 'Matcha',
    description: 'A delicate layer of premium matcha sitting atop sweet cherry blossom cloud cream and creamy coconut milk.',
    ingredients: ['Uji Matcha', 'Cherry Blossom Syrup', 'Coconut Milk', 'Sea Salt Cloud Foam'],
    calories: 195,
    isSpecial: false,
    isBestSeller: false,
    isLimited: true,
    image: '/src/assets/images/sakura_matcha.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 900 }
    ],
    sugarLevels: ['30%', '50%', '100%'],
    iceLevels: ['25%', '50%', '100%'],
    toppings: [
      { name: 'Sakura Petals', price: 300 },
      { name: 'Extra Matcha Powder', price: 1250 }
    ]
  },
  {
    id: 'boba-royal-taro',
    name: 'Taro Blossom Boba',
    price: 6250,
    rating: 4.8,
    reviewsCount: 154,
    category: 'Boba',
    description: 'Real puréed sweet taro slow-cooked with cane sugar, blended with creamy jasmine milk tea and slow-cooked honey boba pearls.',
    ingredients: ['Taro Purée', 'Jasmine Green Tea', 'Creamer', 'Honey Boba Pearls'],
    calories: 320,
    isSpecial: false,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/boba_taro.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 750 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['0%', '25%', '50%', '100%'],
    toppings: [
      { name: 'Extra Honey Boba', price: 750 },
      { name: 'Brown Sugar Jelly', price: 750 },
      { name: 'Cheese Foam', price: 1000 }
    ]
  },
  {
    id: 'boba-strawberry-cream',
    name: 'Strawberry Crème Boba',
    price: 6500,
    rating: 4.9,
    reviewsCount: 172,
    category: 'Boba',
    description: 'Fresh crushed organic strawberries, brown sugar boba pearls, creamy milk, topped with a thick layer of salted cheese cream.',
    ingredients: ['Organic Strawberries', 'Brown Sugar Boba', 'Fresh Milk', 'Salted Cheese Cream'],
    calories: 290,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/boba_strawberry.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 800 }
    ],
    sugarLevels: ['30%', '50%', '100%'],
    iceLevels: ['25%', '50%', '100%'],
    toppings: [
      { name: 'Extra Brown Sugar Boba', price: 750 },
      { name: 'Lychee Jelly', price: 700 },
      { name: 'Egg Pudding', price: 900 }
    ]
  },
  {
    id: 'smoothie-pink-paradise',
    name: 'Pink Dragon Smoothie',
    price: 6950,
    rating: 4.7,
    reviewsCount: 92,
    category: 'Smoothies',
    description: 'A vibrant blend of pink dragonfruit, organic strawberries, banana, Greek yogurt, and fresh pressed apple juice, topped with chia seeds.',
    ingredients: ['Pink Pitaya', 'Strawberries', 'Banana', 'Greek Yogurt', 'Apple Juice', 'Chia Seeds'],
    calories: 210,
    isSpecial: false,
    isBestSeller: false,
    isLimited: false,
    image: '/src/assets/images/smoothie_dragon.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 1000 }
    ],
    sugarLevels: ['0%', '50%', '100%'],
    iceLevels: ['50%', '100%'],
    toppings: [
      { name: 'Chia Seeds', price: 300 },
      { name: 'Plant Protein Powder', price: 1500 },
      { name: 'Almond Butter Swirl', price: 1000 }
    ]
  },
  {
    id: 'smoothie-berry-glow',
    name: 'Berry Collagen Glow',
    price: 7250,
    rating: 4.8,
    reviewsCount: 110,
    category: 'Smoothies',
    description: 'Blueberries, raspberries, and strawberries blended with coconut water, avocado, and premium marine collagen peptides for skin radiance.',
    ingredients: ['Mixed Berries', 'Coconut Water', 'Avocado', 'Marine Collagen Peptides'],
    calories: 165,
    isSpecial: true,
    isBestSeller: false,
    isLimited: true,
    image: '/src/assets/images/smoothie_berry.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 1200 }
    ],
    sugarLevels: ['0%', '50%'],
    iceLevels: ['50%', '100%'],
    toppings: [
      { name: 'Extra Collagen', price: 1500 },
      { name: 'Hemp Seeds', price: 400 }
    ]
  },
  {
    id: 'milkshake-unicorn',
    name: 'Unicorn Dream Milkshake',
    price: 7500,
    rating: 4.9,
    reviewsCount: 215,
    category: 'Milkshakes',
    description: 'A whimsical swirl of vanilla bean ice cream, white chocolate, and strawberry coulis, decorated with rainbow sprinkles and a waffle cone chimney.',
    ingredients: ['Vanilla Ice Cream', 'Strawberry Coulis', 'White Chocolate', 'Rainbow Sprinkles', 'Waffle Cone'],
    calories: 450,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/milkshake_unicorn.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 1000 }
    ],
    sugarLevels: ['50%', '100%'],
    iceLevels: ['100%'],
    toppings: [
      { name: 'Whipped Cream', price: 500 },
      { name: 'Marshmallows', price: 500 },
      { name: 'Edible Sparkles', price: 300 }
    ]
  },
  {
    id: 'milkshake-velvet-cookie',
    name: 'Red Velvet Oreo Shake',
    price: 7250,
    rating: 4.6,
    reviewsCount: 132,
    category: 'Milkshakes',
    description: 'Creamy red velvet ice cream blended with crushed Oreo cookies and cream cheese frosting, topped with chocolate drizzle.',
    ingredients: ['Red Velvet Ice Cream', 'Oreo Cookies', 'Cream Cheese Frosting', 'Chocolate Syrup'],
    calories: 490,
    isSpecial: false,
    isBestSeller: false,
    isLimited: false,
    image: '/src/assets/images/milkshake_cookie.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 900 }
    ],
    sugarLevels: ['50%', '100%'],
    iceLevels: ['100%'],
    toppings: [
      { name: 'Crushed Oreos', price: 600 },
      { name: 'Whipped Cream', price: 500 },
      { name: 'Cream Cheese Frosting Swirl', price: 800 }
    ]
  },
  {
    id: 'refresher-rose-lychee',
    name: 'Lychee Rose Refresher',
    price: 5750,
    rating: 4.8,
    reviewsCount: 88,
    category: 'Refreshers',
    description: 'Light, crisp iced hibiscus and white tea base shaken with fresh lychee fruit juice and organic rose nectar, served over crushed ice.',
    ingredients: ['White Tea', 'Hibiscus Extract', 'Lychee Juice', 'Lychee Fruit', 'Rose Nectar'],
    calories: 85,
    isSpecial: false,
    isBestSeller: false,
    isLimited: false,
    image: '/src/assets/images/refresher_rose.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 700 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['50%', '100%'],
    toppings: [
      { name: 'Lychee Jelly', price: 700 },
      { name: 'Aloe Vera Cubes', price: 600 },
      { name: 'Chia Seeds', price: 300 }
    ]
  },
  {
    id: 'refresher-peachy-jasmine',
    name: 'Peach Jasmine Fizz',
    price: 5950,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Refreshers',
    description: 'Effervescent sparkling water infused with white peach purée, premium cold-brewed jasmine tea, and fresh mint leaves.',
    ingredients: ['Jasmine Tea', 'Peach Purée', 'Sparkling Water', 'Mint Leaves', 'Peach Slices'],
    calories: 90,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/refresher_peach.png',
    sizes: [
      { name: 'Regular', priceAdjustment: 0 },
      { name: 'Large', priceAdjustment: 750 }
    ],
    sugarLevels: ['0%', '30%', '50%', '100%'],
    iceLevels: ['50%', '100%'],
    toppings: [
      { name: 'Popping Boba (Peach)', price: 800 },
      { name: 'Mint Leaves Extra', price: 200 }
    ]
  },
  {
    id: 'dessert-strawberry-shortcake',
    name: 'Signature Sakura Shortcake',
    price: 6950,
    rating: 4.9,
    reviewsCount: 165,
    category: 'Desserts',
    description: 'Layers of fluffy chiffon sponge cake, fresh organic strawberries, and light sakura blossom whipped cream, topped with white chocolate curls.',
    ingredients: ['Chiffon Cake', 'Fresh Strawberries', 'Sakura Whipped Cream', 'White Chocolate Curls'],
    calories: 280,
    isSpecial: true,
    isBestSeller: true,
    isLimited: false,
    image: '/src/assets/images/dessert_cake.png',
    sizes: [
      { name: 'Single Slice', priceAdjustment: 0 },
      { name: 'Whole Cake (Pre-order)', priceAdjustment: 32000 }
    ],
    sugarLevels: ['100%'],
    iceLevels: ['0%'],
    toppings: [
      { name: 'Extra Strawberries', price: 1000 },
      { name: 'Gold Leaf Particle', price: 500 }
    ]
  },
  {
    id: 'dessert-matcha-mille-crepe',
    name: 'Uji Matcha Mille Crepe',
    price: 7250,
    rating: 4.8,
    reviewsCount: 114,
    category: 'Desserts',
    description: 'Twenty paper-thin crepe layers stacked with velvety matcha pastry cream, lightly dusted with fine Uji matcha powder.',
    ingredients: ['Crepes', 'Matcha Pastry Cream', 'Uji Matcha Powder'],
    calories: 310,
    isSpecial: false,
    isBestSeller: false,
    isLimited: false,
    image: '/src/assets/images/dessert_crepe.png',
    sizes: [
      { name: 'Single Slice', priceAdjustment: 0 },
      { name: 'Whole Cake (Pre-order)', priceAdjustment: 36000 }
    ],
    sugarLevels: ['100%'],
    iceLevels: ['0%'],
    toppings: [
      { name: 'Red Bean Paste', price: 800 },
      { name: 'Matcha Drizzle', price: 550 }
    ]
  },
  {
    id: 'dessert-rose-macaron',
    name: 'Rose Raspberry Macaron (Giant)',
    price: 5500,
    rating: 4.7,
    reviewsCount: 82,
    category: 'Desserts',
    description: 'A jumbo rose-flavored almond macaron shell filled with fresh organic raspberries and light lychee buttercream.',
    ingredients: ['Almond Flour', 'Egg Whites', 'Sugar', 'Butter', 'Rose Extract', 'Fresh Raspberries', 'Lychee Jam'],
    calories: 210,
    isSpecial: false,
    isBestSeller: false,
    isLimited: true,
    image: '/src/assets/images/dessert_macaron.png',
    sizes: [
      { name: 'Regular Size', priceAdjustment: 0 }
    ],
    sugarLevels: ['100%'],
    iceLevels: ['0%'],
    toppings: [
      { name: 'Rose Petals Decor', price: 200 }
    ]
  }
];
