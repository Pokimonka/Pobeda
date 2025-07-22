export class Users {

    async getAllUsers() {
        let data;
        console.log('get');
        try {
            const response = await fetch('http://localhost:5001/users');
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        return data;
    }

    async getCurrentUser(id) {
        let data; 
        try {
            const response = await fetch(`http://localhost:5001/users/${id}`);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
       data = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        return data;
    }

    create_modal_view(user) {
        let modal = document.querySelector(".modal-content")
        let modalTitle = modal.querySelector(".modal-title");
        let name = modal.querySelector(".name");
        let age = modal.querySelector(".age");
        let email = modal.querySelector(".email");
        let date = modal.querySelector(".date");

        const date_parse = new Date(Date.parse(user.date));

        const year = date_parse.getFullYear();
        const month = date_parse.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
        const day = date_parse.getDate();
        const hours = date_parse.getHours();
        const minutes = date_parse.getMinutes();
        const seconds = date_parse.getSeconds();

        modalTitle.textContent = "ID: " + user.id
        name.textContent = "Имя: " + user.name;
        age.textContent = "Возраст: " + user.age;
        email.textContent = "Email: " + user.email;
        date.textContent = "Дата регистрации: " + `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        

    }

    async create_table_body(id, name, age, email) {
        const users = await this.getAllUsers();
        let result = ''
        for (let user of users) {
            let user_data = Object.values(user)[0]
            result += `<tr data-bs-toggle="modal" data-bs-target="#myModal">
                    <th scope="row">${user_data.id}</th>
                    <td class="all_users_table">${user_data.name}</td>
                    <td class="all_users_table">${user_data.age}</td>
                    <td class="all_users_table">${user_data.email}</td>
                  </tr>`
        }
        
        return result;
    }

    async bindToDom() {
        let create_table = `
        <div class="container bg-white">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Возраст</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody class="table_body">
                  ${await this.create_table_body()}
                </tbody>
              </table>
            </div>`;
        let all_users_table = document.querySelector(".all_users_table");
        all_users_table.innerHTML = create_table;

        let table_body = document.querySelector('.table_body');

        Array.from(table_body.children).forEach(element => {
            element.addEventListener('click', async (el) => {
                const user = await this.getCurrentUser(element.children[0].textContent);
                this.create_modal_view(Object.values(user)[0])
            })
        });
    }

}