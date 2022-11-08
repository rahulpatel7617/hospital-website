
function gotoPage(pagename,msg){

    if(pagename == 'login'){

        window.location.href = getBaseurl(pagename + '.html');
        return; //code execute stop.
       
    }else if(pagename == 'logout'){

        let status = window.confirm(msg); //ok cancel
        if(status){

            window.localStorage.removeItem('session');
            window.location.href = getBaseurl('login.html#log-out'); //Jis page chahtey logout honey
            //bad jaye 
        }

    }else{
        window.location.href = getBaseurl(pagename + '.html');
        return; //code execute stop.
    }
  
}


//registerUser
function registerUser(e){

    e.preventDefault(); //default behaviour to Stop Kardo.
    let name = $("#name"); //document.getElementById('name');
    //console.log(name.value);
    let email = $("#email"); //document.getElementById('email');
    //console.log(email.value);
    let password = $("#password"); //document.getElementById('password');
    //console.log(password.value);
    let mobile = $("#mobile"); //document.getElementById('mobile');
    //console.log(mobile.value);  


    var collections = JSON.parse(window.localStorage.getItem('register_data')) || [];
   // console.log(collections);

    let users = {
        name:name.value,
        email:email.value,
        password:password.value,
        mobile:mobile.value,
    }

    //JSON.stringify() : JsonObject => JSONString
    //JSON.parse() : JsonString => JsonObject

    //Object and Array of Object.

    collections.push(users);
    window.localStorage.setItem('register_data',JSON.stringify(collections));
    success_alert("Registration Successfull");

}


function contactUser(e){
    
    e.preventDefault(); //default behaviour to Stop Kardo.
    let name = $("#name");
    //console.log(name.value);
    let email = $("#email");
   

    //console.log(email.value);
    let message = $("#message");
    //console.log(message.value);
    let mobile = $("#mobile");
    //console.log(mobile.value);
    let subject=$("#subject")

    

    var collections = JSON.parse(window.localStorage.getItem('contact_data')) || [];
    console.log(collections);

    let users = {
        name:name.value,
        email:email.value,
        
        message:message.value,
        mobile:mobile.value,
        subject:subject.value
    }
    collections.push(users);
    window.localStorage.setItem('contact_data',JSON.stringify(collections));
    success_alert("Thank you for Contacting,Your Enquiry Send Successfully");

}
 function patient_user(e){
    let name = $("#name");
    let mobile = $("#mobile");
    let email = $("#email");
    let date = $("#date");
    let age = $("#age");
    let address = $("#address");
    let gender = $("#gender");
    let blood = $("#blood");
    let message = $("#message");
    var collections = JSON.parse(window.localStorage.getItem('patient_data')) || [];
    console.log(collections);
    
    let users = {
        name:name.value,
        mobile:mobile.value,
        email:email.value,
        date:date.value,
        age:age.value,
        address:address.value,
        gender:gender.value,
        blood:blood.value,
        message:message.value
    }
    collections.push(users);
    window.localStorage.setItem('patient_data',JSON.stringify(collections));
    success_alert("Your Appointment Book Successfully");

    

 }

function loginUser(e){
    e.preventDefault();

    e.preventDefault();
    let email  = $("#email");
    let password = $("#password");
    
    let userCollection_str = window.localStorage.getItem('register_data');
    let userCollection_obj = JSON.parse(userCollection_str);
    
    let register_data = findRecord(email,password,userCollection_obj);
    if(register_data){      

        let session = {
            data:register_data,
            is_login:true,
        }
        window.localStorage.setItem('session',JSON.stringify(session));
        window.location.href = getBaseurl('dashboard.html#login-success');

    }else{
        error_alert('Invalid User Name or Password');
    }

}
// how to dynamically attech a event : event loop oe event
//listenerr
let setp1_btn=$("#step1_btn");
let old_pass=$("#old_pass");
let step1 =$("#step1");

let step2 =$("#step2");
let setp2_btn=$("#step2_btn");
let new_pass=$("#new_pass");
let back1_btn=$("#back1_btn");
let step3 =$("#step3");
let back2_btn=$("#back2_btn");
let setp3_btn=$("#step3_btn");
let cnf_pass=$("#cnf_pass");

setp1_btn.addEventListener('click',function(event){
   // console.log(old_pass.value);
    let session= JSON.parse(window.localStorage.getItem('session'));
    if (old_pass.value=="" || old_pass.value==null){
        error_alert("field is required");
        old_pass.style.border="2px solid red";
        return;
    }
    if(old_pass.value==session.data.password){
    success_alert("old password matched");
    //old_pass.style.border="";
    step2.style.display='block';
        step1.style.display='none';
    }else{
        error_alert("old password  does not matched");
        old_pass.style.border="";
        return;
    }
});
 
setp2_btn.addEventListener('click',function(event){
   // console.log(new_pass.value);});
    if (new_pass.value=="" || new_pass.value==null){
    error_alert('New Password is Required');
    new_pass.style.border="2px solid red";
    return;
    }
    if (new_pass.value==old_pass.value){
        error_alert('New  pas can notPassword is Required');
        new_pass.style.border="";
        return;
        }
        step3.style.display='block';
        step2.style.display='none';
    

});

back1_btn.addEventListener('click',function(event){
    if(step2.style.display=='block'){
        step2.style.display='none';
        step1.style.display='block';

    }else{
        step2.style.display='block';
        step1.style.display='none';

    }

});
back2_btn.addEventListener('click',function(event){
    if(step3.style.display=='block'){
        step3.style.display='none';
        step2.style.display='block';

    }else{
        step3.style.display='block';
        step2.style.display='none';

    }

});
setp3_btn.addEventListener('click',function(event){
    // console.log(cnf_pass.value);});
    if (cnf_pass.value=="" || cnf_pass.value==null){
        cnf_pass.style.border="2px solid red";
        error_alert('cnf is Required');
        // error_alert('ready to change');
        return;
        }
        if (cnf_pass.value==new_pass.value){
            cnf_pass.style.border="";
              //user_data -> password--> change
              let =session=JSON.parse(window.localStorage.getItem('session'));
              let email=session.data.email;
              //console.log(email);
              let register_data=JSON.parse(window.localStorage.getItem('register_data'));
              
              let index =findUser(email,register_data);
              register_data[index].password=cnf_pass.value;
              window.localStorage.setItem('register_data',JSON.stringify(register_data));
              window.localStorage.removeItem('session');
              window.location.href=getBaseurl('login.html#log-out');
             
            
            
            }else{
                error_alert('New password not matched with cnf password');
                return;
            }


})









