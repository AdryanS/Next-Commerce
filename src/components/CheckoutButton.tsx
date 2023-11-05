import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CheckoutButtonComponent() {
  const router = useRouter()
  const { user } = useUser();
  const { setCheckout, cart, toggleCart } = useCartStore();

  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  const handleCheckout = async () => {
    if(!user) {
      toggleCart();
      router.push(`/sign-in?redirectUrl=/`)
      return ;
    }

    setCheckout("checkout")
  }

  return (
    <div>
      <p className="text-teal-600 font-bold">
        Total: {formatPrice(totalPrice)}
      </p>
      <button
        onClick={() => handleCheckout()}
        className="w-full rounded-md bg-teal-600 text-white py-2 mt-2"
      >
        Finalizar Compra
      </button>
    </div>
  );
}
