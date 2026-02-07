/*
===============================================================================
                    TYPESCRIPT OOP - COMPLETE BEGINNER GUIDE
===============================================================================

## OOP KYA HAI?
Object-Oriented Programming ek programming paradigm hai jo real-world entities
ko objects ke roop mein represent karta hai.

## MAIN OOP CONCEPTS:
1. Classes & Objects - Blueprint aur instances
2. Encapsulation - Data hiding (public, private, protected)
3. Inheritance - Parent se child mein properties/methods
4. Polymorphism - Same method, different behavior
5. Abstraction - Essential features show, implementation hide

===============================================================================
*/

// =================== 1. BASIC CLASS & CONSTRUCTOR ===================

// Class - Blueprint/Template for creating objects
class Chai {
    // Properties (instance variables)
    flavour: string;
    price: number;
    
    // Constructor - Object create hone pe automatically call hota hai
    constructor(flavour: string, price: number) {
        this.flavour = flavour;  // 'this' current object ko refer karta hai
        this.price = price;
    }
    
    // Method - Class ke andar function
    serve() {
        return `Serving ${this.flavour} chai at ₹${this.price}`;
    }
}

// Object creation - 'new' keyword se instance banate hain
const masalaChai = new Chai("masala", 20);
const gingerChai = new Chai("ginger", 22);

console.log(masalaChai.serve()); // Output: "Serving masala chai at ₹20"
console.log(gingerChai.flavour); // Output: "ginger"

// =================== 2. ACCESS MODIFIERS (ENCAPSULATION) ===================

class ChaiShop {
    // PUBLIC - Kahin se bhi access kar sakte hain (default)
    public name: string;
    
    // PRIVATE - Sirf class ke andar access kar sakte hain
    private secretRecipe: string;
    
    // PROTECTED - Class aur uske child classes mein access kar sakte hain
    protected ownerName: string;
    
    constructor(name: string, recipe: string, owner: string) {
        this.name = name;
        this.secretRecipe = recipe;
        this.ownerName = owner;
    }
    
    // Public method - bahar se call kar sakte hain
    public getShopInfo() {
        return `${this.name} owned by ${this.ownerName}`;
    }
    
    // Private method - sirf class ke andar use kar sakte hain
    private prepareSecretMix() {
        return `Using secret recipe: ${this.secretRecipe}`;
    }
    
    // Public method jo private method use karta hai
    public makeChai() {
        const secret = this.prepareSecretMix(); // ✅ Class ke andar access kar sakte hain
        return `Making chai... ${secret}`;
    }
}

const myShop = new ChaiShop("Chai Point", "Special Masala Mix", "Ramu Kaka");

console.log(myShop.name);           // ✅ Public - accessible
console.log(myShop.getShopInfo());  // ✅ Public method - accessible
console.log(myShop.makeChai());     // ✅ Public method - accessible

// console.log(myShop.secretRecipe);   // ❌ ERROR - Private property
// console.log(myShop.ownerName);      // ❌ ERROR - Protected property
// myShop.prepareSecretMix();          // ❌ ERROR - Private method

// =================== 3. READONLY PROPERTIES ===================

class ChaiOrder {
    readonly orderId: number;        // Readonly - sirf constructor mein set kar sakte hain
    public customerName: string;
    
    constructor(orderId: number, customerName: string) {
        this.orderId = orderId;      // ✅ Constructor mein set kar sakte hain
        this.customerName = customerName;
    }
    
    updateCustomer(newName: string) {
        this.customerName = newName;  // ✅ Normal property change kar sakte hain
        // this.orderId = 999;        // ❌ ERROR - Readonly property change nahi kar sakte
    }
}

const order = new ChaiOrder(101, "Amit");
console.log(order.orderId);  // Output: 101
// order.orderId = 102;      // ❌ ERROR - Readonly property

// =================== 4. PARAMETER PROPERTIES (SHORTHAND) ===================

// Traditional way
class ChaiTraditional {
    public flavour: string;
    public price: number;
    
    constructor(flavour: string, price: number) {
        this.flavour = flavour;
        this.price = price;
    }
}

// Shorthand way - Parameter properties
class ChaiShorthand {
    // Constructor parameters mein hi properties define kar sakte hain
    constructor(
        public flavour: string,      // Automatically property ban jati hai
        public price: number,
        private discount: number = 0  // Default value bhi de sakte hain
    ) {
        // No need to write this.flavour = flavour
    }
    
    getPrice() {
        return this.price - this.discount;
    }
}

const quickChai = new ChaiShorthand("cardamom", 25, 5);
console.log(quickChai.flavour);   // Output: "cardamom"
console.log(quickChai.getPrice()); // Output: 20

// =================== 5. GETTERS & SETTERS ===================

class ChaiMenu {
    private _price: number;  // Private property (convention: underscore prefix)
    
    constructor(
        public name: string,
        price: number
    ) {
        this._price = price;
    }
    
    // GETTER - Property ki tarah access karte hain (no parentheses)
    get price(): number {
        return this._price;
    }
    
    // SETTER - Property ki tarah set karte hain
    set price(newPrice: number) {
        if (newPrice < 0) {
            throw new Error("Price cannot be negative");
        }
        this._price = newPrice;
    }
    
    // Getter with computation
    get priceWithTax(): number {
        return this._price * 1.18; // 18% tax
    }
}

const menuItem = new ChaiMenu("Special Chai", 30);
console.log(menuItem.price);        // Output: 30 (getter call - no parentheses)
console.log(menuItem.priceWithTax); // Output: 35.4

menuItem.price = 35;                // Setter call (no parentheses)
console.log(menuItem.price);        // Output: 35

// menuItem.price = -10;            // ❌ ERROR - Validation fail

// =================== 6. INHERITANCE (EXTENDS) ===================

// Parent class (Base class / Super class)
class Beverage {
    constructor(
        public name: string,
        public temperature: string
    ) {}
    
    serve() {
        return `Serving ${this.temperature} ${this.name}`;
    }
}

// Child class (Derived class / Sub class)
class SpecialChai extends Beverage {
    constructor(
        name: string,
        temperature: string,
        public spiceLevel: number  // Extra property
    ) {
        super(name, temperature);  // Parent constructor call karna ZAROORI hai
    }
    
    // Method overriding - Parent method ko replace karna
    serve() {
        return `${super.serve()} with spice level ${this.spiceLevel}`;
    }
    
    // New method - sirf child class mein
    addSpice() {
        this.spiceLevel++;
        return `Spice level increased to ${this.spiceLevel}`;
    }
}

const regularBeverage = new Beverage("Coffee", "hot");
console.log(regularBeverage.serve()); // Output: "Serving hot Coffee"

const specialChai = new SpecialChai("Masala Chai", "hot", 3);
console.log(specialChai.serve());     // Output: "Serving hot Masala Chai with spice level 3"
console.log(specialChai.addSpice());  // Output: "Spice level increased to 4"

// =================== 7. PROTECTED ACCESS IN INHERITANCE ===================

class ChaiBase {
    protected recipe: string;  // Protected - child classes access kar sakti hain
    
    constructor(recipe: string) {
        this.recipe = recipe;
    }
}

class PremiumChai extends ChaiBase {
    constructor(recipe: string, public price: number) {
        super(recipe);
    }
    
    showRecipe() {
        return `Premium recipe: ${this.recipe}`; // ✅ Protected property accessible
    }
}

const premium = new PremiumChai("Secret Mix", 50);
console.log(premium.showRecipe()); // ✅ Works
// console.log(premium.recipe);    // ❌ ERROR - Protected property not accessible outside

// =================== 8. ABSTRACT CLASSES ===================

// Abstract class - Direct instance nahi bana sakte, sirf inherit kar sakte hain
abstract class ChaiMaker {
    constructor(public name: string) {}
    
    // Abstract method - implementation child class mein dena hoga
    abstract makeChai(): string;
    
    // Normal method - implementation yahan hai
    greet() {
        return `Welcome to ${this.name}`;
    }
}

// const maker = new ChaiMaker("Shop"); // ❌ ERROR - Abstract class ka instance nahi bana sakte

// Child class - Abstract methods implement karna ZAROORI hai
class LocalChaiWala extends ChaiMaker {
    constructor(name: string, public experience: number) {
        super(name);
    }
    
    // Abstract method ka implementation
    makeChai(): string {
        return `${this.name} making chai with ${this.experience} years experience`;
    }
}

const wala = new LocalChaiWala("Ramu Kaka", 15);
console.log(wala.greet());    // Output: "Welcome to Ramu Kaka"
console.log(wala.makeChai()); // Output: "Ramu Kaka making chai with 15 years experience"

// =================== 9. STATIC MEMBERS ===================

class ChaiCounter {
    static totalChaisSold: number = 0;  // Static property - class level
    
    constructor(public flavour: string) {
        ChaiCounter.totalChaisSold++;   // Static property access - ClassName.property
    }
    
    // Static method - instance ke bina call kar sakte hain
    static getTotalSales() {
        return `Total chais sold: ${ChaiCounter.totalChaisSold}`;
    }
    
    // Instance method
    sell() {
        return `Selling ${this.flavour} chai`;
    }
}

const chai1 = new ChaiCounter("masala");
const chai2 = new ChaiCounter("ginger");
const chai3 = new ChaiCounter("cardamom");

console.log(ChaiCounter.getTotalSales()); // Output: "Total chais sold: 3"
console.log(ChaiCounter.totalChaisSold);  // Output: 3

// Static members ko instance se access nahi kar sakte
// console.log(chai1.totalChaisSold);     // ❌ ERROR
// console.log(chai1.getTotalSales());    // ❌ ERROR

// =================== 10. INTERFACES WITH CLASSES ===================

// Interface - Contract define karta hai
interface ChaiVendor {
    name: string;
    location: string;
    makeChai(type: string): string;
    calculatePrice(size: string): number;
}

// Class jo interface implement karta hai
class MobileChaiCart implements ChaiVendor {
    constructor(
        public name: string,
        public location: string
    ) {}
    
    // Interface ke sare methods implement karna ZAROORI hai
    makeChai(type: string): string {
        return `${this.name} making ${type} chai at ${this.location}`;
    }
    
    calculatePrice(size: string): number {
        return size === "large" ? 30 : 20;
    }
    
    // Extra methods bhi add kar sakte hain
    move(newLocation: string) {
        this.location = newLocation;
        return `Moved to ${newLocation}`;
    }
}

const cart = new MobileChaiCart("Chai on Wheels", "CP");
console.log(cart.makeChai("masala"));      // Output: "Chai on Wheels making masala chai at CP"
console.log(cart.calculatePrice("large")); // Output: 30
console.log(cart.move("Connaught Place")); // Output: "Moved to Connaught Place"

// =================== 11. POLYMORPHISM ===================

// Parent class
class ChaiBase2 {
    prepare() {
        return "Preparing chai";
    }
}

// Child classes - same method, different implementation
class MasalaChai extends ChaiBase2 {
    prepare() {
        return "Preparing masala chai with spices";
    }
}

class GreenTea extends ChaiBase2 {
    prepare() {
        return "Preparing green tea with herbs";
    }
}

// Polymorphism in action - same method call, different behavior
function serveBeverage(beverage: ChaiBase2) {
    console.log(beverage.prepare()); // Different output based on actual object type
}

serveBeverage(new ChaiBase2());   // Output: "Preparing chai"
serveBeverage(new MasalaChai());  // Output: "Preparing masala chai with spices"
serveBeverage(new GreenTea());    // Output: "Preparing green tea with herbs"

// =================== 12. METHOD CHAINING ===================

class ChaiBuilder {
    private size: string = "medium";
    private sugar: number = 2;
    private milk: boolean = true;
    
    // Methods return 'this' for chaining
    setSize(size: string): this {
        this.size = size;
        return this;  // Return current object
    }
    
    setSugar(amount: number): this {
        this.sugar = amount;
        return this;
    }
    
    setMilk(hasMilk: boolean): this {
        this.milk = hasMilk;
        return this;
    }
    
    build() {
        return `Chai: ${this.size} size, ${this.sugar} sugar, milk: ${this.milk}`;
    }
}

// Method chaining - multiple methods ek saath call
const customChai = new ChaiBuilder()
    .setSize("large")
    .setSugar(3)
    .setMilk(true)
    .build();

console.log(customChai); // Output: "Chai: large size, 3 sugar, milk: true"

/*
===============================================================================
                                BEST PRACTICES
===============================================================================

## ENCAPSULATION:
✅ Private properties ke liye underscore prefix (_price)
✅ Getters/Setters use karo validation ke liye
✅ Sensitive data ko private rakho
❌ Sab kuch public mat rakho

## INHERITANCE:
✅ "is-a" relationship ke liye use karo (Car is-a Vehicle)
✅ super() call karo child constructor mein
✅ Method overriding properly karo
❌ Deep inheritance chains avoid karo (max 2-3 levels)

## ABSTRACT CLASSES:
✅ Common behavior share karne ke liye
✅ Template pattern implement karne ke liye
❌ Multiple inheritance ke liye (use interfaces)

## STATIC MEMBERS:
✅ Utility functions ke liye
✅ Shared data ke liye (counters, configs)
❌ Instance-specific data ke liye

## INTERFACES:
✅ Contract define karne ke liye
✅ Multiple interfaces implement kar sakte hain
✅ Loose coupling ke liye
❌ Implementation details ke liye (use abstract class)

## GENERAL:
✅ Single Responsibility Principle follow karo
✅ Descriptive names use karo
✅ Small, focused classes banao
❌ God classes avoid karo (too many responsibilities)

===============================================================================

## REAL-WORLD USE CASES:

1. ENCAPSULATION: User authentication (password private)
2. INHERITANCE: UI components (Button extends Component)
3. POLYMORPHISM: Payment methods (CreditCard, UPI, Cash)
4. ABSTRACTION: Database connections (MySQL, MongoDB)
5. INTERFACES: API contracts, Plugin systems

===============================================================================
*/