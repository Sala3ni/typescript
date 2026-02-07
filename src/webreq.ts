/*
===============================================================================
                    WEB REQUESTS WITH TYPESCRIPT
===============================================================================

## AXIOS KYA HAI?
Axios ek popular HTTP client library hai API calls ke liye.

## KYU USE KARTE HAIN?
1. Promise-based - async/await support
2. Type-safe responses - TypeScript ke saath
3. Error handling - Better error management
4. Interceptors - Request/response modify kar sakte hain

===============================================================================
*/

// Axios library import - HTTP requests ke liye
import axios from "axios" // npm i axios

// Type import - Type-only import (compile time pe remove ho jata hai)
import type { AxiosResponse } from "axios"
// npm i @types/axios -D (Dev dependency)

// =================== INTERFACE FOR API RESPONSE ===================

// API response ka structure define karna
interface todo {
    id: number,         // Todo ID
    title: string,      // Todo title
    completed: boolean  // Completion status
}

// KYU LIKHA: API response type-safe banane ke liye
// BENEFIT: response.data ka type pata hai, autocomplete works

// =================== BASIC API CALL (PROMISE SYNTAX) ===================

// Traditional promise-based approach (commented out)
// axios.get("https://jsonplaceholder.typicode.com/todos")
// .then(response => {
//     console.log(response.data);  // Response data access
// })

// KYU COMMENTED: async/await modern aur readable hai

// =================== ASYNC/AWAIT WITH TYPE SAFETY ===================

// Async function - API call with proper typing
const fetchData = async () => {
    try {
        // Generic type specify karna - AxiosResponse<todo[]>
        const response: AxiosResponse<todo[]> = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
        );
        
        // response.data ab type-safe hai - todo[] type
        console.log(response.data);
        
        // Type-safe access
        // response.data[0].title  // ✅ Works - TypeScript knows structure
        // response.data[0].invalid // ❌ ERROR - Property doesn't exist
        
    } catch (error: any) {
        // Error handling with type checking
        
        // Axios-specific error check
        if (axios.isAxiosError(error)) {
            // Axios error - network issues, 404, 500, etc.
            console.error("Axios error:", error.message);
            // error.response?.status  // HTTP status code
            // error.response?.data    // Error response data
        } else {
            // Other unexpected errors
            console.error("Unexpected error:", error);
        }
    }
}

// KYU LIKHA:
// 1. Type safety - response.data ka type pata hai
// 2. Error handling - Axios errors alag handle
// 3. Async/await - Clean, readable code

// BENEFIT:
// - IntelliSense works perfectly
// - Compile-time error checking
// - Better error messages

// REAL-WORLD USE:
// - Fetching user data
// - Submitting forms
// - API integrations

/*
===============================================================================
                            KEY POINTS
===============================================================================

## TYPE IMPORT:
import type { AxiosResponse } - Type-only import
- Compile time pe use hota hai
- Runtime pe remove ho jata hai
- Bundle size choti rehti hai

## GENERIC TYPES:
AxiosResponse<todo[]> - Response type specify
- response.data ka type todo[] hai
- Type-safe data access
- Better autocomplete

## ERROR HANDLING:
axios.isAxiosError() - Axios error check
- Network errors
- HTTP errors (404, 500)
- Timeout errors

## BEST PRACTICES:
✅ Interface define karo API response ke liye
✅ Generic types use karo
✅ Proper error handling
✅ async/await prefer karo

===============================================================================
*/
