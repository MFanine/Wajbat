import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import illustration from "Frontend/assets/images/illustrations/login.svg";
import { Alert, Button, HeaderTitle, Loading } from "Frontend/common/index.js";
import { CheckboxField, TextInput } from "Frontend/common/form-fields/index.js";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@hilla/frontend";
import { UserEndpoint } from "Frontend/generated/endpoints.js";
import { useUserStore } from "Frontend/stores/user-store.js";

const schema = zod.object({
  username: zod.string({
    required_error: "nom d'utilisateur / email requis",
  }),
  password: zod.string({
    required_error: "mot de passe requis",
  }),
  remember_me: zod.optional(zod.boolean()),
});

type FormValues = zod.infer<typeof schema>;

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>("");

  const { setUser, user } = useUserStore();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      username: "", // Provide default value
      password: "", // Provide default value
      remember_me: false, // Provide default value
    },
  });

  useEffect(() => {
    if (sessionStorage.getItem("user") !== null) {
      navigate("/");
    }
  }, [user]);

  const onSubmit = (credentials: FormValues) => {
    setLoading(true);
    login(credentials.username, credentials.password)
      .then((res) => {
        if (res.error) {
          setError(true);
          setMsgError(res.errorMessage || "");
        } else {
          UserEndpoint.getUserByUsername(credentials.username).then((res) => {
            // @ts-ignore
            setUser(res);
            // @ts-ignore
            sessionStorage.setItem("role", res?.role);
            // @ts-ignore
            sessionStorage.setItem("user", JSON.stringify(res));
          });
        }
      })
      .then(() => setLoading(false));
  };

  if (loading) return <Loading />;

  return (
    <div className="w-[100%] bg-background ">
      <Alert message={msgError} open={error} status="error" />
      <div className="container flex flex-col items-center py-[6.667vw]">
        <div className="flex w-full items-end gap-[24px] sm:flex-col">
          <div className="hidden w-full justify-center sm:flex ">
            <HeaderTitle title="Se connecter" subTitle="" />
          </div>
          <div className="flex w-[41.042vw] items-center justify-center px-[4.444vw] py-[24px] sm:w-full">
            <img
              src={illustration}
              alt="page de connexion khabiry"
              className="w-[26.319vw] sm:w-[41.988vw]"
            />
          </div>
          <div className="flex w-[41.042vw] flex-col  sm:w-full">
            <div className="mb-[3.472vw] sm:hidden">
              <HeaderTitle title="Se connecter" subTitle="" />
            </div>
            <div className="flex flex-col gap-2">
              <TextInput
                control={control}
                label="nom d'utilisateur / email"
                name="username"
                placeholder="Votre nom d'utilisateur ?"
                className=""
              />
              <TextInput
                type="password"
                control={control}
                label="Votre mot de passe ?"
                name="password"
                placeholder="Mot de passe"
                className=""
              />
              <div className="flex justify-between">
                <CheckboxField
                  control={control}
                  className="text-xs"
                  name="remember_me"
                  label="Se souvenir de moi"
                />
                <Link
                  to="/reset"
                  className="text-xs text-[#B7B7B7] sm:text-mb-xxs"
                >
                  mot de passe oublié ?
                </Link>
              </div>
              <Button
                className="w-full"
                text="Se connecter"
                onClick={handleSubmit(onSubmit)}
              />
              <div className="flex items-center gap-2 text-cardText">
                Vous n'avez pas de compte ?
                <Link
                  to="/register"
                  className="flex justify-center text-xs text-[#B7B7B7] hover:text-main sm:text-mb-xxs"
                >
                  s'inscrire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}