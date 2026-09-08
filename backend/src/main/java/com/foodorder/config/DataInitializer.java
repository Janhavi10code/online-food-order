package com.foodorder.config;

import com.foodorder.model.FoodItem;
import com.foodorder.model.Restaurant;
import com.foodorder.model.User;
import com.foodorder.repository.FoodItemRepository;
import com.foodorder.repository.RestaurantRepository;
import com.foodorder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0 && restaurantRepository.count() > 0) {
            return; // Already initialized
        }

        // 1. Seed Users
        if (userRepository.count() == 0) {
            User demoUser = new User(
                    "demo_user",
                    "user@foodorder.com",
                    passwordEncoder.encode("password123"),
                    "Rahul Sharma",
                    "+91 9876543210",
                    "A-402, Sunshine Heights, MG Road, Pune"
            );
            userRepository.save(demoUser);

            User adminUser = new User(
                    "admin",
                    "admin@foodorder.com",
                    passwordEncoder.encode("admin123"),
                    "System Admin",
                    "+91 9999988888",
                    "Tech Park HQ, Mumbai"
            );
            adminUser.setRole("ROLE_ADMIN");
            userRepository.save(adminUser);
        }

        if (restaurantRepository.count() == 0) {
            // 2. Seed Restaurants
            Restaurant dakshin = new Restaurant(
                    "Dakshin Delights",
                    "Authentic Flavors of Tamil Nadu, Karnataka & Kerala",
                    "South Indian, Dosa Specialist, Filter Coffee",
                    4.8, 480, 25, 25.0, 350,
                    "Shop 12, Heritage Square, FC Road, Pune",
                    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1000&q=80",
                    true
            );
            dakshin = restaurantRepository.save(dakshin);

            Restaurant swadMaha = new Restaurant(
                    "Shree Swad Maharashtrian Rasoi",
                    "Traditional Recipes from Kolhapur, Pune & Konkan",
                    "Maharashtrian, Misal Pav, Puran Poli, Thali",
                    4.7, 620, 20, 20.0, 300,
                    "Near Shivaji Park, Dadar West, Mumbai",
                    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1000&q=80",
                    true
            );
            swadMaha = restaurantRepository.save(swadMaha);

            Restaurant goldenDragon = new Restaurant(
                    "Golden Dragon Pan-Asian & Wok",
                    "Authentic Sichuan, Cantonese & Street Wok Specials",
                    "Chinese, Dim Sums, Hakka Noodles, Schezwan",
                    4.6, 390, 30, 30.0, 550,
                    "3rd Floor, Phoenix Marketcity, Viman Nagar, Pune",
                    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=1000&q=80",
                    true
            );
            goldenDragon = restaurantRepository.save(goldenDragon);

            Restaurant bistroManhattan = new Restaurant(
                    "The Manhattan Grill & Artisan Bistro",
                    "Gourmet Handcrafted Burgers, Sourdough Pizzas & Pastas",
                    "Western, Gourmet Burgers, Artisan Pizza, Pasta",
                    4.9, 540, 35, 40.0, 750,
                    "Bandra Kurla Complex (BKC), Mumbai",
                    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80",
                    true
            );
            bistroManhattan = restaurantRepository.save(bistroManhattan);

            // 3. Seed Food Items

            // --- SOUTH INDIAN ---
            foodItemRepository.save(new FoodItem(
                    "Ghee Roast Mysore Masala Dosa",
                    "Golden crispy fermented crepe roasted with pure desi ghee, layered with spicy red garlic chutney and potato masala, served with 3 artisanal coconut/tomato chutneys and piping hot drumstick sambar.",
                    180.0, "South Indian", "Dosa",
                    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80",
                    true, true, 2, 420, 15, 4.9, dakshin
            ));

            foodItemRepository.save(new FoodItem(
                    "Steamed Button Ghee Podi Idli (12 Pcs)",
                    "Melt-in-the-mouth mini button idlis generously tossed in aromatic roasted gun-powder podi and hot clarified butter.",
                    150.0, "South Indian", "Idli",
                    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
                    true, false, 1, 310, 12, 4.8, dakshin
            ));

            foodItemRepository.save(new FoodItem(
                    "Medu Vada Platter (2 Pcs)",
                    "Crispy golden exterior with fluffy interior lentil donuts seasoned with crushed black pepper, ginger, and curry leaves.",
                    120.0, "South Indian", "Snacks",
                    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80",
                    true, false, 1, 280, 10, 4.7, dakshin
            ));

            foodItemRepository.save(new FoodItem(
                    "Hyderabadi Dum Biryani (Pot)",
                    "Slow-cooked long-grain Basmati rice infused with whole aromatic spices, saffron milk, caramelized brown onions, and served with salan and mint burani raita.",
                    290.0, "South Indian", "Biryani",
                    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
                    true, true, 3, 560, 25, 4.9, dakshin
            ));

            foodItemRepository.save(new FoodItem(
                    "Traditional Kumbakonam Degree Filter Coffee",
                    "Freshly brewed thick chicory decoction frothed with high-cream milk in a traditional brass dabara and tumbler.",
                    65.0, "South Indian", "Beverages",
                    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
                    true, false, 0, 120, 5, 4.9, dakshin
            ));

            // --- MAHARASHTRIAN ---
            foodItemRepository.save(new FoodItem(
                    "Kolhapuri Kat / Tarri Misal Pav",
                    "Famous fiery sprouted moth bean curry simmered in authentic Kolhapuri Lavangi spices, topped with farsan crunch, diced red onions, cilantro, and two buttered pavs.",
                    160.0, "Maharashtrian", "Breakfast & Snacks",
                    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
                    true, true, 3, 440, 15, 4.9, swadMaha
            ));

            foodItemRepository.save(new FoodItem(
                    "Mumbai Special Batata Vada Pav (2 Pcs)",
                    "The heartbeat of Maharashtra: spiced mashed potato fritters batter-fried in chickpea flour, served inside fresh pav buns with spicy dry garlic chutney and fried salted green chillies.",
                    90.0, "Maharashtrian", "Street Food",
                    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
                    true, true, 2, 380, 8, 4.8, swadMaha
            ));

            foodItemRepository.save(new FoodItem(
                    "Special Butter Pav Bhaji",
                    "Velvety, slow-simmered medley of mashed seasonal vegetables with tomatoes and secret tawa spices, topped with a giant slab of melting Amul butter and roasted pav.",
                    190.0, "Maharashtrian", "Main Course",
                    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
                    true, true, 2, 510, 18, 4.9, swadMaha
            ));

            foodItemRepository.save(new FoodItem(
                    "Authentic Puran Poli with Desi Ghee (2 Pcs)",
                    "Traditional festive sweet flatbread stuffed with delicate chana dal, organic jaggery, cardamom, and nutmeg, served steaming hot drizzled with warm Sajuk Ghee.",
                    170.0, "Maharashtrian", "Desserts",
                    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
                    true, false, 0, 390, 15, 4.9, swadMaha
            ));

            foodItemRepository.save(new FoodItem(
                    "Crispy Kothimbir Vadi Platter",
                    "Steamed and pan-crisped savory squares made from fresh cilantro coriander leaves, roasted sesame seeds, and spiced gram flour, served with tangy tamarind chutney.",
                    130.0, "Maharashtrian", "Snacks",
                    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
                    true, false, 1, 260, 12, 4.7, swadMaha
            ));

            // --- CHINESE ---
            foodItemRepository.save(new FoodItem(
                    "Steamed Crystal Dumplings / Dim Sums (6 Pcs)",
                    "Hand-wrapped delicate translucent dumplings filled with crunchy water chestnuts, baby corn, shiitake mushrooms, and scallions, served with spicy chili garlic dip.",
                    240.0, "Chinese", "Dim Sums",
                    "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
                    true, false, 1, 210, 15, 4.8, goldenDragon
            ));

            foodItemRepository.save(new FoodItem(
                    "Wok-Tossed Schezwan Hakka Noodles",
                    "Smoky high-flame wok noodles with shredded cabbage, bell peppers, scallions, and signature spicy Schezwan chili paste.",
                    210.0, "Chinese", "Noodles",
                    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
                    true, true, 2, 430, 15, 4.7, goldenDragon
            ));

            foodItemRepository.save(new FoodItem(
                    "Crispy Veg Manchurian in Hot Garlic Gravy",
                    "Golden vegetable balls tossed in a rich, dark umami garlic-coriander gravy with soy sauce and spring onions.",
                    220.0, "Chinese", "Main Course",
                    "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80",
                    true, true, 2, 380, 18, 4.8, goldenDragon
            ));

            foodItemRepository.save(new FoodItem(
                    "Smoky Burnt Garlic & Egg Fried Rice",
                    "Fragrant long grain rice stir-fried in a wok with scrambled farm eggs, crispy roasted golden garlic, and sweet peas.",
                    230.0, "Chinese", "Rice",
                    "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
                    false, false, 1, 460, 14, 4.7, goldenDragon
            ));

            foodItemRepository.save(new FoodItem(
                    "Kung Pao Paneer / Chicken Sizzler Bowl",
                    "Tender protein cubes wok-glazed in sweet and tangy sauce with roasted crunchy peanuts and Sichuan dried peppers.",
                    260.0, "Chinese", "Starters",
                    "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
                    false, true, 3, 490, 20, 4.8, goldenDragon
            ));

            // --- WESTERN ---
            foodItemRepository.save(new FoodItem(
                    "Smoked BBQ Double Smash Cheeseburger",
                    "Double smashed tender patty seared to perfection with melted aged Wisconsin cheddar, crispy onions, dill pickles, and smoked hickory BBQ sauce on a brioche bun.",
                    290.0, "Western", "Burgers",
                    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
                    false, false, 1, 620, 18, 4.9, bistroManhattan
            ));

            foodItemRepository.save(new FoodItem(
                    "Artisan Neapolitan Margherita Pizza (11-Inch)",
                    "Slow fermented sourdough crust, San Marzano tomato reduction, buffalo mozzarella, drizzled with extra virgin olive oil and fresh torn sweet basil.",
                    360.0, "Western", "Pizza",
                    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
                    true, false, 0, 680, 20, 4.9, bistroManhattan
            ));

            foodItemRepository.save(new FoodItem(
                    "Creamy Truffle Mushroom Fettuccine",
                    "Handmade fettuccine swirled in rich heavy cream sauce with wild button & portobello mushrooms, fresh herbs, and white truffle oil.",
                    340.0, "Western", "Pasta",
                    "/images/mushroom_pasta.jpg",
                    true, false, 0, 520, 18, 4.8, bistroManhattan
            ));

            foodItemRepository.save(new FoodItem(
                    "Crispy Peri-Peri Chicken Strips & Dips",
                    "Panko-crusted chicken tenders dusted in spicy African bird's eye chili seasoning, served with garlic ranch and smoked honey dip.",
                    250.0, "Western", "Appetizers",
                    "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80",
                    false, true, 2, 410, 15, 4.7, bistroManhattan
            ));

            foodItemRepository.save(new FoodItem(
                    "Loaded Cheddar & Jalapeño Fries",
                    "Golden skin-on french fries showered in hot gooey cheddar cheese sauce, pickled jalapeños, crispy spring onions, and sour cream.",
                    180.0, "Western", "Sides",
                    "/images/loaded_fries.jpg",
                    true, true, 2, 450, 12, 4.8, bistroManhattan
            ));
        }

        System.out.println(">>> SEED DATA INITIALIZATION COMPLETED SUCCESSFULLY! <<<");
    }
}
