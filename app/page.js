import HomeClient from "./HomeClient";
import { pageMetadata } from "./lib/site";

const HOME_TITLE = "Independent Insurance Agency in Austin, TX | Spyglass Insurance Agency";
const HOME_DESCRIPTION =
  "Spyglass Insurance Agency is an independent Austin, Texas insurance agency. We compare home, auto, flood and umbrella options from multiple carriers and explain the fine print in plain English.";

const base = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

export const metadata = {
  ...base,
  title: { absolute: HOME_TITLE },
  openGraph: { ...base.openGraph, title: HOME_TITLE },
  twitter: { ...base.twitter, title: HOME_TITLE },
};

export default function HomePage() {
  return <HomeClient />;
}
