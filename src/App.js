import React from 'react'
// import Layout from './components/layout'
const Spinner = React.lazy(() => import('./components/spinner'))
const Layout = React.lazy(() => import('./components/layout'))

function App() {
	return (
		<React.Suspense fallback={'Loading...'}>
			<Layout />
		</React.Suspense>
	)
}

export default App
