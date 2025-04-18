import { useCartStore } from "Frontend/stores/cart-store.js";
import { useUserStore } from "Frontend/stores/user-store.js";
import { Button, Loading } from "Frontend/common/index.js";
import { useEffect, useState } from "react";
import {
  DropdownField,
  FieldPhoneWithCountry,
  TextInput,
} from "Frontend/common/form-fields/index.js";
import { useForm } from "react-hook-form";
import { DrinkCardWithQuantity } from "Frontend/common/drink-card/drink-card-with-quantity.js";
import { DrinkItem, MealItem } from "Frontend/types/types.js";
import { getUniqueListBy } from "Frontend/utils/get-unique.js";
import { MealCardWithQuantity } from "Frontend/common/dish-card/meal-card-with-quantity.js";
import {
  DeliveryEndpoint,
  OrderEndpoint,
} from "Frontend/generated/endpoints.js";
import Delivery from "Frontend/generated/com/lpw/getfed/models/Delivery.js";
import OrderStatus from "Frontend/generated/com/lpw/getfed/models/enums/OrderStatus.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [deliveryServices, setDeliveryServices] = useState([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredMeals, setFilteredMeals] = useState<MealItem[]>([]);
  const [filteredDrinks, setFilteredDrinks] = useState<DrinkItem[]>([]);

  const navigate = useNavigate();
  const { meals, drinks, removeDrink, removeMeal, reset } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    setFilteredMeals(getUniqueListBy(meals));
    setFilteredDrinks(getUniqueListBy(drinks));
  }, [meals, drinks]);

  const { control, handleSubmit } = useForm();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await DeliveryEndpoint.getDeliveryOptions(0 , 20).then(
        (res) => res
      );
      setDeliveryServices( 
        // @ts-ignore
        result.map((item: Delivery) => ({
          value: item.id,
          label: `${item?.label} - ${item.price} Mad`,
        }))
      );
      // @ts-ignore
      setDeliveries(result);
      setLoading(false);
    }
    getData();
  }, []);

  const paymentMethods = [
    {
      value: "cheque",
      label: "Chèque",
    },
    {
      value: "credit card",
      label: "Carte de crédit",
    },
  ];

  const onSubmit = async (data: any) => {
    setLoading(true);
    let price = 0;
    // @ts-ignore
    meals.map((meal) => {
      // @ts-ignore
      price += meal?.item?.price;
    });
          // @ts-ignore

    drinks.map((drink) => {
      // @ts-ignore
      price += drink?.item?.price;
    });

    OrderEndpoint.createOrder({
            // @ts-ignore
      meals: meals.map((mealItem) => mealItem.item),
            // @ts-ignore
      drinks: drinks.map((drinkItem) => drinkItem.item),
      dateCreated: new Date().toISOString(),
      status: OrderStatus.AWAITING,
      delivery: deliveries.filter(
        (delivery: Delivery) => delivery.id === data.delivery.value
      )[0],
      user: user,
      phone: `${data.phone.countryCode} ${data.phone.phone}`,
      address: data.address,
      totalPrice: price,
      paymentMethod: data.paymentMethod.value,
    }).then((res) => {
      setLoading(false);
      reset();
      navigate("/");
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-background min-h-[75vh] flex items-center justify-center">
      {meals.length + drinks.length === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <div>Veuillez ajouter des produits à votre panier avant de tenter de payer</div>
          <div className="flex gap-2">
            <Button text="voir les repas" className="rounded-[4px]" link="/menu" />
            <Button
              text="voir les boissons"
              className="rounded-[4px]"
              link="/drinks"
            />
          </div>
        </div>
      ) : (
        <div className="container flex flex-col items-center">
          {meals.length === 0 && (
            <p className="flex gap-1">
              ajouter un repas avant de procéder au paiement ?{" "}
              <Button
                text="ajouter un repas"
                className="hover:no-underline border-none hover:!text-mainText"
                link="/meals"
                theme="tertiary"
              />{" "}
            </p>
          )}
          {drinks.length === 0 && (
            <p className="flex gap-1">
              ajouter une boisson avant de procéder au paiement ?{" "}
              <Button
                text="ajouter une boisson"
                className="hover:no-underline border-none hover:!text-mainText"
                link="/drink"
                theme="tertiary"
              />{" "}
            </p>
          )}
          <div className="flex gap-24 mt-[7vw]">
            <img
              src="https://cdn.dribbble.com/userupload/28745158/file/original-3beaedcdf1950ef3ed45077548dad0dd.gif"
              alt="page de connexion khabiry"
              className="w-[30vw] h-fit sm:w-[48.058vw] rounded-2xl"
            />
            <div className="flex w-[41.042vw] flex-col gap-[24px] sm:w-full">
              <div className="grid grid-cols-2 gap-x-2">
                <FieldPhoneWithCountry
                  control={control}
                  label="Numéro de téléphone"
                  name="phone"
                />
                <TextInput
                  control={control}
                  label="Adresse de livraison"
                  name="address"
                  placeholder="Votre adresse*"
                />
                <DropdownField
                  control={control}
                  label="Livraison"
                  name="delivery"
                  className="bg-white"
                  items={deliveryServices}
                />
                <DropdownField
                  control={control}
                  label="Méthode de paiement"
                  className="bg-white"
                  name="paymentMethod"
                  items={paymentMethods}
                />
                <Button
                  className="w-full rounded-[8px] col-span-2"
                  text="passer la commande"
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="overflow-scroll flex gap-2 no-scrollbar list-none">
                  {filteredMeals.map((meal) => (
                    <MealCardWithQuantity
                      className="min-w-[25vw]"
                      key={`meal-item-${meal.item.id}`}
                      meal={meal}
                      onClick={() => removeMeal(meal.item.id || 0)}
                    />
                  ))}
                </div>
                <div className="overflow-scroll flex gap-2 no-scrollbar list-none">
                  {filteredDrinks.map((drink) => (
                    <DrinkCardWithQuantity
                      className="min-w-[25vw]"
                      key={`meal-item-${drink.item.id}`}
                      drink={drink}
                      onClick={() => removeDrink(drink.item.id || 0)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}