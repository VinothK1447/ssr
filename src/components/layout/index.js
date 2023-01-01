import React from 'react'
// import Content from '../slices/Content'
// import Header from '../slices/header'
const Header = React.lazy(() => import('../slices/Header'))
const Content = React.lazy(() => import('../slices/Content'))

const Layout = () => {
	return (
		<div>
			<Header />
			<section>
				<Content />
			</section>
		</div>
	)
}

export default Layout
