import * as React from "react";

export function Services() {
  const services = [
    {
      id: 1,
      img: "https://media.licdn.com/dms/image/v2/C5612AQEaHbOu5lIheQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520091725817?e=1747872000&v=beta&t=A7Cb1R4SSMdkjpP9axDRAF4RaPZps28t7jKuwBmBohQ",
      name: "Meilleur Goût",
      description:
        "nous offrons le meilleur goût de la ville selon les déclarations de nos précieux clients.",
    },
    {
      id: 2,
      img: "https://media.licdn.com/dms/image/v2/C5612AQEaHbOu5lIheQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520091725817?e=1747872000&v=beta&t=A7Cb1R4SSMdkjpP9axDRAF4RaPZps28t7jKuwBmBohQ",
      // img: "https://cdn.myonlinestore.eu/94265583-6be1-11e9-a722-44a8421b9960/images/Verzendinfo%20Levering.jpg",
      name: "Livraison Rapide",
      description:
        "nous disposons de deux services de livraison pour vous livrer votre commande aussi vite que possible.",
    },
    {
      id: 3,
      img: "https://media.licdn.com/dms/image/v2/C5612AQEaHbOu5lIheQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520091725817?e=1747872000&v=beta&t=A7Cb1R4SSMdkjpP9axDRAF4RaPZps28t7jKuwBmBohQ",
      name: "Excellent Service",
      description:
        "nous essayons d'offrir le meilleur service, en travaillant constamment sur l'expérience utilisateur et en cherchant à l'améliorer.",
    },
];

  return (
    <div className="flex justify-between w-[73.056vw]">
      {services.map((service) => (
        <div
          key={service.id}
          className="flex flex-col text-center gap-[16px] items-center w-[16.250vw]"
        >
          <img src={service.img} alt="best tast" />
          <h2 className="text-xxl">{service.name}</h2>
          <p className="font-[300]">{service.description}</p>
        </div>
      ))}
    </div>
  );
}
