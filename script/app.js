"use strict"
//validation form start
document.addEventListener('DOMContentLoaded', function(){
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        if (error === 0) {
            confirm('Подтвердите отправку ваших данных.');
            form.submit();
        } else {
            alert('Заполните обязательные поля!');
        }
    }

    function formValidate() {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if(input.classList.contains('_email')){
                if(emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            }else if(input.classList.contains('_phone')){
                if(phoneTest(input)) {
                    formAddError(input);
                    error++;
                }
            }else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
                   formAddError(input);
                   error++; 
            }else{
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
        
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    //test email function
    function emailTest(input) {
        return !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
    }
    //test phone function
    function phoneTest(input) {
        return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
    }

    //changing checked text
    const text = document.querySelector('.text');
    const checker = document.querySelector('.form__check');
    document.querySelector('.form__check').onclick = function() {
        if(checker.checked === true && text.innerHTML == 'Default') {        
            text.innerHTML = 'Checked';   
            console.dir(text);    
        }else{
        text.innerHTML = 'Default';
        }
    }
});
//validation form end

//block animation start

function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
       change.target.classList.add('element-show');
      }
    });
  }
  
  let options = {
    threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  
  for (let elm of elements) {
    observer.observe(elm);
  }

  //block animation end 