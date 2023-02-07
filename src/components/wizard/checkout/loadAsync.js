export function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}


export const extractAddress = (place) => {
    const address = {
        city: "",
        state: "",
        lat: '',
        streetAddress: place.formatted_address,
        googlePlaceID: place.place_id,
        lng: '',
        zipCode: "",
        country: "",
        plain() {
            const city = this.city ? this.city + ", " : "";
            const zipCode = this.zipCode ? this.zipCode + ", " : "";
            const state = this.state ? this.state + ", " : "";
            return city + zipCode + state + this.country;
        }
    }

    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    if (place.geometry) {
        if (typeof place.geometry.location.lat === 'number' && typeof place.geometry.location.lng === 'number') {
            address.lat = place.geometry.location.lat;
            address.lng = place.geometry.location.lng;
        } else {
            address.lat = place.geometry.location.lat();
            address.lng = place.geometry.location.lng();
        }
    }


    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("locality")) {
            address.city = value

        }
        if (types.includes("administrative_area_level_1")) {
            address.state = value;
        }

        // if (types.includes("administrative_area_level_2")) {
        //     address.state = value;
        // }

        if (types.includes("postal_code")) {
            address.zipCode = value;
        }

        if (types.includes("country")) {
            address.country = value;
        }

    });

    return address;
}