import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export default NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			async authorize(credentials) {
				const payload = {
					email: credentials.email,
					password: credentials.password,
				};
				try {
					const response = await fetch('apiendpoint', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json; charset=UTF-8',
						},
						body: JSON.stringify(payload),
					});
					const responseData = await response.json();
					const { data: user } = responseData;
					if (response.ok && user) {
						return user;
					} else {
						throw new Error(responseData.msg);
					}
				} catch (error) {
					throw new Error(error.message);
				}
			},
		}),
	],
	callbacks: {
		jwt: ({ token, user }) => {
			if (user) {
				return {
					...token,
					accessToken: user.access_token,
					id: user.Id,
				};
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.accessToken = token.accessToken;
				session.user.id = token.id;
			}
			return session;
		},
	},
	secret: 'test',
	jwt: {
		secret: 'test',
		encryption: 'test',
	},
});
