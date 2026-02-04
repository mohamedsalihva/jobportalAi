export const getCookieOptions = (req, overrides = {}) => {
  const forwardedProto = req?.headers?.["x-forwarded-proto"];
  const isHttps = Boolean(req?.secure || forwardedProto === "https");

  return {
    httpOnly: true,
    secure: isHttps,
    sameSite: isHttps ? "none" : "lax",
    path: "/",
    ...overrides,
  };
};
