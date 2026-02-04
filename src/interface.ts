/*
===============================================================================
                        INTERFACES - BEGINNER'S COMPLETE GUIDE
===============================================================================

## INTERFACE KYA HAI?
Interface ek CONTRACT hai jo define karta hai ki object ka structure kaisa hona chahiye.
Ye blueprint ki tarah hai - batata hai ki kya properties honi chahiye aur unka type kya hoga.

## TYPE vs INTERFACE - KYA DIFFERENCE HAI?

TYPE:
- Union types bana sakte hain (string | number)
- Primitive types define kar sakte hain
- Computed properties support karta hai

INTERFACE:
- Sirf object structure define karta hai
- Extend kar sakte hain (inheritance)
- Declaration merging support karta hai
- Classes implement kar sakte hain

## KAB INTERFACE USE KARE?
✅ Object structure define karne ke liye
✅ Class contracts banane ke liye  
✅ API response structure define karne ke liye
✅ Props structure (React mein)

## KAB TYPE USE KARE?
✅ Union types ke liye (string | number)
✅ Primitive types ke liye
✅ Complex computed types ke liye

===============================================================================
*/

// =================== BASIC INTERFACE ===================

// ✅ SAHI WAY - Interface define karna
interface ChaiOrder {
    type: string;        // Chai ka type (required)
    sugar: number;       // Sugar ki quantity (required)
    milk: boolean;       // Milk chahiye ya nahi (required)
}

// Interface use karna
function makeChaiOrder(order: ChaiOrder) {
    return `Making ${order.type} chai with ${order.sugar} sugar, milk: ${order.milk}`;
}

// Valid usage
const myOrder: ChaiOrder = {
    type: "masala",
    sugar: 2,
    milk: true
};

// ❌ GALAT - Properties missing hongi toh error
// const badOrder: ChaiOrder = {
//     type: "ginger"  // ERROR: sugar aur milk missing
// };

// =================== OPTIONAL PROPERTIES ===================

interface FlexibleChaiOrder {
    type: string;           // Required property
    sugar?: number;         // Optional property (? se)
    milk?: boolean;         // Optional property
    temperature?: "hot" | "cold";  // Optional with literal types
}

function makeFlexibleOrder(order: FlexibleChaiOrder) {
    // Optional properties ko safely access karna
    const sugarAmount = order.sugar || 1;  // Default value
    const hasMilk = order.milk ?? true;    // Nullish coalescing
    
    return `${order.type} chai, sugar: ${sugarAmount}, milk: ${hasMilk}`;
}

// Valid - sirf required property
const simpleOrder: FlexibleChaiOrder = {
    type: "green tea"
};

// Valid - kuch optional properties
const detailedOrder: FlexibleChaiOrder = {
    type: "masala",
    sugar: 3,
    temperature: "hot"
};

// =================== READONLY PROPERTIES ===================

interface ChaiMenu {
    readonly id: number;        // Readonly - change nahi kar sakte
    readonly name: string;      // Readonly property
    price: number;              // Normal property - change kar sakte hain
    available: boolean;
}

const menuItem: ChaiMenu = {
    id: 1,
    name: "Special Masala Chai",
    price: 25,
    available: true
};

// ✅ SAHI - Normal property change kar sakte hain
menuItem.price = 30;
menuItem.available = false;

// ❌ GALAT - Readonly property change nahi kar sakte
// menuItem.id = 2;        // ERROR
// menuItem.name = "New";  // ERROR

// =================== INTERFACE EXTENSION (INHERITANCE) ===================

// Base interface
interface BasicChai {
    type: string;
    price: number;
}

// Extended interface - BasicChai ki sari properties inherit karega
interface PremiumChai extends BasicChai {
    specialIngredients: string[];   // Extra property
    servingStyle: "kulhad" | "cup"; // Extra property
}

// Multiple interfaces extend karna
interface ChaiWithService extends BasicChai {
    deliveryTime: number;
}

interface FullChaiOrder extends PremiumChai, ChaiWithService {
    customerName: string;  // Aur bhi properties add kar sakte hain
}

const premiumOrder: FullChaiOrder = {
    // BasicChai se inherited
    type: "cardamom",
    price: 50,
    
    // PremiumChai se inherited
    specialIngredients: ["cardamom", "ginger", "cinnamon"],
    servingStyle: "kulhad",
    
    // ChaiWithService se inherited
    deliveryTime: 15,
    
    // FullChaiOrder ka own property
    customerName: "Rahul"
};

// =================== FUNCTION SIGNATURES IN INTERFACES ===================

interface ChaiMaker {
    // Method signature define karna
    makeChai(type: string, sugar: number): string;
    
    // Arrow function style
    serveChai: (order: ChaiOrder) => string;
    
    // Optional method
    addMilk?: (amount: number) => void;
}

// Interface implement karna
const chaiShop: ChaiMaker = {
    makeChai(type: string, sugar: number): string {
        return `Making ${type} chai with ${sugar} sugar`;
    },
    
    serveChai: (order: ChaiOrder) => {
        return `Serving ${order.type} chai`;
    }
    
    // addMilk optional hai, implement karna zaroori nahi
};

// =================== INDEX SIGNATURES ===================

// Dynamic properties ke liye
interface ChaiRatings {
    [chaiType: string]: number;  // Koi bhi string key, number value
}

const ratings: ChaiRatings = {
    "masala": 4.5,
    "ginger": 4.2,
    "cardamom": 4.8,
    "green": 3.9
};

// Dynamic access
ratings["lemon"] = 4.0;  // New property add kar sakte hain
console.log(ratings["masala"]);  // 4.5

// =================== INTERFACE WITH CLASSES ===================

// Interface as contract for class
interface ChaiVendor {
    name: string;
    location: string;
    makeChai(type: string): string;
    calculatePrice(type: string, size: string): number;
}

// Class jo interface implement karta hai
class LocalChaiWala implements ChaiVendor {
    name: string;
    location: string;
    
    constructor(name: string, location: string) {
        this.name = name;
        this.location = location;
    }
    
    // Interface ke methods implement karna ZAROORI hai
    makeChai(type: string): string {
        return `${this.name} is making ${type} chai at ${this.location}`;
    }
    
    calculatePrice(type: string, size: string): number {
        const basePrice = type === "special" ? 30 : 20;
        const sizeMultiplier = size === "large" ? 1.5 : 1;
        return basePrice * sizeMultiplier;
    }
    
    // Extra methods bhi add kar sakte hain
    getLocation(): string {
        return this.location;
    }
}

const chaiWala = new LocalChaiWala("Ramu Kaka", "CP Metro Station");
console.log(chaiWala.makeChai("masala"));

// =================== DECLARATION MERGING ===================

// Same name ke multiple interfaces automatically merge ho jate hain
interface Customer {
    name: string;
}

interface Customer {
    phone: string;  // Merge ho jayega pehle wale mein
}

interface Customer {
    email?: string;  // Ye bhi merge ho jayega
}

// Final Customer interface mein sab properties hongi
const customer: Customer = {
    name: "Amit",
    phone: "9876543210",
    email: "amit@example.com"  // Optional
};

// =================== GENERIC INTERFACES ===================

// Generic interface - flexible types ke liye
interface ApiResponse<T> {
    success: boolean;
    data: T;           // T koi bhi type ho sakta hai
    message: string;
}

// Different types ke saath use karna
const chaiListResponse: ApiResponse<ChaiOrder[]> = {
    success: true,
    data: [myOrder,],
    message: "Chai orders fetched successfully"
};

const singleChaiResponse: ApiResponse<ChaiOrder> = {
    success: true,
    data: myOrder,
    message: "Single chai order"
};

/*
===============================================================================
                                SUMMARY
===============================================================================

## INTERFACE KE FAYDE:
1. Type Safety - Compile time pe errors catch
2. IntelliSense - Better autocomplete
3. Documentation - Code self-documenting
4. Refactoring - Safe code changes
5. Team Collaboration - Consistent structure

## KYA KARNA CHAHIYE:
✅ Object structure define karne ke liye interface use karo
✅ Optional properties (?) properly handle karo
✅ Readonly properties immutable data ke liye
✅ Interface extension use karo code reuse ke liye
✅ Classes mein interfaces implement karo
✅ Generic interfaces flexible code ke liye

## KYA NAHI KARNA CHAHIYE:
❌ Union types ke liye interface use mat karo (type use karo)
❌ Primitive types ke liye interface mat banao
❌ Interface names generic mat rakho
❌ Optional properties ko assume mat karo ki exist karti hain
❌ Readonly properties change karne ki koshish mat karo

## TYPE vs INTERFACE - QUICK DECISION:
- Object structure = INTERFACE
- Union types = TYPE
- Primitive types = TYPE
- Class contracts = INTERFACE
- API responses = INTERFACE
- React Props = INTERFACE (mostly)

===============================================================================
*/