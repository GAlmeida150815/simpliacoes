// Pages
import Index from "views/Index";
import Login from "views/Login.js";
import Posts from "views/Posts/Posts.js";
import PostEdit from "views/Posts/PostEdit.js";
import Topics from 'views/Topics/Topics';
import TopicsEdit from 'views/Topics/TopicsEdit';
import Acquisition from "views/Analytics/Acquisition";
import Interaction from 'views/Analytics/Interaction';

var routes = [
  // Pages
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-circle-08 text-pink",
    component: <Login />,
    layout: "/auth",
    show: false,
  },
  {
    path: "/posts",
    name: "Posts",
    icon: "ni ni-bullet-list-67 text-secondary",
    component: <Posts />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/post/:ID",
    name: "Post Edit",
    icon: "ni ni-bullet-list-67 text-red",
    component: <PostEdit />,
    layout: "/admin",
    show: false,
  },
  {
    path: "/topics",
    name: "Tópicos",
    icon: "ni ni-bullet-list-67 text-third",
    component: <Topics />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/topic/:ID",
    name: "Topic Edit",
    icon: "ni ni-bullet-list-67 text-red",
    component: <TopicsEdit />,
    layout: "/admin",
    show: false,
  },
  {
    path: "/acquisition",
    name: "Aquisição",
    icon: "ni ni-archive-2 text-pink",
    component: <Acquisition />,
    layout: "/admin",
    show: true,
  },
  {
    path: "/interaction",
    name: "Interação",
    icon: "ni ni-active-40 text-blue",
    component: <Interaction />,
    layout: "/admin",
    show: true,
  },
];
export default routes;
