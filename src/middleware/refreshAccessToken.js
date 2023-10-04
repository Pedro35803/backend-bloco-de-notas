import { timeToken } from "../services/generateToken.js"

const refreshToken = (req, res, next) => {
    res.locals.userId = user.id;

    const minutesAccessToken = Number(process.env.ACCESS_TOKEN_DURATION_MINUTES);
    const access = createAccessToken(user);

    res.cookie("access-token", access, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: timeToken(minutesAccessToken),
    }).status(201);
};

export default refreshToken;
