import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 py-4">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={item.product.images[0] || "/placeholder.png"}
          alt={item.product.name}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium">{item.product.name}</h3>
          <p className="mt-0.5 text-sm text-gray-500">{formatPrice(item.product.price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </Button>
          <span className="text-sm">{item.quantity}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)}>
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
