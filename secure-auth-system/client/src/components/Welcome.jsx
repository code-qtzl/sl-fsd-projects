const Welcome = ({ user, onLogout }) => {
	console.log('Welcome component - user prop:', user);

	const getRoleMessage = () => {
		console.log('getRoleMessage - user.role:', user.role);
		if (user.role === 'admin') {
			return 'Welcome Admin';
		} else if (user.role === 'customer') {
			return 'Welcome Customer';
		}
		return 'Welcome';
	};

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md text-center'>
			<h2 className='text-2xl font-bold mb-4 text-green-600'>
				{getRoleMessage()}
			</h2>

			<div className='mb-6'>
				<p className='text-gray-600 mb-2'>
					You are logged in as:{' '}
					<span className='font-semibold'>{user.email}</span>
				</p>
				<p className='text-gray-600'>
					Role:{' '}
					<span className='font-semibold capitalize'>
						{user.role}
					</span>
				</p>
			</div>

			<button
				onClick={onLogout}
				className='bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
			>
				Logout
			</button>
		</div>
	);
};

export default Welcome;
