import * as React from "react";
import { Services, SpecialDishes } from "Frontend/views/home/sections/index.js";
import img from "../../assets/images/hero-section-blob.svg";
import { Button } from "Frontend/common/index.js";
export function Home() {
  return (
    <main className="bg-background bg-[url('https://i.imgur.com/o1oOjuM.png')] w-full bg-no-repeat bg-cover overflow-x-hidden">
      <div className="container flex flex-col gap-[2.361vw] items-center">
        <div className="flex items-center justify-between">
          <div className="w-[50vw] flex flex-col gap-[24px]">
            <h1 className="font-extrabold text-[4.167vw]">
            Nous faisons le meilleur goût en ville
            </h1>
            <p className="font-[300]">
              A web app for Moroccan meal management in Darija. Plan weekly
              menus, get Moroccan recipe ideas (tanjia, couscous), and track
              ingredients. Simplify your kitchen, l-Mghribi style. Contributions
              welcome—let’s cook something mzyan together!
            </p>
            <div className="flex gap-[1.667vw]">
              <Button text="commandez maintenant" link="/menu" />
              <Button text="à propos de nous" link="/about" theme="secondary" />
            </div>
          </div>
          <img src={img} alt="get fed" />
        </div>
        <Services />
        <SpecialDishes />
      </div>
    </main>
  );
}
