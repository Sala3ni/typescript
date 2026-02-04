// =================== BASIC FUNCTION WITH PARAMETERS ===================
// Function jo parameters leta hai aur kuch karta hai
function makechai (type : string, cups: number ){
    console.log(`making ${cups} cups of ${type} chai`);
}

// Function call karna
makechai ("masala ", 2) // Output: making 2 cups of masala  chai

// =================== FUNCTION WITH RETURN TYPE ===================
// Function jo specific type return karta hai
function getchaiprice() : number { // Return type explicitly define kiya
    return 25; // Number return kar raha hai
}

// =================== FUNCTION WITH CONDITIONAL RETURN ===================
// Function mein multiple return statements
function makeorder(order:string)  {
    if(!order) {
        return null // Agar order nahi hai toh null return
        return order // ❌ UNREACHABLE CODE - ye line kabhi execute nahi hogi
    }
    // Missing return statement for else case
}

// =================== VOID FUNCTION ===================
// Function jo kuch return nahi karta (void)
function logchai():void {
    console.log("chai is ready"); // Sirf console log, kuch return nahi
}

// =================== OPTIONAL vs DEFAULT PARAMETERS ===================
// Optional parameter syntax (commented out)
//function orderchai(type ? string ){ // Optional parameter - undefined ho sakta hai

// Default parameter - agar value nahi di toh default use hoga
function orderchai(type: string = "masala"){
    console.log(`Ordering ${type} chai`); // Default "masala" use hoga
}

// =================== FUNCTION WITH OBJECT PARAMETER ===================
// Function jo object parameter leta hai
function createchai (order:{
    type: string ;          // Required property
    sugar : number;         // Required property  
    milk?: boolean;         // Optional property (? se)
    size : "small" | "medium" | "large"; // Literal union type
}):number{                  // Return type number hai
    return 4;               // Hardcoded return value
}