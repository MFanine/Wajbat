import React, { useState } from "react";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import illustration from "Frontend/assets/images/illustrations/contact.svg";
import { useForm } from "react-hook-form";
import { TextInput } from "Frontend/common/form-fields/index.js";
import { Alert, Button } from "Frontend/common/index.js";
import { CheckboxField } from "Frontend/common/form-fields/checkbox-field.js";
import { TextAreaField } from "Frontend/common/form-fields/text-area-field.js";
import { FieldPhoneWithCountry } from "Frontend/common/form-fields/field-phone-with-country/index.js";

const schema = zod.object({
  firstname: zod.string({
    required_error: "Prénom requis",
  }),
  lastname: zod.string({
    required_error: "Nom de famille requis",
  }),
  email: zod
    .string({
      required_error: "Email requis",
    })
    .email("Format d'email non valide : exemple@mail.com"),
  phone: zod.string({
    required_error: "Numéro de téléphone requis",
  }),
  help: zod.string({
    required_error: "Message requis",
  }),
  terms: zod.boolean({
    required_error: "Vous devez accepter les conditions d'utilisation pour contacter le support",
  }),
});

type FormValues = zod.infer<typeof schema>;

export function Form() {
  const {
    formState: { errors },
    control,
    handleSubmit,
    reset: resetForm,
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    setAlert((prev) => !prev);
    console.log("données", data);
    console.log("alerte", alert);
  };

  const [alert, setAlert] = useState<boolean>(false);

  return (
    <div className="flex items-center gap-[4.444vw] sm:w-full sm:flex-col">
      <Alert
        message="Nous traiterons votre demande et vous enverrons un email dès que possible"
        status="success"
        open={alert}
      />
      <img
        src={illustration}
        alt="page de contact get fed"
        className="w-[352.86] sm:w-[43.689vw]"
      />
      <div className="flex flex-col gap-[1.667vw] sm:w-full">
        <div className="flex gap-[2.222vw] sm:flex-col">
          <TextInput
            control={control}
            label="Prénom"
            name="firstname"
            placeholder="Votre prénom ?"
            className=""
          />
          <TextInput
            control={control}
            label="Nom de famille"
            name="lastname"
            placeholder="Votre nom de famille ?"
            className=""
          />
        </div>
        <div className="flex gap-[2.222vw] sm:flex-col">
          <TextInput
            control={control}
            label="E-mail"
            name="email"
            placeholder="Votre adresse e-mail"
            className=""
          />
          <FieldPhoneWithCountry
            control={control}
            label="Téléphone"
            name="phone"
            className=""
          />
        </div>
        <div className="flex gap-[2.222vw] sm:flex-col">
          <TextAreaField
            control={control}
            label="Aide"
            name="help"
            placeholder="Comment pouvons-nous vous aider ?"
            className="w-[100%]"
            maxLength={1000}
          />
        </div>
        <div className="flex items-center justify-between gap-[2.222vw] sm:flex-col sm:items-start">
          <CheckboxField
            name="terms"
            control={control}
            label="J'accepte les conditions d'utilisation"
            checked
          />
          <Button
            text="Envoyer"
            className="w-fit sm:w-full"
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
}