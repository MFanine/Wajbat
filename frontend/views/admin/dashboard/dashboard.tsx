import * as React from "react";
import { NoStyleLink } from "Frontend/common/no-style-link/no-style-link.js";
import { useEffect, useState } from "react";
import { DashboardEndpoint } from "Frontend/generated/endpoints.js";

export default function Dashboard() {
  const [statistics, setStatistics] = useState({
    meals: 0,
    orders: 0,
    users: 0,
  });

  const cards = [
    {
      id: 1,
      title: "Commandes", 
      value: statistics.orders,
      link: "/admin/orders",
      linkText: "Voir les commandes", 
    },
    {
      id: 2,
      title: "Repas", 
      value: statistics.meals,
      link: "/admin/managements",
      linkText: "Gérer les repas, boissons et sous-catégories", 
    },
    {
      id: 3,
      title: "Utilisateurs",
      value: statistics.users,
      link: "/admin/users",
      linkText: "Gérer les utilisateurs", 
    },
  ];

  useEffect(() => {
    DashboardEndpoint.countAll().then((res) => {
      setStatistics({
        // @ts-ignore
        meals: res?.meal?.meals,
        // @ts-ignore
        users: res?.user?.users,
        // @ts-ignore
        orders: res?.order?.orders,
      });
    });
  }, []);

  return (
    <div className="flex w-full flex-col gap-[32px] rounded-[8px] bg-white p-[2.222vw] sm:p-0">
      <div className="text-xbase font-bold text-cardText sm:text-[5.340vw]">
        Tableau de bord
      </div>
      <div className="flex justify-between gap-[24px] sm:flex-col">
        {cards.map((item) => (
          <NoStyleLink
            key={item.id}
            link={item.link}
            className="relative flex w-full flex-col justify-between rounded-[4px] bg-background p-[14px] sm:w-full sm:gap-[2.222vw]"
          >
            <div className="">
              <div className="text-base text-cardText sm:text-mb-base">
                {item.title}
              </div>
              <div className="text-2xl font-bold text-main sm:text-[8.738vw]">
                {item.value}
              </div>
            </div>
            <div className="flex items-center justify-between text-secondary">
              <div className="sm:text-mb-xbase">{item.linkText}</div>
              {/* <img
                src="https://brandeps.com/icon-download/T/Text-grammar-arrow-right-icon-vector-01.svg"
                alt="arrow right"
                className="min-w-[1.667vw] sm:w-[5.825vw]"
              /> */}
            </div>
          </NoStyleLink>
        ))}
      </div>
      {/*test*/}
    </div>
  );
}
