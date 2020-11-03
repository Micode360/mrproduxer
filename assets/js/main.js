document.querySelector('.burger').addEventListener('click', burgMachine);

function burgMachine(){
   const burger =  document.querySelector('.navbar-burger');
   burger.style.display = 'block';
   burger.style.left = '0';
   document.querySelector('.transparent').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', dessimateNavWall);
document.querySelector('.transparent').addEventListener('click', dessimateNavWall);


function dessimateNavWall(){
   const burger =  document.querySelector('.navbar-burger');
   burger.style.display = 'none';
   document.querySelector('.transparent').style.display = 'none';
}


document.querySelector('#search-icon').addEventListener('click', searchMachine);

function searchMachine(){
   const search =  document.querySelector('.search-container');
   search.style.display = 'block';
   document.querySelector('.transparent').style.display = 'block';
}

document.querySelector('.transparent').addEventListener('click', transCloseMach);

function transCloseMach(){
   const search =  document.querySelector('.search-container');
   search.style.display = 'none';
   document.querySelector('.transparent').style.display = 'none';
}



const contactForm = document.querySelector('#contact-form'),        
            firstName = document.querySelector('#firstName'),
            lastName = document.querySelector('#lastName'),
            email = document.querySelector('#email'),
            subject = document.querySelector('#subject'),
            message = document.querySelector('#message');
            submit = document.querySelector('.submit');

            submit.addEventListener('click', eValidate);

             function eValidate(e) {
                e.preventDefault();
              if(checkFirstNameFunctionality() && checkLastNameFunctionality() && checkEmailFunctionality() && checkSubjectFunctionality() && checkMessageFunctionality()){
                  const status = response => {
                    if (response.status >= 200 && response.status < 300) {
                        return Promise.resolve(response)
                    }
                    return Promise.reject(new Error(response.statusText))
                }                              
               fetch('/client/message/route', {
                   method: 'POST',
                   headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                   },
                   body: JSON.stringify({
                        firstName: firstName.value,
                        lastName:  lastName.value,
                        email:     email.value,
                        subject:   subject.value,
                        message:   message.value
                   })
               }).then(status).then(res => {
                 const response = res.json();
                  return response;
               }).then(data => {
                console.dir(data.errors[0].msg);
               }).catch(err => {
                 console.log(err);
               });

                pageReload();
              }
           
              }

              const pageReload = () => {
                setTimeout(() => {
                  location.reload();
                }, 3000);
              }

                function checkFirstNameFunctionality(){
                    if(inputTextisEmpty(firstName)) return;
                    if(!justLetters(firstName)) return;
                    return true;
                }

                function checkLastNameFunctionality(){
                  if(inputTextisEmpty(lastName)) return;
                  if(!justLetters(lastName)) return;
                  return true;
              }

                    function checkSubjectFunctionality(){
                    if(inputTextisEmpty(subject)) return;
                    if(!justLetters(subject)) return;
                    return true;
                }

                function checkMessageFunctionality(){
                    if(inputTextisEmpty(message)) return;
                    return true;
                }

                function checkEmailFunctionality(){
                      if(inputTextisEmpty(email)) return;
                      if(!emailExactPattern(email)) return;
                      return true;
                }

                function inputTextisEmpty(element){
                     if(empty(element.value.trim())){
                        inValid(element, `Please fill your ${element.name}`);
                        return true;
                     }
                     else{
                       valid(element);
                       return false;
                     };
                }

                function justLetters(element) {
                    var regex = /^[a-zA-Z ]+$/;
                    if(regex.test(element.value)){
                      valid(element) 
                      return true;
                    }
                    else inValid(element,`${element.id} must have only letters.`);
                }

                function emailExactPattern(element){
                 const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  if(regex.test(element.value)){
                    valid(element);
                    return true;
                  }
                  else inValid(element,`Must be a regular ${element.id}`);
            }

                function empty(value) {
                    if (value === '') return true;
                    return false;
                  }

                  function inValid(element, message) {
                    element.nextElementSibling.innerHTML = message;
                   // element.nextElementSibling.style.color = 'red';
                  }

                  function valid(element) {
                    //element.className = 'valid';
                    element.nextElementSibling.innerHTML = '';
                  }




