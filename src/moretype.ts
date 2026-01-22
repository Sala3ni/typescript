let response : any = "42";

let numricLength : number = ( response as string ).length;

type book = {
    name : string ;
};

let bookstring = `{"name" : "alchhemist"}`;
let bookobject = JSON.parse(bookstring) as book;
console.log(numricLength);

const inputElement = document.getElementById("username") as HTMLInputElement;
let value : any

value = "chai"
value= [1,2,3,4]
value = 2.3
value.toUpperCase();

let newvalue : unknown;
newvalue = "chai"
newvalue=[1,2,3,4]
newvalue = 2.3

if(typeof newvalue === "string") {
    newvalue.toUpperCase();
}

try{

}catch(error){
    if(error instanceof Error){
        console.log(error.message);
    }
    console.log("Error", error);
};


const data : unknown = "chai aur code "
const strData : string = data as string;


type Role = "admin" | "user"| "superadmin";

function redirecttorole (role:Role): void {
    if(role === "admin"){
         console.log("Redirecting to admin dashboard");
        
    }
    if(role === "user"){
         console.log("Redirecting to user dashboard");

    }
    role;
}

function neverreturn(): never {
    while(true){}
}
