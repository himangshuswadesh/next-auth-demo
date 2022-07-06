import { Button } from 'antd';
import { signOut, useSession } from 'next-auth/react';
const Dashboard = () => {
	const { data: session, status } = useSession();
	if (status === 'authenticated') {
		return (
			<div className='container'>
				<h1>Welcome to dashboard {session?.user?.name}</h1>
				<Button type='primary' onClick={() => signOut({ redirect: false })}>
					Logout
				</Button>
			</div>
		);
	}
	return (
		<div className='container'>
			<h2>Access denied, please login</h2>
		</div>
	);
};
export default Dashboard;
