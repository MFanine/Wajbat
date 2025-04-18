import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { TextInput } from "Frontend/common/form-fields/index.js";

const schema = zod.object({
  current_password: zod
    .string({
      required_error: "mot de passe actuel requis.",
    })
    .min(8, "le nouveau mot de passe doit comporter au moins 8 caractères."),
  new_password: zod
    .string({
      required_error: "nouveau mot de passe requis",
    })
    .min(8, "le mot de passe doit comporter au moins 8 caractères"),
  new_password_confirm: zod
    .string({
      required_error: "confirmation du mot de passe requise",
    })
    .min(8, "la confirmation du mot de passe doit comporter au moins 8 caractères")
    .refine((data: any) => data.new_password === data.new_password_confirm, {
      message: "les mots de passe ne correspondent pas",
      path: ["new_password_confirm"],
    }),
});

type FormValues = zod.infer<typeof schema>;

export default function UpdatePassword() {
  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="flex w-full flex-col gap-[24px] rounded-[0.694vw] bg-white p-[2.222vw] sm:p-0 sm:pt-[24px]">
      <div>
        <div className="text-xbase font-bold text-secondary sm:text-[5.340vw]">
          Sécurité
        </div>
        <div className="text-xxs text-mainText sm:text-mb-xxs">
          mettez à jour le mot de passe administrateur pour garantir la sécurité de votre compte admin
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <TextInput
          placeholder="********"
          control={control}
          label="mot de passe actuel"
          type="password"
          name="current_password"
          inputClassName="bg-[#F3F3F3]"
        />
        <TextInput
          placeholder="********"
          control={control}
          label="nouveau mot de passe"
          type="password"
          name="new_password"
          inputClassName="bg-[#F3F3F3]"
        />
        <TextInput
          placeholder="********"
          control={control}
          label="répétez le nouveau mot de passe"
          type="password"
          name="new_password_confirm"
          inputClassName="bg-[#F3F3F3]"
        />
        <button
          className="bg-main px-[32px] transition-all ease-in delay-75 py-[7px] border-[1px] rounded-full border-main text-white hover:text-main hover:bg-[transparent]"
          onClick={handleSubmit(onSubmit)}
        >
          mettre à jour le mot de passe
        </button>
      </div>
      <div className="flex justify-between gap-[24px] sm:flex-col sm:items-start">
        <div>
          <div className="text-base font-bold text-cardText sm:text-mb-base">
            supprimer le compte administrateur
          </div>
          <div className="text-xxs text-[#A6A6A6] sm:text-mb-xxs">
            une fois que vous avez supprimé ce compte, il n'y a pas de retour en arrière. Vous perdrez votre compte pour toujours !
          </div>
        </div>
        <button className="text-mb-xss text-[#E00303]">
          supprimer le compte administrateur
        </button>
      </div>
    </div>
  );
}
