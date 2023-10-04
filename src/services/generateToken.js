import jwt from "jsonwebtoken";

export const createAccessToken = (user) => {
    return jwt.sign({ sub: user.id, name: user.name }, process.env.KEY_JWT, {
        audience: "urn:jwt:type:access",
        issuer: "urn:system:token-issuer:type:access",
        expiresIn: `${process.env.ACCESS_TOKEN_DURATION_MINUTES}m`,
    });
};

export const createRefreshToken = (user) => {
    return jwt.sign({ sub: user.id }, process.env.KEY_JWT, {
        audience: "urn:jwt:type:refresh",
        issuer: "urn:system:token-issuer:type:refresh",
        expiresIn: `${process.env.REFRESH_TOKEN_DURATION_MINUTES}m`,
    });
};

export const timeToken = (minutesToken) => {
    const milisecondsInSeconds = 1000;
    const secondsInMinute = 60;

    const secondsInMinutes = minutesToken * secondsInMinute * milisecondsInSeconds;
    const dateFuture = Date.now() + secondsInMinutes;
    const dateObj = new Date(dateFuture);

    return dateObj;
};
