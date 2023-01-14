// import {matchRoutes, useLocation} from "react-router-dom"
//
// export const useCurrentPath = ({routes}) => {
//
//     const location = useLocation()
//     const [{route}] = matchRoutes(routes, location)
//
//     return route.path
// }





/**
 * Function converts path like /user/123 to /user/:id
 */
export const useCurrentPath = (location, params) => {
    const {pathname} = location;

    if (!Object.keys(params).length) {
        return pathname; // we don't need to replace anything
    }

    let path = pathname;
    Object.entries(params).forEach(([paramName, paramValue]) => {
        if (paramValue) {
            path = path.replace(paramValue, `:${paramName}`);
        }
    });
    return path;
};
