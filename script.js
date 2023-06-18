 const modalTrigger = document.querySelectorAll('[data-modal]'),
         modal = document.querySelector('.modal'),
         openModal = () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
           };


         modalTrigger.forEach(btn =>{
          btn.addEventListener('click', openModal);
         });
           
            const closeModal = () => {
              modal.classList.add('hide');
              modal.classList.remove('show');
              document.body.style.overflow = '';
            };
         
        

         modal.addEventListener('click', (e)=>{
          if(e.target === modal || e.target.getAttribute('data-close')==''){
            closeModal();
          }
         });


         document.addEventListener('keydown', (e) => {
               if(e.code === "Escape" && modal.classList.contains('show')){
                closeModal();
               }
         });

        const modalTimerId = setTimeout(openModal ,50000);


         const showModalByScroll = () => {
          if(window.pageYOffset + document.documentElement.clientHeight >=document.documentElement.scrollHeight - 1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
          }
         };

         window.addEventListener('scroll', showModalByScroll);

const forms = document.querySelectorAll('form');
         const message = {
          loading:'img/form/spinner.svg',
          success: 'Спасибо! Скоро мы с вами свяжемся',
          failure: 'Что-то пошло не так ...'
         };
         forms.forEach(item => {
          postData(item);
         });

         function postData(form){
           form.addEventListener('submit', (e) => {
                e.preventDefault();
                   const statusMessage = document.createElement('img');
                   statusMessage.src = message.loading;
                   statusMessage.style.cssText = `
                       display: block;
                       margin: 0 auto;
                   `;
                   form.insertAdjacentElement('aftertend',statusMessage);
                const request = new XMLHttpRequest();
                
                request.open('POST','http://first/server.php');
                // request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
                const  formData = new FormData(form);
               
                request.send(formData);
                request.addEventListener('load' , () =>{
                  if(request.status === 200){
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                    
                  }else {
                    showThanksModal(message.failure);
                  }
                });
            });
         }

         function showThanksModal(message){
          const prevModalDialog  = document.querySelector('.modal__dialog');

          prevModalDialog.classList.add('hide');
          openModal();

          const thanksModal = document.createElement('div');
          thanksModal.classList.add('.modal__dialog');
          thanksModal.innerHTML = `
                 <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <h3 clase="modal__title">${message}</h3>
                 </div>
          `;
                 document.querySelector('.modal').append(thanksModal);
                 setTimeout(() =>{
                      thanksModal.remove();
                      prevModalDialog.classList.add('show');
                      prevModalDialog.classList.remove('hide');
                      closeModal();
                 },4000); 
         }