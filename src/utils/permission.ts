type ValidateUserPermissionsParams = {
    userRoles: string[];
    permissions?: string[];
    roles: string[];
  };
  
  export function validateUserPermissions({ userRoles, roles }: ValidateUserPermissionsParams) {
    if (roles.length > 0) {
      const hasAllRoles = roles.some(role => {
        return userRoles.includes(role);
      });
  
      if (!hasAllRoles) {
        return false;
      }
    }
  
    return true;
  }
  