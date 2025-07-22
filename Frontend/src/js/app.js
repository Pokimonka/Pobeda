import { Users } from "./all_users";
import { Add } from "./add_user";

const users = new Users();
const add = new Add()
let nav = document.querySelector('.nav');
Array.from(nav.children).forEach((item) =>{
    item.addEventListener('click', ()=> {
        Array.from(nav.children).forEach((navItem) =>{
            let link = navItem.querySelector(".nav-link");
            link.classList.add("text-white");
            link.classList.remove('active');
        })
        let link = item.querySelector(".nav-link");

        if (!link.classList.contains('active')) {
            link.classList.add('active');
            link.classList.remove("text-white");
        }
        let active = document.querySelector('.active')
        if (active.classList.contains('all_users')) {
            let add_user_table = document.querySelector(".add_user_form");
            add_user_table.innerHTML = "";
            users.bindToDom();
        } else {
            let all_users_table = document.querySelector(".all_users_table");
            all_users_table.innerHTML = "";
            add.bindToDom();
        }
    })
})

