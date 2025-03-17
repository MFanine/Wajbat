"use client";

import React, { useEffect, useState } from "react";
import zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import illustration from "Frontend/assets/images/illustrations/register.svg";
import { Alert, Button, HeaderTitle, Loading } from "Frontend/common/index.js";
import {
  CheckboxField,
  FieldPhoneWithCountry,
  TextInput,
} from "Frontend/common/form-fields/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "Frontend/stores/user-store.js";
import { UserEndpoint } from "Frontend/generated/endpoints.js";
import { login } from "@hilla/frontend";

const schema = zod.object({
  firstname: zod.string({
    required_error: "prénom requis",
  }),
  lastname: zod.string({
    required_error: "nom de famille requis",
  }),
  username: zod.string({
    required_error: "e-mail requis",
  }),
  phone: zod.object({
    countryCode: zod.string(),
    phone: zod.optional(zod.string()),
  }),
  address: zod.optional(zod.string()),
  password: zod.string({
    required_error: "mot de passe requis",
  }),
  repassword: zod.string({
    required_error: "confirmation du mot de passe requise",
  }),
  terms: zod.boolean({
    required_error: "vous devez accepter les conditions d'utilisation avant de vous inscrire",
  }),
});

type FormValues = zod.infer<typeof schema>;

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
      phone: { countryCode: "", phone: "" }, // Nested object needs defaults
      address: "",
      password: "",
      repassword: "",
      terms: false,
    },
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = ({
    username,
    password,
    repassword,
    lastname,
    phone,
    address,
    firstname,
  }: FormValues) => {
    setLoading(true);
    if (password === repassword) {
      UserEndpoint.addEmployee({
        username: username,
        password: password,
        firstName: firstname,
        address: address,
        phone: `${phone.countryCode} ${phone.phone}`,
        lastName: lastname,
        role: "USER",
      })
        .then((res) => {
          // @ts-ignore
          return login(res?.username, res?.password).then(() => res);
        })
        .then((data) => {
          // @ts-ignore
          setUser(data);
          // @ts-ignore
          sessionStorage.setItem("role", data.role);
          // @ts-ignore
          sessionStorage.setItem("user", JSON.stringify(data));
        });
    } else {
      setOpen(true);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full bg-background">
      <Alert message="Les mots de passe ne correspondent pas" open={open} status="error" />
      <div className="container flex items-center py-[48px] sm:flex-col">
        <div className="hidden w-full justify-center sm:flex ">
          <HeaderTitle title="S'inscrire" subTitle="" />
        </div>
        <div className="flex w-[41.042vw] items-center justify-center px-[4.444vw] py-[2.222vw] sm:w-full">
          <img
            src={illustration}
            alt="page d'inscription khabiry"
            className="w-[26.319vw] sm:w-[48.058vw]"
          />
        </div>
        <div className="flex w-[41.042vw] flex-col gap-[24px] sm:w-full">
          <div className="mb-[3.472vw] sm:hidden">
            <HeaderTitle title="S'inscrire" subTitle="" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-x-2">
              <TextInput
                control={control}
                label="e-mail / nom d'utilisateur"
                name="username"
                placeholder="Votre nom d'utilisateur/e-mail*"
              />
              <TextInput
                control={control}
                label="prénom"
                name="firstname"
                placeholder="Votre prénom*"
              />
              <TextInput
                control={control}
                label="nom de famille"
                name="lastname"
                placeholder="Votre nom de famille*"
              />
              <FieldPhoneWithCountry
                control={control}
                label="téléphone"
                name="phone"
              />
              <TextInput
                control={control}
                label="adresse"
                name="address"
                placeholder="Votre adresse*"
              />
              <TextInput
                control={control}
                label="mot de passe"
                name="password"
                type="password"
                placeholder="Votre mot de passe*"
              />
              <TextInput
                control={control}
                label="confirmer le mot de passe"
                name="repassword"
                type="password"
                placeholder="Répéter le mot de passe*"
              />
            </div>
            <CheckboxField
              control={control}
              label="En m'inscrivant, j'accepte les conditions d'utilisation de Wajbat."
              name="terms"
            />
            <div className="w-full flex justify-end">
              <Button
                className="w-fit"
                text="s'inscrire"
                onClick={handleSubmit(onSubmit)}
              />
            </div>

            <div className="w-[100%] text-center text-xs font-medium text-[#B7B7B7] sm:text-mb-xxs">
              Vous avez déjà un compte ?
              <Link to="/login" className="text-secondary">
                  Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}