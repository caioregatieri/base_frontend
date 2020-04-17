import UsersForm from "~/views/Users/form";
import UsersList from "~/views/Users/list";

export default [
    {
        path: "/users/cad",
        name: "Usuários Cadastro",
        icon: "pe-7s-users",
        component: UsersForm,
        hide: true
      },
      {
        path: "/users/:id",
        name: "Usuários Edição",
        icon: "pe-7s-users",
        component: UsersForm,
        hide: true
      },
      {
        path: "/users",
        name: "Usuários",
        icon: "pe-7s-users",
        component: UsersList,
      },
];