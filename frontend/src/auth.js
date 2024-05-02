import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        credentials: {
          email: {},
          password: {},
        },
        authorize: async (credentials) => {
            // Login
            let url = "dj-rest-auth/login/"
            let body = {
                email: credentials?.email,
                password: credentials?.password,
            }
   
            const res = await fetch(process.env.API_URL + url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })

            const user = await res.json()
            console.log(res)
            if ((res.status == 200 && user) || (user?.access)) {
                // Any object returned will be saved in `user` property of the JWT
                console.log(user)
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                if (credentials?.username && credentials?.password2)
                    throw new Error(JSON.stringify(user))
                return null
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
        },
      }),
  ],
})