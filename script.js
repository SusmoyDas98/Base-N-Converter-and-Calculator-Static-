function base_n_to_decimal(num, from_base) {
    let number = num.toString();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = new Decimal(0);   
    from_base = new Decimal(from_base);    
    
    for (let i = 0 ; i < number.length ; i++){
        
        let val = digits.indexOf(number[i]);

        val = new Decimal(val);

        result = (result.mul(from_base)).add( val );

    }
    
    return result.toString();;

}

function decimal_to_base(num, to_base) {
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let number = new Decimal(num.toString());
    let base = new Decimal(to_base.toString());
    let quotient = new Decimal(-1);
    while (true){

        let remainder = number.mod(base);
        quotient = number.divToInt( base);

        if (!quotient.isZero()){
            result += digits[Number(remainder)];
            number = quotient;
        }
        else{
            result += digits[Number(remainder)];
            break;
        }
    }

    return result.split("").reverse().join('');
}





function base_n_to_base_n(num, from_base, to_base) {
    if (from_base === to_base){
        return num;
    }
    if (to_base==="10" && from_base !== "10"){
        return base_n_to_decimal(num, from_base);
    }
    if (from_base==="10" && to_base !== "10"){
        return decimal_to_base(num, to_base)
    }
    num = base_n_to_decimal(num, from_base);
    return decimal_to_base(num, to_base);
}




function fraction_part_base_n_to_decimal(fractionPart, from_base){
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    from_base = new Decimal(from_base);
    let limit = fractionPart.length;
    let i = 0;
    let result = new Decimal(0);
    while(i<limit){
        let val = fractionPart[i];
        val = new Decimal(digits.indexOf(val));
        result = result.add(new Decimal(val.div(from_base.pow(i+1))));
        i++;
    }
    result = result.toString();
    return result;
}


function fraction_part_decimal_to_base_n(fraction_part_decimal, to_base){

    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    to_base = new Decimal(to_base);
    let fraction_part = new Decimal(fraction_part_decimal);
    
    let result = ''; 
    let limit = 25;
    
    for (let i = 0; i<limit; i++){

        fraction_part = fraction_part.mul(to_base);
        let intPart = fraction_part.floor();
        result += digits[intPart.valueOf()];
        fraction_part = fraction_part.sub(intPart);
        if (fraction_part.isZero()) break;
    }
    return result;
}






function base_n_to_base_n_with_fraction(integerPart, fractionPart, from_base, to_base){

    if (from_base === to_base){
        answer =  integerPart+'.'+fractionPart;
        return answer;
    }
    let integer_part_converted = base_n_to_base_n(integerPart, from_base, to_base);
    
    // FRACTION PART CONVERSION:

    let fraction_part_decimal = fraction_part_base_n_to_decimal(fractionPart, from_base);
    let fraction_part_converted = fraction_part_decimal_to_base_n(fraction_part_decimal, to_base);

    answer =  integer_part_converted + "." + fraction_part_converted;

    return answer;

}






// VALIDITY CHECKING


function check_validity(num, from_base) {
    num = num.toUpperCase();

    const maxDigitMap = {
        2: '1', 3: '2', 4: '3', 5: '4', 6: '5', 7: '6', 8: '7',
        9: '8', 10: '9', 11: 'A', 12: 'B', 13: 'C', 14: 'D', 15: 'E', 16: 'F',
        17: 'G', 18: 'H', 19: 'I', 20: 'J', 21: 'K', 22: 'L', 23: 'M',
        24: 'N', 25: 'O', 26: 'P', 27: 'Q', 28: 'R', 29: 'S', 30: 'T',
        31: 'U', 32: 'V', 33: 'W', 34: 'X', 35: 'Y', 36: 'Z'
    };

    const maxChar = maxDigitMap[parseInt(from_base)];

    for (let i = 0; i < num.length; i++) {
        const c = num[i];
        if (c === '.') continue; 
        if (c > maxChar) {
            return false;
        }
    }

    return true;
}


// FRACTION CHECKER 

function fraction_checker(num) {
    const parts = num.split(".");
    return parts.length === 2;
}



// FUNCTIONALITY CHECKING




function functionality_check(num, from_base) {
    num = num.toString().toUpperCase();

    for (let i = 0; i < num.length; i++) {
        const code = num.charCodeAt(i);
        if (
            (code >= 0 && code <= 45) ||
            (code >= 47 && code <= 47) ||
            (code >= 58 && code <= 64) ||
            (code >= 91 && code <= 96) ||
            (code >= 123 && code <= 127)
        ) {
            alert("Invalid input!");
            
            return false;
        }
    }

    if (!check_validity(num, from_base) || (num.includes('.') && !fraction_checker(num))) {
        alert("Invalid digit for this base!");
        
        return false;
    }

    return true;
}


// CONVERSION

function conversion(num, from_base, to_base, operation = false, functionality_checked = false) {
    num = num.trim();
    if (num == ''){
        return '';
    }
    let answer = '';
    num = num.toString().toUpperCase();
    const  sign = num[0] == "-"? "-":false;
    if (sign){
        num = num.slice(1);
        
    }
    if (!functionality_checked){
        if(!functionality_check(num, from_base)) {
        return false; 
    }
    }

    if (fraction_checker(num) ) {

        const parts = num.split('.');
        const integerPart = parts[0] || "0";  
        const fractionPart = parts[1] || "0"; 
        answer = base_n_to_base_n_with_fraction(integerPart, fractionPart, from_base, to_base);
    } else {

        answer = base_n_to_base_n(num, from_base, to_base).toUpperCase();
    }
    if (!operation){
    if(sign){
    document.getElementById("answer_area").innerText = sign+answer.toUpperCase();}
    else{document.getElementById("answer_area").innerText =answer.toUpperCase();}
    
    }
    else{
        return answer;
    }
}


// ---------------------- ARITHMETIC OPERATION PART -------------------------//

function Main_Operation(num1, num2, Operation){
    try{
        if (Operation == "add"){
            return num1.add(num2);
        }
        else if (Operation == "sub"){
            return num1.sub(num2);
        }
        else if (Operation == "mul"){
            return num1.mul(num2);
        }
        else if (Operation == "div"){

            return num1.div(num2);
        }
    }
    catch{
        alert("Invalid operation: Please check your input values.");
        return false;
    }
}

function arithmetic_operation(input_number1, input_number2,from_base, Operation){
        
    if (functionality_check(input_number1, from_base) && functionality_check(input_number2, from_base)){

            let number1_decimal = conversion(input_number1, from_base, "10",true, true);
            let number2_decimal = conversion(input_number2, from_base, "10",true, true);

            

            number1_decimal  =  new Decimal(number1_decimal);

            number2_decimal =  new Decimal(number2_decimal);

            

            let result = Main_Operation(number1_decimal, number2_decimal, Operation);

            

            if (result && isFinite(result)){


                //(num, from_base, to_base, operation = false, functionality_checked = false)

                result = conversion(result.toString(), '10', from_base, true, true);   
                result = typeof result == "string" ? result : ' ';     
                document.getElementById("answer_area1").innerText = result.toUpperCase();       
            }
            else{
                alert("Invalid operation: Please check your input values.");
                document.getElementById("answer_area1").innerText = "";       
                return false;
            }
        

            }

}


