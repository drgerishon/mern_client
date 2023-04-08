import withRoleRoute from "../../hoc/withRoleRoute";

const adminRoleRoute = (Component) => {
    return withRoleRoute(Component, 1000);
};

const farmerRoleRoute = (Component) => {
    return withRoleRoute(Component, 3000);
};

const subscriberRoleRoute = (Component) => {
    return withRoleRoute(Component, 2000);
};

const carrierRoleRoute = (Component) => {
    return withRoleRoute(Component, 4000);
};
const instituteRoleRoute = (Component) => {
    return withRoleRoute(Component, 5000);
};


export {adminRoleRoute, farmerRoleRoute, carrierRoleRoute, subscriberRoleRoute, instituteRoleRoute};
