"use strict"
window.addEventListener('DOMContentLoaded', ()=>{
     
    const forms = document.querySelectorAll("form"),
          buttonChangeForm = document.querySelectorAll("a");
     
    const openForm = () => forms.forEach(form =>form.classList.toggle('show'));
    buttonChangeForm.forEach(btn =>btn.addEventListener('click',openForm));
     
    const sendForm = (form) => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const error = Validity(form);
    
          if (error > 0) {
            e.preventDefault();
          } else {
           
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            const formData = new FormData(form);
            request.send(formData);
      
            request.addEventListener('load', () => {
              if (request.status === 200) {
                console.log(request.response);
                form.reset();
              } else {
                console.log("Error");
              }
            });
          }
        });
      };
     
    function Validity(form){
        let error = 0;
        const itemsForm = form.querySelectorAll("input");
        for(let i=0 ;i<itemsForm.length;i++){
           const input = itemsForm[i];
           formRemoveError(input);
           if(input.getAttribute('type') ==='email'){
             if(emailTest(input)){
                formAddError(input);
                error++;
              }
           }else if(input.getAttribute('type') ==='password'){
            if(passwordTest(input)){
                formAddError(input);
                error++;
            }}else
              if(input.getAttribute('type') ==='text'){
                if(nameTest(input)){
                    formAddError(input);
                    error++;
                }
                
              }  
        }
        return error;
    }

    function formAddError(input){
        input.classList.add('_error');
    }
    function formRemoveError(input){
        input.classList.remove('_error');
    }
    function emailTest(input){
        return !/^\w+([|.-]?\w+)*@\w([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
    function passwordTest(input){
        return !/^[a-z0-9_-]{6,18}$/.test(input.value);
    }
    function nameTest(input){
        return !/^[A-Z][a-z]{2,15}$/.test(input.value);
    }
    forms.forEach(form =>sendForm(form));
    

});