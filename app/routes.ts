import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("/", "./routes/home.tsx"),
  route("/about", "./routes/about.tsx"),
  route("/contact", "./routes/contact.tsx"),
  route("/project/:id", "./routes/project.tsx"),
] satisfies RouteConfig;
