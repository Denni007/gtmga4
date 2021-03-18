  
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
    "707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com","eT3X0xmpNrH_Wo5nJVlzFmg9",
  'postmessage'
);

exports.getProfileInfo = async (code) => {
  const r = await client.getToken(code);
  const idToken = r.tokens.id_token;

  const ticket = await client.verifyIdToken({
    idToken,
    audience: "707899012207-c99nu2ve4r2nv408jgufp7427e6k17bk.apps.googleusercontent.com",
  });

  const payload = ticket.getPayload();

  return payload;
};