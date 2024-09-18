import { redirect } from "next/navigation";

export default async function IndexPage() {
  // Replace this main page with your home page
  redirect("/docs/");
}
