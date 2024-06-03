'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ROUTE } from "@/constants/route";
import { validateUserPermissions } from "@/utils/permission";
import { localAuthenticate } from "@/helpers/localAuth";

export const withAuthentication = (WrappedComponent: any, allowedRoles?: string[]) => {
  const RequiredAuthentication = (props: any) => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const { isAuthenticated, user, token } = localAuthenticate();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        if (!token) {
          router.push(ROUTE.SIGN_IN);
        } else {
          if (allowedRoles) {
            const isValidUserPermissions = validateUserPermissions({ userRoles: user?.role, roles: allowedRoles });

            if (!isValidUserPermissions) {
              console.log("forbidden");
              
              router.push(ROUTE.FORBIDDEN);
            } else {
              setShouldRender(true);
            }
          } else {
            setShouldRender(true);
          }
        }
      } else {
        router.push(ROUTE.SIGN_IN);
      }
    }, [isAuthenticated]);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  };

  return RequiredAuthentication;
};
