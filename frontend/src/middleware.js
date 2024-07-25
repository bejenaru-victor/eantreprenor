import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    //console.log(req.nextauth.token)
  },
  {
    callbacks: {
        authorized: ({ token }) => {
            console.log('Middleware is hit!')
            if (!token)
                return false
            if (Object.hasOwn(token, 'user')) {
                return true
            }
            return false
        },
      //authorized: ({ token }) => token?.user?.roles_list.includes("Admin"),// === "admin",
    },
  },
)

export const config = { matcher: ["/my-courses", '/dashboard', '/dashboard/course/:path*/checkout'] }