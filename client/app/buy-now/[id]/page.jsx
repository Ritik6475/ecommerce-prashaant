import { use } from "react";
import BuyNowClient from "./BuyNowClient";

export default function Page(props) {
  const params = use(props.params);

  return <BuyNowClient productId={params.id} />;
}
