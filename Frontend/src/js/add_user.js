export class Add {

    async bindToDom() {
        let create_form = `
              <div class="col p-2">
                <form class="row g-3">
                  <div class="row-md-4 name-form position-relative">
                    <label for="inputName" class="form-label">Имя</label>
                    <input type="text" class="form-control name" id="inputName" placeholder="Введите имя"  required>
                  </div>
                  <div class="row-md-4 age-form">
                    <label for="inputAge" class="form-label">Возраст</label>
                    <input type="text" class="form-control age"  id="inputAge" placeholder="Введите возраст" required>
                  </div>
                  <div class="row-md-4 email-form">
                    <label for="inputEmail" class="form-label">Email</label>
                    <input type="email" class="form-control email" id="inputEmail" placeholder="Введите email" required>
                  </div>
                  <div class="row-12">
                    <button class="btn btn-primary add" type="submit">Submit form</button>
                  </div>
                </form>
              </div>`;
        let add_user_table = document.querySelector(".add_user_form");
        add_user_table.innerHTML = create_form;

        this.registerForm(add_user_table);
    }

    validateForm(name, age, email) {
      if (name.value.length < 4 || name.value.length > 100) {
        name.insertAdjacentHTML('afterend', 
          ` <div class="error text-bg-danger p-3 rounded-5">
              Имя должно быть от 4 до 100 символов
            </div>`);
          return false;
      }
      if (Number(age.value)<=0) {
        age.insertAdjacentHTML('afterend', 
          `<div class="error text-bg-danger p-3 rounded-5">
            Возраст не может быть отрицательный или равен нулю
          </div>`);
          return false;
      } 
      const regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu; 
      if (!regex.test(email.value) || email.value.length == 0) {
        email.insertAdjacentHTML('afterend', 
          `<div class="error text-bg-danger p-3 rounded-5">
            Неверный email. Проверьте его!
          </div>`);
          return false;
      }
      return true;
    }

    async addUser(add_user_table) {
      const name = add_user_table.querySelector(".name");
      const age = add_user_table.querySelector(".age");
      const email = add_user_table.querySelector(".email");
      
      if (!this.validateForm(name, age, email)){
        return;
      }
      const data = {
        'name': name.value,
        'age': age.value,
        'email': email.value
      }
      const response = await fetch(`http://localhost:5001/users/add`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data), 
      });
      console.log(response.status)

      if (response.status == 500) {
        email.insertAdjacentHTML('afterend', 
          `<div class="error text-bg-danger p-3 rounded-5">
            Пользователь с таким email уже существует
          </div>`);
          return false;
      }
      if (response.status == 200) {
        name.insertAdjacentHTML('beforebegin', 
          `<div class="success text-bg-success p-3 p-3 rounded-5">
            Пользователь успешно добавлен!
          </div>`);
          return true;
      }
      return true;
    }

     registerForm(add_user_table) {

      let form = add_user_table.querySelector("form");
      
      form.addEventListener('submit', async (e)=>{
        
        e.preventDefault()
        let error = form.querySelector('.error');
        if (error) {
          error.remove();
        }
        this.addUser(add_user_table)
        form.reset()
 

      })
    }


}